"use client";
import { useCallback, useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import {
  OpenloginAdapter,
  OPENLOGIN_NETWORK,
} from "@web3auth/openlogin-adapter";
import { getPublicCompressed } from "@toruslabs/eccrypto";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAuthIsInitialized,
  selectAuthModalIsOpen,
  selectIsAuthenticated,
} from "@/store/auth/selectors";
import {
  initiliazeAuthProvider,
  toogleAuthModal,
  logoutUser,
} from "@/store/auth/slice";
import { verifyLoggedInUser } from "@/store/auth/actions";
import { setUserInfo } from "@/store/account/slice";
import { selectAccountName } from "@/store/account/selectors";
import {
  setSafeAuthSignInResponse,
  setSelectedSafe,
  setWeb3AuthPack,
  setProvider,
} from "@/store/safe-global/slice";

function useWeb3Auth() {
  const [web3auth, setWeb3auth] = useState(null);
  const [torusPlugin, setTorusPlugin] = useState(null);
  const [web3AuthProvider, setWeb3AuthProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const authModalIsOpen = useSelector(selectAuthModalIsOpen);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authIsInitialized = useSelector(selectAuthIsInitialized);
  const username = useSelector(selectAccountName);

  const dispatch = useDispatch();

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          web3AuthNetwork: OPENLOGIN_NETWORK.SAPPHIRE_MAINNET,
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "optional",
          },
          adapterSettings: {
            uxMode: "redirect", // "redirect" | "popup"
            whiteLabel: {
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
              mode: "dark", // whether to enable dark, light or auto mode. defaultValue: auto [ system theme]
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: false,
              },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        // plugins and adapters are optional and can be added as per your requirement
        // read more about plugins here: https://web3auth.io/docs/sdk/web/plugins/

        // adding torus wallet connector plugin
        const torusPlugin = new TorusWalletConnectorPlugin({
          torusWalletOpts: {},
          walletInitOptions: {
            whiteLabel: {
              theme: { isDark: true, colors: { primary: "#00a8ff" } },
              logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            },
            useWalletConnect: true,
            enableLogging: true,
          },
        });
        setTorusPlugin(torusPlugin);
        await web3auth.addPlugin(torusPlugin);

        setWeb3auth(web3auth);

        await web3auth.initModal();
        setWeb3AuthProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        } else if (isAuthenticated) {
          dispatch(logoutUser());
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [dispatch, isAuthenticated, setWeb3AuthProvider]);

  const showLoginPopup = useCallback(async () => {
    dispatch(toogleAuthModal(false));
    if (!web3auth) return;

    const web3authProvider = await web3auth.connect();
    setWeb3AuthProvider(web3authProvider);
  }, [dispatch, web3auth]);

  const logout = useCallback(async () => {
    if (web3auth) await web3auth.logout();

    setWeb3AuthProvider(null);
    setLoggedIn(false);
    dispatch(logoutUser());
  }, [dispatch, web3auth]);

  const authenticateUser = useCallback(async () => {
    if (!web3auth || !loggedIn) return;

    try {
      // Incase of secp256k1 curve, get the app_pub_key
      const app_scoped_privkey = await web3auth.provider?.request({
        method: "eth_private_key", // use "private_key" for other non-evm chains
      });
      const app_pub_key = getPublicCompressed(
        Buffer.from(app_scoped_privkey.padStart(64, "0"), "hex")
      ).toString("hex");

      const { idToken } = await web3auth.authenticateUser();

      dispatch(verifyLoggedInUser({ token: idToken, app_pub_key })).unwrap();
    } catch (error) {
      console.error(error);
      logout();
    }
  }, [dispatch, loggedIn, logout, web3auth]);

  const getUserInfo = useCallback(async () => {
    if (web3auth) {
      try {
        const response = await web3auth.getUserInfo();

        dispatch(setUserInfo(response));
      } catch (error) {
        console.error(error);
        dispatch(setUserInfo(null));
      }
    }
  }, [dispatch, web3auth]);

  const syncSafeAuth = useCallback(async () => {
    const options = {
      clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
      web3AuthNetwork: "testnet",
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x5",
        rpcTarget: "https://rpc.ankr.com/eth_goerli",
      },
    };

    const web3AuthPack = new Web3AuthModalPack({
      txServiceUrl: "https://safe-transaction-goerli.safe.global",
    });

    await web3AuthPack.init({ options });

    // const provider = web3AuthPack.getProvider();

    console.log("web3AuthPack", "provider", web3AuthProvider);

    if (web3AuthProvider) {
      const response = await web3AuthPack.signIn();

      console.log("web3AuthPack response", response);

      dispatch(setSafeAuthSignInResponse(response));
      dispatch(setSelectedSafe(response?.safes?.[0] || ""));
      dispatch(setProvider(web3AuthProvider));
      // setSafeAuthSignInResponse(response)
      // setSelectedSafe(response?.safes?.[0] || '')
      // setProvider(provider as SafeEventEmitterProvider)
      // setWeb3AuthPack(web3AuthPack)
    }

    dispatch(setWeb3AuthPack(web3AuthPack));
  }, [dispatch, web3AuthProvider]);

  useEffect(() => {
    if (authModalIsOpen && web3auth && web3AuthProvider && torusPlugin)
      showLoginPopup();
  }, [
    authModalIsOpen,
    web3auth,
    web3AuthProvider,
    torusPlugin,
    showLoginPopup,
  ]);

  useEffect(() => {
    dispatch(initiliazeAuthProvider());
  }, [dispatch]);

  useEffect(() => {
    if (loggedIn && authIsInitialized && !isAuthenticated) authenticateUser();
  }, [loggedIn, isAuthenticated, authIsInitialized, authenticateUser]);

  useEffect(() => {
    if (loggedIn && authIsInitialized && isAuthenticated && !username)
      getUserInfo();
  }, [loggedIn, isAuthenticated, authIsInitialized, getUserInfo, username]);

  useEffect(() => {
    if (loggedIn && authIsInitialized && isAuthenticated) syncSafeAuth();
  }, [loggedIn, isAuthenticated, authIsInitialized, syncSafeAuth]);

  return {
    logout,
  };
}

export default useWeb3Auth;

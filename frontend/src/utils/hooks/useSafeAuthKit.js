"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAuthModalIsOpen,
  selectIsAuthenticated,
  selectUserRegistrationIsPending,
} from "@/store/auth/selectors";
import {
  initiliazeAuthProvider,
  toogleAuthModal,
  logoutUser,
  setAuthIsPending,
} from "@/store/auth/slice";
import { verifyLoggedInUser } from "@/store/auth/actions";
import { setUserInfo } from "@/store/account/slice";
import {
  setSafeAuthSignInResponse,
  setSelectedSafe,
  setWeb3AuthPack,
  setProvider,
} from "@/store/safe-global/slice";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { redirect, usePathname } from "next/navigation";

function useSafeAuthKit() {
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState(null);

  const authModalIsOpen = useSelector(selectAuthModalIsOpen);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRegistrationIsPending = useSelector(
    selectUserRegistrationIsPending
  );

  const dispatch = useDispatch();
  const pathname = usePathname();

  const connectedHandler = (data) => console.log("CONNECTED", data);
  const disconnectedHandler = (data) => console.log("DISCONNECTED", data);

  const logoutCleanup = useCallback(() => {
    if (isAuthenticated && !web3AuthModalPack.getProvider()) {
      dispatch(logoutUser());
    }
  }, [dispatch, isAuthenticated, web3AuthModalPack]);

  useEffect(() => {
    (async () => {
      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x5",
        rpcTarget: "https://rpc.ankr.com/eth_goerli",
      };

      const options = {
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
        web3AuthNetwork: "testnet",
        // web3AuthNetwork: "aqua",
        chainConfig,
        uiConfig: {
          theme: "dark",
          loginMethodsOrder: ["google", "facebook"],
        },
      };

      const modalConfig = {
        [WALLET_ADAPTERS.TORUS_EVM]: {
          label: "torus",
          showOnModal: false,
        },
        [WALLET_ADAPTERS.METAMASK]: {
          label: "metamask",
          showOnDesktop: true,
          showOnMobile: false,
        },
      };

      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
      });

      const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider,
        loginSettings: {
          mfaLevel: "optional",
        },
        adapterSettings: {
          uxMode: "popup", // "redirect" | "popup"
          whiteLabel: {
            // logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
            // logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
            mode: "dark", // whether to enable dark, light or auto mode. defaultValue: auto [ system theme]
          },
          // mfaSettings: {
          //   deviceShareFactor: {
          //     enable: true,
          //     priority: 1,
          //     mandatory: true,
          //   },
          //   backUpShareFactor: {
          //     enable: true,
          //     priority: 2,
          //     mandatory: false,
          //   },
          //   socialBackupFactor: {
          //     enable: true,
          //     priority: 3,
          //     mandatory: false,
          //   },
          //   passwordFactor: {
          //     enable: true,
          //     priority: 4,
          //     mandatory: false,
          //   },
          // },
        },
      });

      const web3AuthConfig = {
        txServiceUrl: "https://safe-transaction-goerli.safe.global",
      };

      const modalPack = new Web3AuthModalPack(web3AuthConfig);

      await modalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      modalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
      modalPack.subscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler);

      setWeb3AuthModalPack(modalPack);
      dispatch(setWeb3AuthPack(modalPack));

      return () => {
        modalPack.unsubscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
        modalPack.unsubscribe(ADAPTER_EVENTS.DISCONNECTED, disconnectedHandler);
      };
    })();
  }, [dispatch]);

  const authenticateUser = useCallback(async () => {
    const signInInfo = await web3AuthModalPack.signIn();
    console.log("SIGN IN RESPONSE: ", signInInfo);

    const userInfo = await web3AuthModalPack.getUserInfo();
    console.log("USER INFO: ", userInfo);

    dispatch(setSafeAuthSignInResponse(signInInfo));
    dispatch(setUserInfo(userInfo || undefined));
    dispatch(setProvider(web3AuthModalPack.getProvider()));

    return { userInfo, signInInfo };
  }, [dispatch, web3AuthModalPack]);

  const login = useCallback(async () => {
    if (!web3AuthModalPack) return;

    await authenticateUser();
  }, [authenticateUser, web3AuthModalPack]);

  const logout = useCallback(async () => {
    if (!web3AuthModalPack) return;

    await web3AuthModalPack.signOut();

    dispatch(setProvider(null));
    dispatch(setSafeAuthSignInResponse(null));
    logoutCleanup();
  }, [dispatch, logoutCleanup, web3AuthModalPack]);

  const showLoginPopup = useCallback(async () => {
    dispatch(toogleAuthModal(false));
    if (!web3AuthModalPack) return;

    try {
      dispatch(setAuthIsPending(true));
      const { userInfo, signInInfo } = await authenticateUser();

      if (signInInfo && userInfo) {
        const { idToken } = userInfo;

        dispatch(
          verifyLoggedInUser({ eoa: signInInfo?.eoa, token: idToken })
        ).unwrap();
        dispatch(setSelectedSafe(signInInfo?.safes?.[0] ?? ""));
      } else {
        logout();
        dispatch(setAuthIsPending(false));
      }

      // // Incase of secp256k1 curve, get the app_pub_key
      // const app_scoped_privkey = await web3AuthModalPack
      //   .getProvider()
      //   ?.request({
      //     method: "eth_private_key", // use "private_key" for other non-evm chains
      //   });
      // const app_pub_key = getPublicCompressed(
      //   Buffer.from(app_scoped_privkey.padStart(64, "0"), "hex")
      // ).toString("hex");

      // const { idToken } = userInfo;

      // dispatch(verifyLoggedInUser({ token: idToken, app_pub_key })).unwrap();
    } catch (error) {
      console.error(error);
      logout();
      dispatch(setAuthIsPending(false));
    }
  }, [authenticateUser, dispatch, logout, web3AuthModalPack]);

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      login();
    }
  }, [login, web3AuthModalPack]);

  useEffect(() => {
    if (
      web3AuthModalPack &&
      !web3AuthModalPack.getProvider() &&
      isAuthenticated
    ) {
      logoutCleanup();
    }
  }, [isAuthenticated, logoutCleanup, web3AuthModalPack]);

  useEffect(() => {
    if (authModalIsOpen && web3AuthModalPack) showLoginPopup();
  }, [authModalIsOpen, showLoginPopup, web3AuthModalPack]);

  useEffect(() => {
    console.log("pathname ", pathname);

    if (userRegistrationIsPending && !pathname.includes("user/register")) {
      redirect("/user/register");
    }
  }, [userRegistrationIsPending, pathname]);

  useEffect(() => {
    dispatch(initiliazeAuthProvider());
  }, [dispatch]);

  return {
    logout,
  };
}

export default useSafeAuthKit;

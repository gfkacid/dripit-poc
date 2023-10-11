"use client";
import { useCallback, useEffect, useState } from "react";
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
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  UserInfo,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthOptions } from "@web3auth/modal";
import { Web3AuthModalPack, Web3AuthConfig, AuthKitSignInData } from "@safe-global/auth-kit";

function useSafeAuthKit() {
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState(null);
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [provider, setProvider] = useState(null);

  const authModalIsOpen = useSelector(selectAuthModalIsOpen);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authIsInitialized = useSelector(selectAuthIsInitialized);
  const username = useSelector(selectAccountName);

  const dispatch = useDispatch();

  const connectedHandler = (data) => console.log("CONNECTED", data);
  const disconnectedHandler = (data) => console.log("DISCONNECTED", data);

  useEffect(() => {
    (async () => {
      const options = {
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID,
        web3AuthNetwork: "testnet",
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x5",
          rpcTarget: "https://rpc.ankr.com/eth_goerli",
          // chainId: "0x1",
          // rpcTarget: "https://rpc.ankr.com/eth",
        },
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

      const openloginAdapter = new OpenloginAdapter({
        loginSettings: {
          mfaLevel: "optional",
        },
        adapterSettings: {
          uxMode: "popup", // "redirect" | "popup"
          whiteLabel: {
            name: 'dripit',
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
      const modalPack = new Web3AuthModalPack(web3AuthConfig)
      await modalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      modalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

      modalPack.subscribe(
        ADAPTER_EVENTS.DISCONNECTED,
        disconnectedHandler
      );

      setWeb3AuthModalPack(modalPack);

      return () => {
        modalPack.unsubscribe(
          ADAPTER_EVENTS.CONNECTED,
          connectedHandler
        );
        modalPack.unsubscribe(
          ADAPTER_EVENTS.DISCONNECTED,
          disconnectedHandler
        );
      };
    })();
  }, [dispatch]);

  console.log(
    "web3AuthModalPack",
    web3AuthModalPack,
    web3AuthModalPack && web3AuthModalPack.getProvider()
  );

  const login = async () => {
    if (!web3AuthModalPack) return;

    const signInInfo = await web3AuthModalPack.signIn();
    console.log("SIGN IN RESPONSE: ", signInInfo);

    const userInfo = await web3AuthModalPack.getUserInfo();
    console.log("USER INFO: ", userInfo);

    setSafeAuthSignInResponse(signInInfo);
    setUserInfo(userInfo || undefined);
    setProvider(web3AuthModalPack.getProvider());
  };

  const logout = async () => {
    if (!web3AuthModalPack) return;

    await web3AuthModalPack.signOut();

    setProvider(null);
    setSafeAuthSignInResponse(null);
  };

  const showLoginPopup = useCallback(async () => {
    dispatch(toogleAuthModal(false));
    if (!web3AuthModalPack) return;

    console.log("im hereeeeeee", web3AuthModalPack);

    const signInInfo = await web3AuthModalPack.signIn();
    console.log("SIGN IN RESPONSE: ", signInInfo);

    const userInfo = await web3AuthModalPack.getUserInfo();
    console.log("USER INFO: ", userInfo);

    setSafeAuthSignInResponse(signInInfo);
    setUserInfo(userInfo || undefined);
    setProvider(web3AuthModalPack.getProvider());

    // console.log("im provider", provider);
  }, [dispatch, web3AuthModalPack]);

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      (async () => {
        await login();
      })();
    }
  }, [web3AuthModalPack]);

  useEffect(() => {
    if (authModalIsOpen && web3AuthModalPack) showLoginPopup();
  }, [authModalIsOpen, showLoginPopup, web3AuthModalPack]);

  useEffect(() => {
    dispatch(initiliazeAuthProvider());
  }, [dispatch]);

  return {
    // logout,
  };
}

export default useSafeAuthKit;

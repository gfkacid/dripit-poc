import { MoneriumPack } from "@safe-global/onramp-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import {
  AuthContext,
  Currency,
  OrderState,
  PaymentStandard,
} from "@monerium/sdk";
import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/store/auth/selectors";
import {
  selectAuthProvider,
  selectSelectedSafe,
  selectEoa,
} from "@/store/safe-global/selectors";
import { redirect, useSearchParams } from "next/navigation";
import { updateUserSettings } from "@/store/account/actions";

const MONERIUM_TOKEN = "monerium_token";

const useSafeMoneriumPack = () => {
  const [authContext, setAuthContext] = useState(null);
  const [safeThreshold, setSafeThreshold] = useState(null);
  const [moneriumClient, setMoneriumClient] = useState(null);
  const [moneriumPack, setMoneriumPack] = useState(null);
  const [orderState, setOrderState] = useState(null);

  const searchParams = useSearchParams();
  const linkWallet = searchParams.get("linkWallet");
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authProvider = useSelector(selectAuthProvider);
  const selectedSafe = useSelector(selectSelectedSafe);

  const init = useCallback(async () => {
    if (!isAuthenticated || !selectedSafe || !authProvider) return;

    const provider = new ethers.providers.Web3Provider(authProvider);
    const safeOwner = provider.getSigner();
    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: safeOwner,
    });

    const safeSdk = await Safe.create({
      ethAdapter,
      safeAddress: selectedSafe,
      isL1SafeMasterCopy: true,
    });

    const pack = new MoneriumPack({
      clientId: process.env.NEXT_PUBLIC_MONERIUM_CLIENT_ID,
      environment: "sandbox",
    });

    await pack.init({ safeSdk });

    pack.subscribe(OrderState.pending, (notification) => {
      setOrderState(notification.meta.state);
    });

    pack.subscribe(OrderState.placed, (notification) => {
      setOrderState(notification.meta.state);
    });

    pack.subscribe(OrderState.rejected, (notification) => {
      setOrderState(notification.meta.state);
      setTimeout(() => {
        setOrderState(undefined);
      }, 5000);
    });

    pack.subscribe(OrderState.processed, (notification) => {
      setOrderState(notification.meta.state);
      setTimeout(() => {
        setOrderState(undefined);
      }, 5000);
    });

    setMoneriumPack(pack);
  }, [selectedSafe, authProvider, isAuthenticated]);

  const closeMoneriumFlow = useCallback(async () => {
    moneriumPack?.close();
    localStorage.removeItem(MONERIUM_TOKEN);
    setAuthContext(undefined);
  }, [moneriumPack]);

  const startMoneriumFlow = useCallback(
    async (authCode, refreshToken) => {
      if (!moneriumPack) return;

      try {
        const moneriumClient = await moneriumPack.open({
          redirectUrl: `${window.location.origin}/user/settings`,
          authCode,
          refreshToken,
        });

        if (moneriumClient.bearerProfile) {
          localStorage.setItem(
            MONERIUM_TOKEN,
            moneriumClient.bearerProfile.refresh_token
          );

          const authContext = await moneriumClient.getAuthContext();
          const profile = await moneriumClient.getProfile(
            authContext.defaultProfile
          );
          const iban =
            profile.accounts.find(
              (account) => account.address === selectedSafe && account.iban
            )?.iban ?? "";

          if (isAuthenticated && iban) {
            const formData = new FormData();
            formData.append("monerium_iban", iban);

            await dispatch(updateUserSettings(formData)).unwrap();
            closeMoneriumFlow();
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, moneriumPack, selectedSafe, isAuthenticated, closeMoneriumFlow]
  );

  useEffect(() => {
    if (selectedSafe && isAuthenticated) init();
  }, [init, selectedSafe, isAuthenticated]);

  useEffect(() => {
    if (linkWallet && moneriumPack) startMoneriumFlow();
  }, [linkWallet, moneriumPack, startMoneriumFlow]);

  useEffect(() => {
    const authCode =
      new URLSearchParams(window.location.search).get("code") || undefined;
    const refreshToken = localStorage.getItem(MONERIUM_TOKEN) || undefined;

    if (authCode || refreshToken) startMoneriumFlow(authCode, refreshToken);
  }, [moneriumPack, startMoneriumFlow]);

  return {
    moneriumPack,
    moneriumClient,
  };
};

export default useSafeMoneriumPack;

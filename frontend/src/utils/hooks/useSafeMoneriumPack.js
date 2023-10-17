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
import { useSearchParams } from "next/navigation";

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
  const safeAddress = useSelector(selectEoa);

  console.log("safe monerium safeThreshold", safeThreshold);
  console.log("safe monerium moneriumPack", moneriumPack);
  console.log("safe monerium orderState", orderState);
  console.log("safe monerium authContext", authContext);
  console.log("safe monerium moneriumClient", moneriumClient);

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

    console.log("safe safeSdk", safeSdk);

    const pack = new MoneriumPack({
      clientId: process.env.NEXT_PUBLIC_MONERIUM_CLIENT_ID,
      environment: "sandbox",
    });

    await pack.init({ safeSdk });

    console.log("safe pack", pack);

    // console.log("safe OrderState", OrderState);

    pack.subscribe(OrderState.pending, (notification) => {
      setOrderState(notification.meta.state);
    });

    pack.subscribe(OrderState.placed, (notification) => {
      setOrderState(notification.meta.state);
    });

    pack.subscribe(OrderState.rejected, (notification) => {
      console.log("safe OrderState.rejected", notification);

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

    // const threshold = await safeSdk.getThreshold();
    // const owners = await safeSdk.getOwners();

    // console.log("safe threshold", threshold);
    // console.log("safe owners", owners);

    // setSafeThreshold(`${threshold}/${owners.length}`);
  }, [selectedSafe, authProvider, isAuthenticated]);

  const startMoneriumFlow = useCallback(
    async (authCode, refreshToken) => {
      if (!moneriumPack) return;

      console.log("hellloooooooo");

      const moneriumClient = await moneriumPack.open({
        // redirectUrl: process.env.REACT_APP_MONERIUM_REDIRECT_URL,
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
        const iban = profile.accounts.find((account) => account.address === safeAddress && account.iban)?.iban ?? '';
        console.log('IBAN: '+iban)
        
        // PUT API /user-settings `monerium_iban = iban`
        // on success: display message "Your wallet is successfully linked with Monerium. You can top it up anytime here[https://sandbox.monerium.dev/accounts]"
        // setMoneriumInfo(
        //   getMoneriumInfo(safeSelected, authContext, profile, balances)
        // );
      }

      // setMoneriumClient(moneriumClient);
      // dispatch(setMoneriumClient(moneriumClient));
    },
    [moneriumPack]
  );

  const closeMoneriumFlow = useCallback(async () => {
    moneriumPack?.close();
    localStorage.removeItem(MONERIUM_TOKEN);
    setAuthContext(undefined);
  }, [moneriumPack]);

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

  console.log("safeAddress", safeAddress);

  return {
    moneriumPack,
    moneriumClient,
  };
};

export default useSafeMoneriumPack;

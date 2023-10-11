import { useCallback, useEffect, useState } from "react";
import { StripePack } from "@safe-global/onramp-kit";

const useSafeStripePack = () => {
  const [stripePack, setStripePack] = useState(null);

  const uiLoadedHandler = useCallback(() => {
    console.log("uiLoadedHandler UI loaded");
  }, []);

  const sessionUpdatedHandler = useCallback((e) => {
    console.log("sessionUpdatedHandler Session Updated", e.payload);
  }, []);

  const init = useCallback(async () => {
    try {
      setStripePack(null);

      const stripe = new StripePack({
        // Get public key from Stripe: https://dashboard.stripe.com/register
        // stripePublicKey: process.env.NEXT_PUBLIC_STRIPE_KEY,
        stripePublicKey:
          "pk_test_51MZbmZKSn9ArdBimSyl5i8DqfcnlhyhJHD8bF2wKrGkpvNWyPvBAYtE211oHda0X3Ea1n4e9J9nh2JkpC7Sxm5a200Ug9ijfoO",
        // Deploy your own server: https://github.com/5afe/aa-stripe-service
        onRampBackendUrl: "https://aa-stripe.safe.global",
      });
      await stripe.init();

      stripe.subscribe("onramp_ui_loaded", uiLoadedHandler);
      stripe.subscribe("onramp_session_updated", sessionUpdatedHandler);

      stripe.unsubscribe("onramp_ui_loaded", uiLoadedHandler);
      stripe.unsubscribe("onramp_session_updated", sessionUpdatedHandler);

      setStripePack(stripe);
    } catch (error) {
      console.log(error);
      setStripePack(null);
    }
  }, [sessionUpdatedHandler, uiLoadedHandler]);

  useEffect(() => {
    init();
  }, [init]);

  return {
    stripePack,
  };
};

export default useSafeStripePack;

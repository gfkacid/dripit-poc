import { selectIsAuthenticated } from "@/store/auth/selectors";
import { selectSelectedSafe } from "@/store/safe-global/selectors";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";
import tokenABI from "@/utils/blockchain/erc20abi.json";
import { setUserInfo } from "@/store/account/slice";

function useBlockchain() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const selectedSafe = useSelector(selectSelectedSafe);
  const dispatch = useDispatch();

  const getBlockchainBalance = useCallback(
    async (selectedSafe) => {
      try {
        const tokenAddress = process.env.NEXT_PUBLIC_EURE_TOKEN_ADDRESS;
        const provider = new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        );

        // Create an instance of the ERC20 token contract
        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenABI,
          provider
        );

        // Query the balance of the wallet address
        const balance = await tokenContract.balanceOf(selectedSafe);

        const balanceInEther = ethers.utils.formatEther(balance);
        console.log(`Balance of ${selectedSafe}: ${balanceInEther} EURe`);

        dispatch(setUserInfo({ blockchain: { balance: balanceInEther } }));
      } catch (error) {
        console.error(error);
        dispatch(setUserInfo({ blockchain: { balance: 0 } }));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    let interval = null;

    if (isAuthenticated && selectedSafe) {
      interval = setInterval(() => getBlockchainBalance(selectedSafe), 60000);
    }

    return () => (interval ? clearInterval(interval) : {});
  }, [getBlockchainBalance, isAuthenticated, selectedSafe]);
}

export default useBlockchain;

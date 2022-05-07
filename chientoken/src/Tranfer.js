import React from "react";
import { useWeb3Transfer, MoralisProvider } from "react-moralis";
import { Moralis } from "moralis";
const TransferWeth = () => {
  // const { Moralis, chainId } = useMoralis();
  const { fetch, error, isFetching } = useWeb3Transfer({
    amount: Moralis.Units.Token(20, 18),
    receiver: "0x59959Ab802D4A689E842e6cEF037B4CDf6B48A93",
    type: "erc20",
    contractAddress: "0x27E6Ce50c3B43586460De56BC8168BbC328aA176",
  });

  return (
    // Use your custom error component to show errors
    <MoralisProvider>
      <div>
        {/* {error && <ErrorMessage error={error} />} */}
        <button onClick={() => fetch()} disabled={isFetching}>
          Transfer
        </button>
      </div>
    </MoralisProvider>
  );
};

export default TransferWeth;

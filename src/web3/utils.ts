import { formatEther, parseEther, formatUnits } from "viem";
import { client, publicClient, account, config } from "./config";
import { erc20ABI } from "./erc20ABI";
import { getBalance } from '@wagmi/core'

const erc20TokenContractAddress = process.env
  .REACT_APP_ERC20_TOKEN_CONTRACT as `0x${string}`;
const transferAmount = parseEther(
  process.env.REACT_APP_FAKE_WETH_TRANSFER_AMOUNT || "1"
);

export const checkAllowance = async () => {
  const allowanceData = await publicClient.readContract({
    address: erc20TokenContractAddress,
    abi: erc20ABI,
    functionName: "allowance",
    args: [account, erc20TokenContractAddress],
  });
  if (Number(allowanceData) < Number(transferAmount)) {
    const { request } = await publicClient.simulateContract({
      account,
      address: erc20TokenContractAddress,
      abi: erc20ABI,
      functionName: "approve",
      args: [account, transferAmount],
    });
    await client.writeContract(request);
  }
};

export const transferToken = async () => {
    const { request } = await publicClient.simulateContract({
        account,
        address: erc20TokenContractAddress,
        abi: erc20ABI,
        functionName: "transfer",
        args: [process.env.REACT_APP_FAKE_WETH_DESTINATION_ACCOUNT, transferAmount],
      });
      await client.writeContract(request);
}

export const getNativeBalance = async() => {
  const balance = await publicClient.getBalance({ 
    address: account,
  })
  return formatEther(balance) 
}

export const getERC20Balance = async() => {
  const balance = await getBalance(config, {
    address: account,
    token: erc20TokenContractAddress, 
  })
  const formatBalance = formatUnits(balance.value, balance.decimals)
  return {value: formatBalance, symbol: balance.symbol}
}
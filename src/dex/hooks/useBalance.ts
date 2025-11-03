import { useEffect, useState } from 'react';
import { useAccount } from './useAccount';
import { useSdk } from './useAeSdk';

export function useBalance() {
  const { sdkInstance } = useSdk();
  const { address } = useAccount();

  const [balance, setBalance] = useState<string>()

  useEffect(() => {
    if (!address) return;

    sdkInstance.getBalance(address).then((balance) => {
      setBalance(balance);
    });
  }, [address, sdkInstance])

  return {
    balance,
  };
}

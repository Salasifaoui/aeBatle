import { toAe } from "@aeternity/aepp-sdk";
import { useAtom } from "jotai";
import { useMemo } from "react";
import configs from "../config";
import { Decimal } from "../libs/decimal";
import { DEX_ADDRESSES, getTokenBalance } from "../libs/dex";
import { aex9BalancesAtom, balanceAtom, chainNamesAtom } from "../store/walletAtoms";
import { useAeSdk } from "./useAeSdk";

export const useAccountBalances = (selectedAccount: string) => {
    const { sdk } = useAeSdk();
    const [chainNames] = useAtom(chainNamesAtom);
    const [_balance, setBalance] = useAtom(balanceAtom);
    const [_aex9Balances, setAex9Balances] = useAtom(aex9BalancesAtom);

    const balance = useMemo(() => _balance[selectedAccount] || 0, [_balance, selectedAccount]);
    const decimalBalance = useMemo(() => Decimal.from((toAe(balance ?? 0))), [balance]);

    const aex9Balances = useMemo(() => _aex9Balances[selectedAccount] || [], [_aex9Balances, selectedAccount]);

    async function getAccountBalance() {
        if (!selectedAccount) return;
        const balance = await sdk?.getBalance(selectedAccount as `ak_${string}`);
        setBalance(prev => ({ ...prev, [selectedAccount]: balance }));
    }

    const _loadAex9DataFromMdw = async (url: string, items: any[] = []) => {
        const fetchUrl = `${configs.networks.ae_mainnet.apiUrl}${url}`
        const response = await fetch(fetchUrl);
        const data = await response.json();

        if (data.next) {
            return _loadAex9DataFromMdw(items.concat(data.data) as any[]);
        }
        return items.concat(data.data);
    }
    async function loadAccountAex9Balances() {
        const url = `/v2/aex9/account-balances/${selectedAccount}?limit=100`;

        const balances = await _loadAex9DataFromMdw(url, []);
        const waeBalances = await getTokenBalance(sdk, DEX_ADDRESSES.wae, selectedAccount);

        const accountBalances = balances.concat({
            contract_id: DEX_ADDRESSES.wae,
            amount: waeBalances.toString(),
            decimals: 18,
            name: 'Wrapped AE',
            symbol: 'WAE',
        });
        setAex9Balances(prev => ({
            ...prev, [selectedAccount]: accountBalances
        }));
        return accountBalances;
    }

    async function loadAccountData() {
        if (selectedAccount) {
            getAccountBalance();
            loadAccountAex9Balances();
        }
    }

    return {
        selectedAccount,
        chainNames,
        balance,
        decimalBalance,
        aex9Balances,
        loadAccountData,
        loadAccountAex9Balances,
    }
};
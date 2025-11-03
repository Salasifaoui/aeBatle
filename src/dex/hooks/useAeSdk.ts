import { useAtom } from "jotai";
import { useContext, useMemo } from "react";
import { WalletInfo } from "../../../node_modules/@aeternity/aepp-sdk/es/aepp-wallet-communication/rpc/types";
import { AeSdkContext } from "../context/AeSdkContext";
import { activeAccountAtom } from "../store/accountAtoms";
import { walletInfoAtom } from "../store/walletAtoms";

export const useAeSdk = () => {
    const [walletInfo, setWalletInfo] = useAtom<WalletInfo | undefined>(walletInfoAtom);
    const [activeAccount, setActiveAccount] = useAtom<string | undefined>(activeAccountAtom);

    const context = useContext(AeSdkContext);
    if (!context) {
        throw new Error("useAeSdk must be used within an AeSdkProvider");
    }
    const sdk = useMemo(() => {
        if (walletInfo && activeAccount) {
            return context.aeSdk;
        }
        return context.staticAeSdk;
    }, [walletInfo, activeAccount]);

    return {
        ...context,
        sdk,
    };
};
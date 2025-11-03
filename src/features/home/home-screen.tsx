import { NavBar } from "@/components/ui/nav-bar";
import { ScreenLayout } from "@/components/ui/screen-layout/screen-layout";
import ButtonAction from "@/src/components/ButtonAction";
import WalletButton from "@/src/components/wallet/wallet-button";
import ZixActionSheet from "@/src/components/ZixActionSheet";
import { useAeSdk, useModal } from "@/src/dex/hooks";
import { useAccount } from "@/src/dex/hooks/useAccount";
import { useWalletConnect } from "@/src/dex/hooks/useWalletConnect";
import { useAuth } from "@/src/features/auth";
import PopularList from "@/src/features/home/components/popular-list";
import { useEffect } from "react";

export default function HomeScreen() {
  const { user } = useAuth();
  const { initSdk, sdkInitialized, activeAccount } = useAeSdk();
  const { loadAccountData } = useAccount();
  const { checkWalletConnection, connectWallet } = useWalletConnect();

  const { closeModal, openedModals } = useModal();

  useEffect(() => {
    initSdk();
  }, []);

  useEffect(() => {
    if (sdkInitialized) {
      checkWalletConnection();
    }
  }, [sdkInitialized]);

  // setup intervals
  useEffect(() => {
    if (!activeAccount) return;
    loadAccountData();
    const interval = setInterval(() => {
      loadAccountData();
    }, 10000);
    return () => clearInterval(interval);
  }, [activeAccount]);

  return (
    <ScreenLayout>
      <NavBar showProfileButton={user?.userId ? true : false}>
        <WalletButton />
      </NavBar>

      <PopularList />
      <ZixActionSheet
        isOpen={openedModals.length > 0}
        onClose={() => closeModal(openedModals[openedModals.length - 1].key)}
        title="Connect Wallet"
        subtitle="Connect your wallet to continue"
      >
        <ButtonAction
          text="Connect Wallet"
          onPress={() => {
            connectWallet();
          }}
        />
      </ZixActionSheet>
    </ScreenLayout>
  );
}

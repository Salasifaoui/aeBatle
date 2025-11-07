import { NavBar } from "@/components/ui/nav-bar";
import { ScreenLayout } from "@/components/ui/screen-layout/screen-layout";
import { useAuth } from "@/src/features/auth";
import PopularList from "@/src/features/home/components/popular-list";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native";
import InvitationView from "../invitation/ui/invitation-view";

export default function HomeScreen() {
  const { user, profile } = useAuth();
  // const { initSdk, sdkInitialized, activeAccount } = useAeSdk();
  // const { loadAccountData } = useAccount();
  // const { checkWalletConnection, connectWallet } = useWalletConnect();

  // const { closeModal, openedModals } = useModal();
  const router = useRouter();


  // useEffect(() => {
  //   initSdk();
  // }, [initSdk]);

  // useEffect(() => {
  //   if (sdkInitialized) {
  //     checkWalletConnection();
  //   }
  // }, [sdkInitialized, checkWalletConnection]);

  // setup intervals
  // useEffect(() => {
  //   if (!activeAccount) return;
  //   loadAccountData();
  //   const interval = setInterval(() => {
  //     loadAccountData();
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, [activeAccount, loadAccountData]);

  return (
    <ScreenLayout>
      <NavBar showProfileButton={user?.userId ? true : false}>
        {/* <WalletButton /> */}
      </NavBar>
      <ScrollView showsVerticalScrollIndicator={false}>
      

      <PopularList />
      <InvitationView />

      {/* <ZixActionSheet
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
      </ZixActionSheet> */}
      </ScrollView>
    </ScreenLayout>
  );
}

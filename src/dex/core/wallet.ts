import { BrowserWindowMessageConnection, walletDetector } from "@aeternity/aepp-sdk";
import { Platform } from "react-native";
import { Wallet, Wallets } from "./types";


/**
 * Detects available wallets within a specified timeout period.
 * Note: This only works on web platforms. On mobile (iOS/Android), it returns an empty wallets object.
 *
 * @param {Object} options - The options for detecting wallets.
 * @param {number} [options.timeout=15000] - The timeout period in milliseconds to wait for wallet detection.
 * @returns {Promise<Wallets | undefined>} A promise that resolves to the detected wallets or undefined if no wallets are detected within the timeout period.
 */
export async function detectWallets({
  timeout = 15000,
}): Promise<Wallets> {
  // BrowserWindowMessageConnection only works on web platforms
  // On mobile, return empty wallets immediately
  if (Platform.OS !== 'web') {
    return {};
  }

  const foundWallet: Wallets = await new Promise((resolve) => {
    const $walletConnectTimeout = setTimeout(
      () => {
        resolve({});
      },
      timeout
    );

    const handleWallets = async ({
      newWallet,
      wallets,
    }: {
      newWallet?: Wallet | undefined;
      wallets: Wallets;
    }) => {
      clearTimeout($walletConnectTimeout);
      stopScan();
      const detectedWallets: Wallets = {
        ...wallets,
      }
      if (newWallet) {
        detectedWallets[newWallet.info.id] = newWallet;
      }
      resolve(detectedWallets);
    };

    const scannerConnection = new BrowserWindowMessageConnection({
      debug: true,
    });
    const stopScan = walletDetector(scannerConnection, handleWallets);
  });

  return foundWallet;
}

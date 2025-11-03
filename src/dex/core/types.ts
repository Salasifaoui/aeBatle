import { BrowserWindowMessageConnection } from "@aeternity/aepp-sdk";

export interface Wallet {
  info: {
    id: string;
    type: string;
    origin: string;
  };
  getConnection: () => BrowserWindowMessageConnection;
}


export interface Wallets {
  [key: string]: Wallet;
}

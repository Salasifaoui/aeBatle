import { AeSdk, MemoryAccount } from "@aeternity/aepp-sdk";
import dotenv from "dotenv";
import { nodes } from './config';
dotenv.config();

const account = new MemoryAccount(process.env.AE_PRIVATE_KEY as string);

export const aeSdk = new AeSdk({
  nodes,
  accounts: [account],
});
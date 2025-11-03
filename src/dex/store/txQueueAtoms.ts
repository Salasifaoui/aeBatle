import { Encoded } from '@aeternity/aepp-sdk';
import { atom, SetStateAction } from 'jotai';

export type TxQueueEntry = {
  status: string;
  tx: Encoded.Transaction;
  signUrl: string;
  transaction?: Encoded.Transaction;
};

// BroadcastChannel polyfill for React Native
class BroadcastChannelPolyfill {
  private messageHandler: ((event: MessageEvent<any>) => void) | null = null;

  constructor(public name: string) {}

  get onmessage() {
    return this.messageHandler;
  }

  set onmessage(listener: ((event: MessageEvent<any>) => void) | null) {
    // In React Native, we store the listener but won't receive cross-tab messages
    // since there are no multiple tabs in a mobile app
    this.messageHandler = listener;
  }

  postMessage(message: any) {
    // In React Native, postMessage is a no-op since there are no other tabs
    // This allows the code to work without errors
  }

  close() {
    this.messageHandler = null;
  }
}

// Get BroadcastChannel implementation (native if available, polyfill otherwise)
const getBroadcastChannel = (key: string): BroadcastChannel | BroadcastChannelPolyfill => {
  if (typeof BroadcastChannel !== 'undefined') {
    return new BroadcastChannel(key);
  }
  return new BroadcastChannelPolyfill(key);
};

// atomWithBroadcast implementation for cross-tab communication
function atomWithBroadcast<Value>(key: string, initialValue: Value) {
  const baseAtom = atom(initialValue);
  const listeners = new Set<(event: MessageEvent<any>) => void>();
  const channel = getBroadcastChannel(key);

  channel.onmessage = (event) => {
    console.log("[atomWithBroadcast] onmessage", event);
    listeners.forEach((l) => l(event));
  };

  const broadcastAtom = atom(
    (get) => get(baseAtom),
    (get, set, update: { isEvent: boolean; value: SetStateAction<Value> }) => {
      set(baseAtom, update.value);

      if (!update.isEvent) {
        channel.postMessage(get(baseAtom));
      }
    },
  );

  broadcastAtom.onMount = (setAtom) => {
    const listener = (event: MessageEvent<any>) => {
      setAtom({ isEvent: true, value: event.data });
    };

    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  const returnedAtom = atom(
    (get) => get(broadcastAtom),
    (_get, set, update: SetStateAction<Value>) => {
      set(broadcastAtom, { isEvent: false, value: update });
    },
  );

  return returnedAtom;
}

// Transaction queue atom with broadcast for cross-tab communication
export const transactionsQueueAtom = atomWithBroadcast<Record<string, TxQueueEntry>>('txQueue:transactions', {});

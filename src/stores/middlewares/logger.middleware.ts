import { StateCreator, StoreMutatorIdentifier } from "zustand";

type Logger = <
  T extends unknown,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T extends unknown>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...a);
    
  };
  const setState = store.setState;
  store.setState = (...a) => {
    setState(...a);
    
  };

  return f(loggedSet, get, store);
};

export const logger = loggerImpl as unknown as Logger;

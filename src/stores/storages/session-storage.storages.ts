import { StateStorage, createJSONStorage } from "zustand/middleware";

const storageApi: StateStorage = {
  getItem: function (name: string): string | Promise<string | null> | null {
    const data = sessionStorage.getItem(name);
    return data;
  },
  setItem: function (name: string, value: string): unknown {
    const data = sessionStorage.setItem(name, value);
    return data;
  },
  removeItem: function (name: string): unknown {
    const data = sessionStorage.removeItem(name);
    return data;
  },
};

export const customSessionStorage = createJSONStorage(() => storageApi);

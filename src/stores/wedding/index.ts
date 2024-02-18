import { create } from "zustand";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { devtools } from "zustand/middleware";
// Crear el store

type SharedSlice = PersonSlice;
export const useWeddingBoundStore = create<SharedSlice>()(
  // en a se pasan los argumentos que se necesiten (get, set, storeApi, etc.)
  devtools((...a) => ({
    ...createPersonSlice(...a),
  }))
);

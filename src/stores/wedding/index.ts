import { create } from "zustand";
import { PersonSlice, createPersonSlice } from "./person.slice";
import { devtools, persist } from "zustand/middleware";
import { GuestSlice, createGuestSlice } from "./gest.slice";
import { DateSlice, createDateSlice } from "./date.slice";
// Crear el store

type SharedSlice = PersonSlice & GuestSlice & DateSlice;
export const useWeddingBoundStore = create<SharedSlice>()(
  // en a se pasan los argumentos que se necesiten (get, set, storeApi, etc.)
  devtools(
    persist(
      (...a) => ({
        ...createPersonSlice(...a),
        ...createGuestSlice(...a),
        ...createDateSlice(...a),
      }),
      { name: "WeddingBoundStore" }
    )
  ) // Aquí se agrega el nombre "WeddingBoundStore"
);

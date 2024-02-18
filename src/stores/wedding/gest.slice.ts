import { StateCreator } from "zustand";

export interface GuestSlice {
  gestCount: number;
  setGestCount: (gestCount: number) => void;
}
export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
  gestCount: 0,
  // Validat que gestCount no sea menor a 0
  setGestCount: (gestCount: number) => {
    if (gestCount < 0) {
      set({ gestCount: 0 });
    } else {
      set({ gestCount });
    }
  },
});

import { create } from "zustand";
import { BlackBears } from "../../pages/01-basic/components/BlackBears";

interface Bearer {
  id: number;
  name: string;
}

interface BearStore {
  blackBears: number;
  polarBears: number;
  pandaBears: number;
  bearers: Bearer[];
  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  doNothing: () => void;
  addBearer: (bearer: Bearer) => void;
  removeBearer: (bearer: Bearer) => void;
  clearBearers: () => void;

  computed: {
    totalBears: number;
  };
}

export const useBearStore = create<BearStore>()((set, get) => ({
  blackBears: 10,
  polarBears: 20,
  pandaBears: 30,

  bearers: [
    { id: 1, name: "John" },
    { id: 2, name: "Doe" },
  ],

  computed: {
    get totalBears(): number {

      return get().blackBears + get().polarBears + get().pandaBears+
      get().bearers.length;
    },
  },

  doNothing: () =>
    set((state) => ({
      bearers: [...state.bearers],
    })),
  increaseBlackBears: (by) =>
    set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by) =>
    set((state) => ({ polarBears: state.polarBears + by })),

  increasePandaBears: (by) =>
    set((state) => ({ pandaBears: state.pandaBears + by })),

  addBearer: () =>
    set((state) => ({
      bearers: [
        ...state.bearers,
        {
          id: state.bearers.length + 1,
          name: `Oso # ${state.bearers.length + 1}`,
        },
      ],
    })),

  removeBearer: (bearer) =>
    set((state) => ({
      bearers: state.bearers.filter((b) => b.id !== bearer.id),
    })),
  clearBearers: () => set({ bearers: [] }),
}));

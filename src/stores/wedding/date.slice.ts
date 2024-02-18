import { StateCreator } from "zustand";

export interface DateSlice {
  eventDate: Date; // number, string, primitivo

  eventYYYYMMDD: () => string;
  eventHHMM: () => string;

  setEventDate: (parcialDate: string) => void;
  setEventTime: (eventTime: string) => void;
}

export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),

  eventYYYYMMDD: () => {
    const date = new Date(get().eventDate);
    return date.toISOString().split("T")[0];
  },

  eventHHMM: () => {
    const date = new Date(get().eventDate);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  },

  setEventDate: (parcialDate: string) =>
    set((state) => {
      //YYYY-MM-DD
      const year = parseInt(parcialDate.split("-")[0]);
      const month = parseInt(parcialDate.split("-")[1]) - 1;
      const day = parseInt(parcialDate.split("-")[2]);

      const newDate = new Date(state.eventDate);
      newDate.setFullYear(year, month, day);

      return { eventDate: newDate };
    }),

  setEventTime: (eventTime: string) =>
    set((state) => {
      //HH:MM

      const hours = parseInt(eventTime.split(":")[0]);
      const minutes = parseInt(eventTime.split(":")[1]);

      const newDate = new Date(state.eventDate);
      newDate.setHours(hours, minutes);

      return { eventDate: newDate };
    }),
});

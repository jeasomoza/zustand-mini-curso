import { StateStorage, createJSONStorage } from "zustand/middleware";

const firabase: string =
  "https://zustand-mini-curso-31e78-default-rtdb.firebaseio.com/zustand-mini-curso";
const FirabaseApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firabase}/${name}.json`).then((res) =>
        res.json()
      );
      console.log(data);
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  setItem: function (name: string, value: string): unknown {
    try {
      const data = fetch(`${firabase}/${name}.json`, {
        method: "PUT",
        body: JSON.stringify(value),
      }).then((res) => res.json());
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  removeItem: function (name: string): unknown {
    try {
      const data = fetch(`${firabase}/${name}.json`, {
        method: "DELETE",
      }).then((res) => res.json());
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};

export const FiirabaseStorage = createJSONStorage(() => FirabaseApi);

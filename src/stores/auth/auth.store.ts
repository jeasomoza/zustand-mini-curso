import type { AuthStatus, User } from "../../interfaces";
import { StateCreator, create } from "zustand";
import { AuthService } from "../../services/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token: undefined | string;
  user: undefined | User;

  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export const storeApi: StateCreator<AuthState> = (set, get) => ({
  status: "pending",
  token: undefined,
  user: undefined,

  loginUser: async (email, password) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: "authorized", token, user });
    } catch (err) {
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw err;
    }
  },

  logoutUser: () => {
    set({ status: "unauthorized", token: undefined, user: undefined });
  },
});

export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);

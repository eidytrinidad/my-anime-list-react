import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
  isAuth: boolean;
};
type Actions = {
  setToken?: (token: string) => void;
  logout?: () => void;
  setProfile?: () => void;
};

export const authStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      isAuth: false,
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: true,
        })),
    }),
    {
      name: "auth",
    }
  )
);

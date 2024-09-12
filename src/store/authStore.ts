import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserProfile } from "../interfaces";

type State = {
  token: string;
  isAuth: boolean;
  profile: IUserProfile | null;
};
type Actions = {
  setToken: (token: string) => void;
  logout: () => void;
  setProfile: (profile: IUserProfile) => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: "",
      isAuth: false,
      profile: { name: "" },
      setProfile: (profile: IUserProfile) => {
        return set(() => ({
          profile,
        }));
      },
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: true,
        })),
      logout: () =>
        set(() => ({
          token: "",
          isAuth: false,
          profile: null,
        })),
    }),
    {
      name: "auth",
    }
  )
);

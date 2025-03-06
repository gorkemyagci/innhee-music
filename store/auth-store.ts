"use client";

import { create } from "zustand";
import nookies, { setCookie, destroyCookie } from "nookies";
import { jwtDecode } from "jwt-decode";

interface IAuth {
  token: string | null;
  user: any | null;
  setToken: (token: string, keepLogged?: boolean) => void;
  setUser: (user: any) => void;
  logout: () => void;
  initializeFromToken: () => void;
}

export const useAuthStore = create<IAuth>((set) => {
  const domain = ".upwork-next-app.vercel.app";
  const initializeFromToken = () => {
    const cookies = nookies.get(null);
    if (cookies.token) {
      try {
        const decodedUser = jwtDecode(cookies.token) as any;
        set({
          token: `Bearer ${cookies.token}`,
          user: decodedUser,
        });
      } catch (err) {}
    }
  };

  if (typeof window !== "undefined") {
    initializeFromToken();
  }

  return {
    token: null,
    user: null,
    setToken: (token, keepLogged = false) => {
      try {
        const decodedUser = jwtDecode(token) as any;
        set({ token: `Bearer ${token}`, user: decodedUser });
        setCookie(null, "token", token, {
          maxAge: keepLogged ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
          path: "/",
          domain: domain,
        });
      } catch (error) {
        set({ token: `Bearer ${token}` });
      }
    },
    setUser: (user) => {
      set({ user });
    },
    logout: () => {
      destroyCookie(null, "token", {
        path: "/",
        domain: domain,
      });
      set({ token: null, user: null });
    },
    initializeFromToken,
  };
});

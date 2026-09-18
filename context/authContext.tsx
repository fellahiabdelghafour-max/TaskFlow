"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSnackBar } from "./snackBarContext";

interface AuthProps {
  upInfo: {
    username: string;
    email: string;
    password: string;
  };
  setUpInfo: (UP: {
    username: string;
    email: string;
    password: string;
  }) => void;
  inInfo: {
    email: string;
    password: string;
  };
  setInInfo: (IN: { email: string; password: string }) => void;
  login: () => void;
  register: () => void;
  logOut: () => void;
  loading: boolean;
  user: userType;
}

const AuthContext = createContext<AuthProps | null>(null);
type userType = {
  id: string;
  username: string;
  email: string;
} | null;
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<userType>(null);
  const router = useRouter();
  const snackBarContext = useSnackBar();

  const [upInfo, setUpInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [inInfo, setInInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    checkToken();
  }, []);

  if (!snackBarContext) return;
  const { setMessage, setOpen, setType } = snackBarContext;
  async function login() {
    if (inInfo.email === "" || inInfo.password === "") {
      setMessage("please fill the fields");
      setType("info");
      setOpen(true);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inInfo.email,
          password: inInfo.password,
        }),
      });

      const data = await res.json();
      if (!res.ok && res.status !== 200) throw new Error(data.message);

      setUser(data.user);
      setMessage("Logged in Successfully");
      setType("success");
      router.push("/");
    } catch (err) {
      const error =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Unexpected error";

      setMessage(error);
      setType("error");
    } finally {
      setOpen(true);
      setLoading(false);
    }
  }

  async function register() {
    if (
      upInfo.email === "" ||
      upInfo.password === "" ||
      upInfo.username === ""
    ) {
      setMessage("please fill the fields");
      setType("info");
      setOpen(true);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: upInfo.username,
          email: upInfo.email,
          password: upInfo.password,
        }),
      });

      const data = await res.json();
      if (!res.ok && res.status !== 200) throw new Error(data.message);
      setUser(data.user);
      setMessage("Registration successful.");
      setType("success");
      router.push("/");
    } catch (err) {
      console.log(err);
      const error =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Unexpected error";

      setMessage(error);
      setType("error");
    } finally {
      setOpen(true);
      setLoading(false);
    }
  }

  async function logOut() {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!res.ok) throw new Error("Unexpected error");
      setUser(null);
      setMessage("logged out successfully");
      setType("success");
      router.push("/");
    } catch (err) {
      console.log(err)
      const error =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Unexpected error";

      setMessage(error);
      setType("error");
    } finally {
      setOpen(true);
      setLoading(false);
    }
  }

  async function checkToken() {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) throw new Error("No user");

      const data = await res.json();

      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        upInfo,
        setUpInfo,
        inInfo,
        setInInfo,
        login,
        logOut,
        register,
        loading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

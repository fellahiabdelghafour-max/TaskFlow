"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ModeProps {
  mode: "dark" | "light";
  setMode: (m: "dark" | "light") => void;
  switchMode:()=>void;
}

const ModeContext = createContext<ModeProps | null>(null);

export default function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("mode");
    if (saved === "light" || saved === "dark") {
      setMode(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  function switchMode(){
       setMode(mode=== 'dark'?'light':'dark')
  }
  return (
    <ModeContext.Provider value={{ mode, switchMode,setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export const useModeContext = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useModeContext must be used within ModeProvider");
  }
  return context;
};
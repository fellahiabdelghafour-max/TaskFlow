"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import saveMode from "../hooks/saveMode/saveMode";

interface ModeProps {
  mode: "dark" | "light";
  setMode: (m: "dark" | "light") => void;
  switchMode: () => void;
}

const ModeContext = createContext<ModeProps | null>(null);

export default function ModeProvider({ children ,InitialMode }: { children: ReactNode, InitialMode:'dark'|'light'}) {
  const [mode, setMode] = useState<"dark" | "light">(InitialMode);


  useEffect(() => {
    saveMode(mode);
  }, [mode]);

  function switchMode() {
    setMode(mode === "dark" ? "light" : "dark");
  }
  return (
    <ModeContext.Provider value={{ mode, switchMode, setMode }}>
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

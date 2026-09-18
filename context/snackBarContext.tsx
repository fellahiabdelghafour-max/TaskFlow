'use client'
import { useContext, createContext, useState, ReactNode } from "react";

interface snackBarProps {
  open: boolean;
  setOpen: (o: boolean) => void;
  message: string;
  setMessage: (m: string) => void;
  type: "info" | "success" | "error";
  setType: (t: "info" | "success" | "error") => void;
}

const SnackBarContext = createContext<snackBarProps|null>(null);

export default function ScnackBarProvider({children} : {children:ReactNode}){
    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState('');
    const [type , setType] = useState<'success'|'info'|'error'>('success')

      return<SnackBarContext.Provider value={{open,setOpen,message,setMessage,type,setType}}>
          {children}
      </SnackBarContext.Provider>
};

export const useSnackBar = ()=>useContext(SnackBarContext);

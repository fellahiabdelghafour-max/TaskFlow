'use client'

import { createContext, ReactNode, useContext, useState } from "react"

interface AuthProps {
     upInfo:{
        username:string,
        email:string,
        password:string,
     };
     setUpInfo:(UP:{
        username:string,
        email:string,
        password:string,
     })=>void;
          inInfo:{
        email:string,
        password:string,
     };
     setInInfo:(IN:{
        email:string,
        password:string,
     })=>void;
}

const AuthContext = createContext<AuthProps|null>(null);

export default function AuthProvider({children}:{children:ReactNode}){
      const [upInfo,setUpInfo] = useState({
        username:'',
        email:'',
        password:''
      })
            const [inInfo,setInInfo] = useState({
        email:'',
        password:''
      })
    return<AuthContext.Provider value={{upInfo,setUpInfo,inInfo,setInInfo}}>
          {children}
    </AuthContext.Provider>

}

export const useAuth = ()=> useContext(AuthContext);
import React, {createContext, useContext,useState,useEffect} from 'react'

const AuthContext = createContext();
export const useAuth=()=>{
    const Context = useContext(AuthContext)
    if(!Context){
        throw new Error("egeuhus")
    }
    return Context;
}

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading]= useState(true);
    
    useEffect(()=>{
        const savedUser = localStorage.getItem('user');
        if(savedUser){

            setUser(JSON.parse(savedUser));
        }
        setLoading(false)

    },[])

    const Login = (userData)=>{
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData))
    };

    const logout = ()=>{
        setUser(null);
        localStorage.removeItem('user')
    };

    const value = {
        user, Login, logout, loading 
    }

 return( <AuthContext.Provider value = {value}>
    {children}
    </AuthContext.Provider>)
   
  

};
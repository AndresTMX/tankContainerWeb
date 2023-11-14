import { createContext, useState , useEffect} from "react";
import { useSupabase } from "../../Hooks/useSupabase";

const AuthContext = createContext();

function AuthProvider({children}) {

   const { supabase } = useSupabase();
   const [session, setSession] = useState(null);
   const [loading, setLoading] = useState(null);


   const login = async (email, password) => {
       try {
           const { data, error } = await supabase.auth.signInWithPassword({
               email: email,
               password: password,
           })
       } catch (error) {

       }
   }

   const logOut = async () => {
       try {
           const { error } = await supabase.auth.signOut()
       } catch (error) {

       }
   }

   const getDataSesion = async () => {

       try {            
           const { data, error } = await supabase.auth.getSession()
           return data;
       } catch (error) {
         
       }

   }

   const currentSession = async () => {
      setLoading(true)
      const sessionData = await getDataSesion();
      setTimeout(() => {
         setSession(sessionData);
         setLoading(false)
      }, 1200)
    };

    useEffect(() => {
      currentSession();
    }, []);

   const auth = {login, logOut, getDataSesion, session, loading}

    return ( 
        <AuthContext.Provider value={auth}>
           {children}
        </AuthContext.Provider>
     );
}

export {AuthProvider, AuthContext};

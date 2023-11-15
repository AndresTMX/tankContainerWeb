import { useState, useEffect } from "react";
import { useSupabase } from "../useSupabase";

function useSession() {

    const { supabase } = useSupabase();
    const [key, setKey] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        try {

            getAuth();

            if (key) {
                const MySession = sessionStorage.getItem(key);
                let MySessionInJson;

                if (!MySession) {
                    sessionStorage.setItem(key, JSON.stringify(session));
                    MySessionInJson = session;
                } else {
                    MySessionInJson = JSON.parse(MySession);
                }

                setSession(MySessionInJson);
            }

            setLoading(false)
        } catch (error) {
            setLoading(false)
        }

    }, []);

    const initSession = () => {
        try {
            sessionStorage.setItem(key, JSON.stringify(session));
            setSession(session);
        } catch (error) {
            console.log(error);
        }
    };

    const finalSession = () => {
        sessionStorage.removeItem(key);
        setSession(null);
    };

    const getAuth = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (data) {
            setKey(data.session?.access_token)
            setSession(data.session?.user.user_metadata)
            setTimeout(() => { setLoading(false); }, 1000)
        }else{

        }
    }

    return { session, error, loading, initSession, finalSession };
}

export { useSession };
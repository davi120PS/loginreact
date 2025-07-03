import { createContext, useEffect , useState, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    // Sign up
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) {
            console.error("Error signing up:", error);
            return { success: false, error };
        }
        return { success: true, data };
    }

    // Sign in
    const signInUser = async ({email, password}) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            }); 
            if (error) {
                console.error("Error signing in:", error);
                return { success: false, error: error.message };
            }
            console.log("User signed in:", data);
            return { success: true, data };
        } catch (error) {
            console.error("Unexpected error during sign in:", error);
            return { success: false, error: error.message };
        }
    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);


    // Sign out
    const SignOut = () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
        }
    };

    return(
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, SignOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
}
import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse,AccessTokenResponse,User } from "../types/types";
import { API_URL } from "./constantes";

interface AuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    saveUser: (_userData: AuthResponse ) => {},
    getRefreshToken:() => {},
    getUser: () => ({} as User | undefined),
    signOut: () => {},
});

export function AuthProvider({children}: AuthProviderProps){

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken ] = useState<string>("");
    const [ user, setUser ] = useState<User>();
    const [isLoading, setIsLoading ] = useState(true);
    //const [refreshToken, setRefreshToken ] = useState<string>("");

    useEffect(() => {
        checkAuth();
    },[]);

    async function requestNewAccessToken(refreshToken:string){
        try{
            const response = await fetch(`${API_URL}/refrescarToken`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${refreshToken}`,
                },
            });

            if(response.ok){
                const json = await response.json() as AccessTokenResponse;

                if(json.error){
                    throw new Error(json.error);
                }
                return json.body.accessToken;
            } else {
                throw new Error(response.statusText);
            }
        } catch(error){
            console.log(error);

            return null;
        }
    }


    async function getUserInfo(accessTokens:string) {
        try{
            const response = await fetch(`${API_URL}/usuario`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessTokens}`,
                },
            });

            if(response.ok){
                const json = await response.json();

                if(json.error){
                    throw new Error(json.error);
                }
                return json.body;
            } else {
                throw new Error(response.statusText);
            }
        } catch(error){
            console.log(error);

            return null;
        }
    }

    async function checkAuth(){
        if(accessToken){
            const userInfo = await getUserInfo(accessToken);
            saveSesionInfo(userInfo, accessToken, getRefreshToken()!);
            setIsLoading(false);
            return;
        } else{
            const token = getRefreshToken();
            if(token){
                const newAccessToken = await requestNewAccessToken(token);
                if(newAccessToken){
                    const userInfo = await getUserInfo(newAccessToken);
                    if(userInfo){
                        saveSesionInfo(userInfo, newAccessToken, token);
                        setIsLoading(false);
                        return;
                    }
                }

            }
        }
        setIsLoading(false);
    }

    function signOut(){
        setIsAuthenticated(false);
        setAccessToken("");
        setUser(undefined);
        localStorage.removeItem("token");
    }

    function saveSesionInfo(userInfo:User, accessToken:string, refreshToken:string){
        setAccessToken(accessToken);
        localStorage.setItem("token", JSON.stringify(refreshToken));
        setIsAuthenticated(true);
        setUser(userInfo);
    }

    function getAccessToken(){
        return accessToken;
    }

    function getRefreshToken():string | null{
        const tokenData = localStorage.getItem("token");

        if(tokenData){
            const token = JSON.parse(tokenData);
            return token;
        }
        return null;
    }

    function saveUser(userData: AuthResponse){
        saveSesionInfo(
            userData.body.user,
            userData.body.accessToken,
            userData.body.refreshToken
        );
    }

    function getUser(){
        return user;
    }

    return <AuthContext.Provider value={{isAuthenticated,getAccessToken,saveUser,getRefreshToken,getUser,signOut}}>
        {isLoading ? "Loading.." : children}
    </AuthContext.Provider>
};

export const useAuth = () => useContext(AuthContext);

///Se crea un contexto para que los compnentes de la pagina seppan 
///si alguien tiene una sesion activa o si esta autenticado.
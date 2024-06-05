import { useState } from "react"
import VistaDefault from "../Vista/VistaDefault"
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../autenticacion/AuthProvider";
import { API_URL } from "../autenticacion/constantes";
import type { AuthResponseError, AuthResponse } from "../types/types";

export default function InicioSesion(){
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    
    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try{
            const response = await fetch(`${API_URL}/inicioSesion` ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombreUsuario,
                    contrasenia,
                }),
            });

            if(response.ok){
                console.log("Logged in sucessfully!");
                setErrorResponse("");

                const json = (await response.json()) as AuthResponse;
                if(json.body.accessToken && json.body.refreshToken) {
                    auth.saveUser(json);
                    goTo("/Inicio");
                }

            } else{
                console.log("Something went wrong");
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        }catch (error) {
            console.log(error);
        }
    }

    if(auth.isAuthenticated){
        return <Navigate to="/Inicio"/>;
    }

    return(
        <VistaDefault>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Inicio de Sesión</h1>

                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

                <label>Nombre de Usuario</label>
                <input type="text" value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}/>

                <label>Contraseña</label>
                <input type="password" value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}/>

                <button>Entrar</button>
            </form>
        </VistaDefault>
    )
}
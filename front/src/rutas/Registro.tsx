import { useState } from "react";
import VistaDefault from "../Vista/VistaDefault"
import { useAuth } from "../autenticacion/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../autenticacion/constantes";
import { AuthResponseError } from "../types/types";

export default function Registro(){
    const [nombre, setNombre] = useState("");
    const [aPaterno, setAPaterno] = useState("");
    const [aMaterno, setAMaterno] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [cContrasenia, setCContrasenia] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    
    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        try{
            const response = await fetch(`${API_URL}/registro` ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    aPaterno,
                    aMaterno,
                    nombreUsuario,
                    correo,
                    contrasenia,
                    cContrasenia,
                }),
            });

            if(response.ok){
                console.log("User created sucessfully!");
                setErrorResponse("");
                goTo("/");
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
                <h1>Registro de Usuario</h1>

                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

                <label>Nombre</label>
                <input type="text" value={nombre}
                onChange={(e) => setNombre(e.target.value)}/>

                <label>Apellido Paterno</label>
                <input type="text" value={aPaterno}
                onChange={(e) => setAPaterno(e.target.value)}/>

                <label>Apellido Materno</label>
                <input type="text" value={aMaterno}
                onChange={(e) => setAMaterno(e.target.value)}/>

                <label>Nombre de Usuario</label>
                <input type="text" value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}/>

                <label>Correo Electronico</label>
                <input type="email" value={correo}
                onChange={(e) => setCorreo(e.target.value)}/>

                <label>Contraseña</label>
                <input type="password" value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}/>

                <label>Confirmar Contraseña</label>
                <input type="password" value={cContrasenia}
                onChange={(e) => setCContrasenia(e.target.value)}/>

                <button>Registrar Usuario</button>
            </form>
        </VistaDefault>
    )
}
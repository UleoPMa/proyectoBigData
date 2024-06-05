import React from "react";
import { useAuth } from "../autenticacion/AuthProvider";
import { Link } from "react-router-dom";
import { API_URL } from "../autenticacion/constantes";

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}){
    const auth = useAuth();

    async function handleSignOut(e: React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault();

        try{
            const response = await fetch(`${API_URL}/cerrarSesion`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getRefreshToken()}`,
                },
            });

            if(response.ok){
                auth.signOut();
            }
            
        } catch(error)
        {

        }
    }
    return (
        <>
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/inicio">Inicio</Link>
                    </li>
                    <li>
                        {auth.getUser()?.nombreUsuario ?? ""}
                    </li>
                    <li>
                        <a href="#" onClick={handleSignOut}>Cerrar Sesion</a>
                    </li>
                </ul>
            </nav>
        </header>

        <main>{children}</main>
        </>
    )
}
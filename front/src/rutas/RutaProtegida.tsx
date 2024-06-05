import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../autenticacion/AuthProvider";

export default function RutaProtegida(){
    const auth = useAuth();

    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
import { useEffect, useState } from "react";
import PortalLayout from "../Vista/PortalLayout";
import { API_URL } from "../autenticacion/constantes";
import type { AuthResponseError, AuthResponse } from "../types/types";
import { json } from "react-router-dom";
import Chart from 'chart.js/auto';

export default function Inicio(){
    const [operacion, setOperacion] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const [iteraciones, setIteraciones] = useState("");
    const [poblacionChart, setPoblacionChart] = useState<Chart | null>(null);
    const [promedioSimpleChart, setPromedioSimpleChart] = useState<Chart | null>(null); 
    const [promedioSimpleEChart, setPromedioSimpleEChart] = useState<Chart | null>(null); 
    const [promedioMovilChart, setPromedioMovilChart] = useState<Chart | null>(null); 
    const [promedioMovilEChart, setPromedioMovilEChart] = useState<Chart | null>(null); 
    const [promedioMovilDobleChart, setPromedioMovilDobleChart] = useState<Chart | null>(null); 
    const [promedioMovilDobleEChart, setPromedioMovilDobleEChart] = useState<Chart | null>(null); 
    const [showPromedioMovilSimple, setShowPromedioMovilSimple] = useState(false);
    const [showPromedioSimple, setShowPromedioSimple] = useState(false);
    const [showPromedioMovilDoble, setShowPromedioMovilDoble] = useState(false);

    async function fetchData() {
        try {
            const response = await fetch(`${API_URL}/principal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    operacion,
                    iteraciones,
                }),
            });

            if(response.ok) {
                
                const json =(await response.json()) as AuthResponse;
                const data = json.body.data;
                setErrorResponse("");

                if(poblacionChart) {
                    poblacionChart.destroy();
                }
                if(promedioSimpleChart) {
                    promedioSimpleChart.destroy();
                }
                if(promedioSimpleEChart) {
                    promedioSimpleEChart.destroy();
                }
                if(promedioMovilChart) {
                    promedioMovilChart.destroy();
                }
                if(promedioMovilEChart) {
                    promedioMovilEChart.destroy();
                }
                if(promedioMovilDobleChart) {
                    promedioMovilDobleChart.destroy();
                }
                if(promedioMovilDobleEChart) {
                    promedioMovilDobleEChart.destroy();
                }


                const canvas = document.getElementById('poblacion') as HTMLCanvasElement;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    const poblacion = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels:data.periodo,
                            datasets: [
                                {
                                    label: 'Natalidad',
                                    data: data.natalidad,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1 
                                },
                                {
                                    label: 'Mortlidad',
                                    data: data.mortalidad,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Nupcialidad',
                                    data: data.nupcialidad,
                                    backgroundColor: 'rgba(54, 90, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                        }
                    });
                    setPoblacionChart(poblacion);
                } else {
                    console.error('No se pudo obtener el contexto 2D del canvas.');
                }

                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                const canvasPS = document.getElementById('promedioSimple') as HTMLCanvasElement;
                const ctxPS = canvasPS.getContext('2d');

                if (ctxPS) {
                    const promedioSimple = new Chart(ctxPS, {
                        type: 'bar',
                        data: {
                            labels:data.periodo,
                            datasets: [
                                {
                                    label: 'Natalidad',
                                    data: data.vectorPSNat,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1 
                                },
                                {
                                    label: 'Mortlidad',
                                    data: data.vectorPSMor,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Nupcialidad',
                                    data: data.vectorPSNup,
                                    backgroundColor: 'rgba(54, 90, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                        }
                    });
                    setPromedioSimpleChart(promedioSimple);
                } else {
                    console.error('No se pudo obtener el contexto 2D del canvas.');
                }        
                
                const canvasPSE = document.getElementById('promedioSimpleE') as HTMLCanvasElement;
                const ctxPSE = canvasPSE.getContext('2d');

                if (ctxPSE) {
                    const promedioSimpleE = new Chart(ctxPSE, {
                        type: 'bar',
                        data: {
                            labels:data.periodo,
                            datasets: [
                                {
                                    label: 'Natalidad',
                                    data: data.vectorPSEAbsNat,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1 
                                },
                                {
                                    label: 'Mortlidad',
                                    data: data.vectorPSEAbsMor,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Nupcialidad',
                                    data: data.vectorPSEAbsNup,
                                    backgroundColor: 'rgba(54, 90, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                        }
                    });
                    setPromedioSimpleEChart(promedioSimpleE);
                } else {
                    console.error('No se pudo obtener el contexto 2D del canvas.');
                }   
                
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                const canvasPM = document.getElementById('promedioMovil') as HTMLCanvasElement;
                const ctxPM = canvasPM.getContext('2d');

                if (ctxPM) {
                    const promedioMovil = new Chart(ctxPM, {
                        type: 'bar',
                        data: {
                            labels:data.periodo,
                            datasets: [
                                {
                                    label: 'Natalidad',
                                    data: data.vectorPMSNat,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1 
                                },
                                {
                                    label: 'Mortlidad',
                                    data: data.vectorPMSMor,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Nupcialidad',
                                    data: data.vectorPMSNup,
                                    backgroundColor: 'rgba(54, 90, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                        }
                    });
                    setPromedioMovilChart(promedioMovil);
                } else {
                    console.error('No se pudo obtener el contexto 2D del canvas.');
                }        
                
                const canvasPME = document.getElementById('promedioMovilE') as HTMLCanvasElement;
                const ctxPME = canvasPME.getContext('2d');

                if (ctxPME) {
                    const promedioMovilE = new Chart(ctxPME, {
                        type: 'bar',
                        data: {
                            labels:data.periodo,
                            datasets: [
                                {
                                    label: 'Natalidad',
                                    data: data.vectorPMSENat,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1 
                                },
                                {
                                    label: 'Mortlidad',
                                    data: data.vectorPMSEMor,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Nupcialidad',
                                    data: data.vectorPMSENup,
                                    backgroundColor: 'rgba(54, 90, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                        }
                    });
                    setPromedioMovilEChart(promedioMovilE);
                } else {
                    console.error('No se pudo obtener el contexto 2D del canvas.');
                } 

                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                const canvasPMD = document.getElementById('promedioMovilDoble') as HTMLCanvasElement;
                const ctxPMD = canvasPMD.getContext('2d');

                if (ctxPMD) {
                    const promedioMovilDoble = new Chart(ctxPMD, {
                        type: 'bar',
                        data: {
                            labels:data.periodo,
                            datasets: [
                                {
                                    label: 'Natalidad',
                                    data: data.pronosticosPMDNat,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1 
                                },
                                {
                                    label: 'Mortlidad',
                                    data: data.pronosticosPMDMor,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Nupcialidad',
                                    data: data.pronosticosPMDNup,
                                    backgroundColor: 'rgba(54, 90, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                        }
                    });
                    setPromedioMovilDobleChart(promedioMovilDoble);
                } else {
                    console.error('No se pudo obtener el contexto 2D del canvas.');
                }        
                
                const canvasPMDE = document.getElementById('promedioMovilDobleE') as HTMLCanvasElement;
                const ctxPMDE = canvasPMDE.getContext('2d');

                if (ctxPMDE) {
                    const promedioMovilDobleE = new Chart(ctxPMDE, {
                        type: 'bar',
                        data: {
                            labels:data.periodo,
                            datasets: [
                                {
                                    label: 'Natalidad',
                                    data: data.vectorPMDENat,
                                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                    borderColor: 'rgba(255, 99, 132, 1)',
                                    borderWidth: 1 
                                },
                                {
                                    label: 'Mortlidad',
                                    data: data.vectorPMDEMor,
                                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                },
                                {
                                    label: 'Nupcialidad',
                                    data: data.vectorPMDENup,
                                    backgroundColor: 'rgba(54, 90, 235, 0.2)',
                                    borderColor: 'rgba(54, 162, 235, 1)',
                                    borderWidth: 1
                                }
                            ]
                        },
                        options: {
                        }
                    });
                    setPromedioMovilDobleEChart(promedioMovilDobleE);
                } else {
                    console.error('No se pudo obtener el contexto 2D del canvas.');
                } 
                

            } else{
                console.log("Something went wrong");
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.body.error);
                return;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        await fetchData();

        if(operacion === "promedioSimple"){     
            console.log(showPromedioSimple,showPromedioMovilSimple,showPromedioMovilDoble);
            setShowPromedioSimple(true);
            setShowPromedioMovilSimple(false);
            setShowPromedioMovilDoble(false);
            console.log(showPromedioSimple,showPromedioMovilSimple,showPromedioMovilDoble);
        }
        else if(operacion === "promedioMovilSimple") {
            console.log(showPromedioSimple,showPromedioMovilSimple,showPromedioMovilDoble);
            setShowPromedioMovilSimple(true);
            setShowPromedioSimple(false);
            setShowPromedioMovilDoble(false);
            console.log(showPromedioSimple,showPromedioMovilSimple,showPromedioMovilDoble);
        }
        else if(operacion === "promedioMovilDoble") {
            setShowPromedioMovilDoble(true);
            setShowPromedioSimple(false);
            setShowPromedioMovilSimple(false);
        }
    }

    useEffect(() => {
        fetchData(); // Ejecutar fetchData cuando el componente se monte
    }, [operacion, iteraciones]);

    return (
        <PortalLayout>
            <div></div>
        </PortalLayout>
    )
}

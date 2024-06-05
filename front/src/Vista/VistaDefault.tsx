import { Children } from "react";
import { Link } from "react-router-dom";
interface VistaDefaultProps{
    children:React.ReactNode;
}

export default function VistaDefault({children}: VistaDefaultProps){
    return(
       <>
       <header>
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/Registro">Registrate</Link>
                </li>
            </ul>
        </nav>
       </header>

       <main>
        {children}
       </main>
       </> 
    )
}
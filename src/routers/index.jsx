import { Switch, Route } from "react-router-dom";
import Cadastro from "../pages/Cadastro";
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Home from "../pages/Home";
import { useEffect, useState } from "react";
const Routes = () => {


    const [enviar, setEnviar] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('@KenzieHub: token')) || '';
        const user = JSON.parse(localStorage.getItem('@KenzieHub: token')) || '';
        if(token) {
            return setEnviar(true)
        }
        if(user){
            console.log(user)
        }
    }, [])
    
    return(
        <div>
            {/* Pagina HOME */}
            <Switch>
                <Route exact path='/'>
                    <Home enviar={enviar}
                    setEnviar={setEnviar}/>
                </Route>
            </Switch>
      

            {/* pagina cadastro */}
            <Switch>
                <Route path='/users'>
                    <Cadastro enviar={enviar}/>
                </Route>
            </Switch>

            {/* pagina login */}
            <Switch>
                <Route path='/login'>
                    <Login enviar={enviar}
                    setEnviar={setEnviar} />
                </Route>
            </Switch>

            {/* Pagina do usuario */}
            <Switch>
                <Route path='/dashboard'>
                    <Dashboard enviar={enviar}  
                    setEnviar={setEnviar}/>
                </Route>
            </Switch>
        </div>
    )
}

export default Routes
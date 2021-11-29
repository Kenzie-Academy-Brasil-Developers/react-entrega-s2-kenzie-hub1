import { Redirect, useHistory } from "react-router-dom";

const Home = ({enviar}) => {

    const history = useHistory()

    if(enviar){
        return <Redirect to='/dashboard'/>
    }
    
    return(
        <div>
            <h2>Sejam Bem Vindos Ao Home</h2>
             <button onClick={() => history.push('/users')}>Cadastro</button>
             <button onClick={() => history.push('/login')}>Login</button>
             
        </div>
       
    )
}
export default Home
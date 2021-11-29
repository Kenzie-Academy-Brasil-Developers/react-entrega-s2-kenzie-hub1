import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory, Redirect} from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

import { Container,
         Containerdiv,
         ColorH2, 
         ColorInput,
         ButtonColor,
         ButtonCad,
         Pcolor,
         SpanColor,
         } from './styles';


        //  Login
const Login = ({enviar, setEnviar}) => {

    const schema = yup.object().shape({

        email: yup.string()
        .required('Mandatory Email')
        .email('Invalid Email'),

        password: yup.string()
        .required('Mandatory Password'),

    })
    const history = useHistory()

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver:yupResolver(schema)
    })

    
    //fazer requisição da API
    const submitForm = (data) => {
   
    api
        .post('/sessions', data)
        .then(response => {
            const { token} = response.data;
            const { user } = response.data.user;
            toast.success('Login Completo')
            localStorage.setItem('@KenzieHub:token', JSON.stringify(token));
            localStorage.setItem('@KenzieHub:token', JSON.stringify(user));
            setEnviar(true)

            
            return history.push('/dashboard');
        })
        .catch((err) => {
            toast.error(err)
        })
    };

    if(enviar){
        return <Redirect to='/dashboard'/>
    }

    return(
        <Containerdiv>
            <ColorH2>Kenzie <SpanColor>Hub</SpanColor></ColorH2>

            <Container>
                <form className='form' onSubmit={handleSubmit(submitForm)}>

                    <ColorInput
                    placeholder='Login com Email'
                    {...register('email')}/>
                    <Pcolor>{errors.email?.message}</Pcolor>

                    <ColorInput
                    placeholder='Senha'
                    {...register('password')}
                    type='password'/>
                    
                    <Pcolor>{errors.senha?.message}</Pcolor>

                    <ButtonColor type='submit'>Logar</ButtonColor>

                    <Pcolor>Criar uma Página para montar suas 
                        <strong> habilidades metas e progresso</strong>
                    </Pcolor>
                    
                    <ButtonCad onClick={() => history.push('/users')}>Cadastrar</ButtonCad>
                </form> 
                
            </Container>

        </Containerdiv>
    )
}

export default Login
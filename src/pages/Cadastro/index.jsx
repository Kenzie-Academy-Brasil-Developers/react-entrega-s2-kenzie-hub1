import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import {Containerdiv, 
        Container, 
        ColorH2, 
        ColorInput, 
        ButtonColor,
        LabelColor,
        Pcolor,
        SpanColor,
        SelectColor
} from './style'
import api from '../../services/api';
import { toast } from 'react-toastify';

const Cadastro = ({enviar}) => {

    const history = useHistory()

    const schema = yup.object().shape({
        name: yup.string()
        .required('Mandatory Name'),

        email: yup.string()
        .required('Mandatory Email')
        .email('Invalid Email'),

        bio: yup.string()
        .required('Mandatory Bio'),

        course_module: yup.string()
        .required('Mandatory Course'),

        contact: yup.string()
        .required('Mandatory Contact'),

        password: yup.string()
        .min(6,'minimo 6 digitos')
        .required('Mandatory Password'),

        confirme_password: yup.string()
        .oneOf([yup.ref('password')], 'Different Password ')
        .required('Mandatory Password'),
    })

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver:yupResolver(schema)
    })


    //fazer requisição da API
    const submitForm = ({name,email,bio,course_module,contact,password,confirm_senha}) => {
   
        const user = { name,email,bio,course_module,contact,password,confirm_senha}
    api
        .post('/users', user)
        .then((_) => {
            toast.success('Usuario cadastrado com sucesso')
            console.log(user)
            return history.push('/login');
        })
        .catch((err) => {
            toast.error('Erro ao criar a conta, tente outro email')
        })
    };
    
    if(enviar){
        return <Redirect to='/dashboard'/>
    }
   

    return(
        <Containerdiv>
            <ColorH2>Kenzie <SpanColor> Hub </SpanColor></ColorH2>

            {/* <button onClick={() => history.push('/login')}>Login</button> */}
            <Container>
                <form onSubmit={handleSubmit(submitForm)}>
                    <LabelColor>
                         <ColorInput 
                            placeholder='Nome'
                            pattern="[a-z-A-Z\s]+$"
                            {...register('name')}/>
                            <Pcolor>{errors.name?.message}</Pcolor>
                    </LabelColor>
                   
                    <LabelColor>
                        <ColorInput
                            placeholder='Email'
                            {...register('email')}/>
                            <Pcolor>{errors.email?.message}</Pcolor>
                    </LabelColor>
                   

                    <LabelColor>
                        <ColorInput
                            placeholder='Bio'
                            {...register('bio')}/>
                            <Pcolor>{errors.bio?.message}</Pcolor>
                    </LabelColor>
                    
                    <LabelColor>
                        <ColorInput
                            placeholder='Contato'
                            {...register('contact')}/>
                            <Pcolor>{errors.contato?.message}</Pcolor>
                    </LabelColor>
                    

                    <LabelColor>
                        <SelectColor{...register('course_module')}>
                            <option value=''>Selecione...</option>
                            <option value='Primeiro módulo (Introdução ao Frontend)'>Primeiro módulo (Introdução ao Frontend)</option>
                            <option value='Segundo módulo (Frontend Avançado)'>Segundo módulo (Frontend Avançado)</option>
                            <option value='Terceiro Módulo (introdução ao Backend)'>Terceiro Módulo (introdução ao Backend)</option>
                            <option value='Quarto Módulo (Backend Avançado)'>Quarto Módulo (Backend Avançado)</option>
                        </SelectColor>                        
                    </LabelColor>
                   

                    <LabelColor>
                        <ColorInput
                            placeholder='Senha'
                            {...register('password')}
                            type='password'/>
                            <Pcolor>{errors.senha?.message}</Pcolor>
                    </LabelColor>
                   
                    <LabelColor>
                        <ColorInput
                            placeholder='Confirmar Senha'
                            {...register('confirme_password')}
                            type='password'/>
                            <Pcolor>{errors.confirme_senha?.message}</Pcolor>
                    </LabelColor>
                    

                    <ButtonColor type='submit'>Cadastrar</ButtonColor>
                </form>
            </Container>

            <div>
                <button onClick={() => history.push('/')}>Home</button> 
            </div>
        </Containerdiv>

        
    )
}

export default Cadastro
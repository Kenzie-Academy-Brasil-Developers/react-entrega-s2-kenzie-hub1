import { Container, Button, TextField,
    Box} from "@mui/material"
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from "react-hook-form"
// import { useHistory } from "react-router-dom"
import { toast } from 'react-hot-toast'
import api from '../../services/api'

const AddWork = ( {newTrab, setOpen} ) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("@KenzieHub:user")) || '')
    // const [inputValue, setInputValue] = useState("Iniciante")
    const token = localStorage.getItem("@KenzieHub:token")
    // const[techs, setTechs] = useState([])
    
    const schema = yup.object().shape({
        title: yup.string().required('Informe o nome do trabalho que deseja adicionar'),
        description: yup.string().required('Informe a descrição do trabalho que deseja adicionar')
    })

    // const history = useHistory();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
      
      const handleAddTech = ( {title, description} ) => {
        const data = {title, description, deploy_url: 'https://kenziehub.herokuapp.com/'}
        api
        .post('/users/works', data, {
            headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(response => {
            console.log(response)
            let auxiliar = user
            auxiliar.works.push(data)   
            localStorage.setItem("@KenzieHub:user", JSON.stringify(auxiliar))       
            newTrab(data)
            toast.success("Trabalho adicionado com sucesso!")
            setOpen(false)
            
        })
        .catch((err) => toast.error('Trabalho já adicionado!'))
    }

    return (
        
        <Container component='main' maxWidth='xs'>
            <Box 
                component='form' 
                sx={{ mt: '50%', background: 'white',
                padding: '50px'}}
                onSubmit={handleSubmit(handleAddTech)}
                >
                <TextField 
                {...register("title")}
                id="outlined-basic" 
                fullWidth 
                label='Nome do Trabalho' 
                sx={{ mt:2, background: '#F5F5F5', color: '#999999' }}
                helperText={errors.title?.message}
                error={!!errors.title?.message}
                />
                <TextField 
                {...register("description")}
                id="outlined-basic" 
                fullWidth 
                label='Descrição do Trabalho' 
                sx={{ mt: 2, background: '#F5F5F5', color: '#999999', }}
                helperText={errors.description?.message}
                error={!!errors.description?.message}
                />
            
            <Button type='submit' fullWidth variant='contained' 
                sx={{
                    "&:hover": {
                        backgroundColor: '#2d2a77'
                    },
                    mt:3, 
                    mb: 2, 
                    bgcolor: '#403CAA',
                    padding: 2
                }}
                
                > Cadastrar </Button>
            </Box>
        </Container>
    )
}
export default AddWork

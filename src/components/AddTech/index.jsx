
    import { Container, Button, TextField, 
      Box, RadioGroup, FormControlLabel, Radio} from "@mui/material"
  import { useState, useEffect } from 'react'
  // import { LockOutlined } from "@material-ui/icons"
  import { yupResolver } from '@hookform/resolvers/yup'
  import * as yup from 'yup'
  import { useForm } from "react-hook-form"
  // import { useHistory } from "react-router-dom"
  import { toast } from 'react-hot-toast'
  import api from '../../services/api'
  
  const  AddTech = ( {newTechs, setOpen} ) => {
//   tech
      const [user, setUser] = useState(JSON.parse(localStorage.getItem("@KenzieHub:user")) || false)
      const [inputValue, setInputValue] = useState("Iniciante")
      const token = localStorage.getItem("@KenzieHub:token")
      console.log(user)
      const schema = yup.object().shape({
          title: yup.string().required('Informe a tech que deseja adicionar')
      })
      // const history = useHistory();
  
      const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm({
          resolver: yupResolver(schema),
        });
  
        function handleInput(evt){
          setInputValue(evt.target.value)
        }
  
        const handleAddTech = ( {title, status} ) => {
          const data = {title, status}
  
          api
          .post('/users/techs', data, {
              headers: {"Authorization" : `Bearer ${token}`}
  
          })
          .then(response => {
              console.log(response)
              let auxiliar = user
              auxiliar.techs.push(data)   
              localStorage.setItem("@KenzieHub:user", JSON.stringify(auxiliar))         
              newTechs(data)
              toast.success("Tech adicionada com sucesso!")
              setOpen(false)
              
          })
          .catch((err) => {
          console.log(err)
          toast.error('Tech já adicionada!')})
      }
      useEffect(() => {
          if(user){
              console.log(user)
              
          }
        }, [user]);
      
      return (
          
          <Container component='main' maxWidth='xs'>
              <Box 
                  component='form' 
                  sx={{ mt: '50%', border: '1px solid #F5F5F5', background: 'white',
              padding: '50px'}} 
                  onSubmit={handleSubmit(handleAddTech)}
                  >
                  <TextField 
                  {...register("title")}
                  id="outlined-basic" 
                  fullWidth 
                  label='Tecnologia' 
                  sx={{ mt:2, background: '#F5F5F5', color: '#999999' }}
                  helperText={errors.title?.message}
                  error={!!errors.title?.message}
                  />
              
  
              <RadioGroup 
              value = {inputValue}
              row aria-label="status" 
              onChange={(evt) => handleInput(evt)}
              >
  
                  <FormControlLabel 
                  {...register("status")}
                  value="Iniciante" 
                  control={<Radio />} 
                  label="Iniciante" 
                  
                  />
                  <FormControlLabel
                  {...register("status")} 
                  value="Intermediário" 
                  control={<Radio />} 
                  label="Intermediário" 
                  />
  
                  <FormControlLabel
                  {...register("status")} 
                  value="Avançado" 
                  control={<Radio />} 
                  label="Avançado" />
              </RadioGroup>
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
  export default AddTech
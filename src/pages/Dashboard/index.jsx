import { useState } from 'react'
import styles from './styles.css'
import { FiGitPullRequest, FiSmile, FiPhoneCall, FiMail, FiCodesandbox } from 'react-icons/fi'
import { useHistory } from "react-router-dom"
import AddTech from '../../components/AddTech'
import AddWork from '../../components/AddWork'
import Modal from '@mui/material/Modal';
import { Button, Box} from "@mui/material"

const Dashboard = ({enviar}) => {
    // dashboard
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("@KenzieHub:user")) || '')

    const [techs, setTechs] = useState(user.techs || [])
    const [trabalhos, setTrabalhos] = useState(user.works || [])

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    console.log(user)

    const newTechs = (newTech) => {
        setTechs([...techs, newTech])
    }

    const newTrab = (newTrab) => {
        setTrabalhos([...trabalhos, newTrab])
    }
    const history = useHistory();

    return(
        <div className='big-container'>
            <div className='header'>
                <h1>Kenzie </h1>
                <span className='hub2'>Hub</span>
            </div>
            <div className='big-section'>
                <div className='tecnologias'>
                <div className='cabecalho-tech'>
                        <h2>Minhas tecnologias</h2>
                        <Button sx={{ 
                            background: '#11995e',
                            color: 'white',
                            "&:hover": {
                                backgroundColor: '#0a7245'
                            }}} 
                        className='button-add-tech' onClick={() => setOpen(true)}>+</Button>
                        <Modal
                            open={open}
                            onClose={() => setOpen(false)}
                        >
                            <Box>
                                <AddTech newTechs={newTechs} setOpen={setOpen}></AddTech>
                            </Box>
                        </Modal>
                        
                    </div>
                    <ul className='ul-techs'>
                        {techs.map((item) => 
                        <li>
                            <div className='div-pai'>
                                <div className='div-imagem'>
                                    <FiCodesandbox className='icone' size={30} color='#11995e' />
                                </div>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.status}</p>
                                    <deleteButton item={item} />
                                </div>
                            </div>
                        </li>
                        )}
                    </ul>
                </div>
                <div className='meus-trabalhos'>
                    <div className='cabecalho-trabalhos'>
                        <h2>Meus trabalhos</h2>
                        <Button sx={{ 
                            background: '#403CAA',
                            color: 'white',
                            "&:hover": {
                                backgroundColor: '#2a2877'
                            }}} 
                        className='button-add-trabalho' onClick={() => setOpen2(true)}>+</Button>
                        <Modal
                            open={open2}
                            onClose={() => setOpen2(false)}
                        >
                            <Box>
                            <AddWork newTrab={newTrab} setOpen={setOpen2}></AddWork> 
                            </Box>
                        </Modal>

                    </div>
                    <ul className='ul-trabalho'>
                        {trabalhos.map((item) => 
                        <li>
                            <div className='div-pai-trabalho'>
                                <div className='div-imagem-trabalho'>
                                    <FiGitPullRequest className='icone' size={30} color='#403CAA' />
                                </div>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </li>
                        )}
                    </ul>
                </div>
                <div className='profile'>
                    <div className='profile-header'>
                        <div className='avatar'>
                            <FiSmile className='avatar' size={70} color='white' mt='10px'/>
                        </div>
                        <div className='dev-info'>
                            <h2>{user.name}</h2>
                            <p>{user.course_module}</p>
                        </div>
                    

                    </div>
                    <ul>
                        <li className='li-info1'>
                            <FiPhoneCall className='avatar' size={45} color='white' mt='10px'/>
                            <div className='dev-info2'>
                                <p>Ligar agora</p>
                                <span>{user.contact}</span>
                            </div>
                        </li>
                        <li className='li-info2'>
                            <FiMail className='avatar2' size={45} color='white' mt='10px'/>
                            <div className='dev-info2'>
                                <p>Enviar email</p>
                                <span>{user.email}</span>
                            </div>
                        </li>
                    </ul>
                    
                    <button className='button-sair' onClick={() => {
                        localStorage.clear()
                        history.push('/')}
                        }>Sair</button>
                </div>
            </div>
           

        </div>

    )
}
export default Dashboard
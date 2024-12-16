import { Router } from "express";
import Usuario_Controller from "../controller/Usuario_Controller.js";
import { auth } from "../middlewares/auth.js";
import { verificar_login } from "../middlewares/type.js";

const usuario_router = Router();

//Rotas dos Usuários
usuario_router.get('/login', Usuario_Controller.login);
usuario_router.post('/login', Usuario_Controller.autenticar_login);

usuario_router.get('/principal_userC', Usuario_Controller.principal_userC);
usuario_router.get('/principal_userF', Usuario_Controller.principal_userF);

usuario_router.get('/usuarios', Usuario_Controller.exibir); //verificar_login

usuario_router.get('/usuarios/cpf', Usuario_Controller.exibir_por_cpf); //verificar_login

//usuario_router.get('/usuarios/nome', Usuario_Controller.exibir_por_nome); //verificar_login

usuario_router.post('/usuarios', Usuario_Controller.cadastar);

usuario_router.put('/usuarios', Usuario_Controller.atualizar); //auth

usuario_router.delete('/usuarios', Usuario_Controller.deletar); //verificar_login

export default usuario_router;

/*sudo su
dhclient
ip a
put  negoicio
coloca o ip
filelizza
npm install no servidor 
pm2 start arq.js*/

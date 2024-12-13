import { Router } from "express";
import Usuario_Controller from "../controller/Usuario_Controller.js";

const usuario_router = Router();

//Rotas dos Usuários
usuario_router.get('/usuarios', Usuario_Controller.exibir);

usuario_router.get('/usuarios/cpf', Usuario_Controller.exibir_por_cpf);

usuario_router.get('/usuarios/nome', Usuario_Controller.exibir_por_nome);

usuario_router.post('/usuarios', Usuario_Controller.cadastar);

usuario_router.put('/usuarios', Usuario_Controller.atualizar);

usuario_router.delete('/usuarios', Usuario_Controller.deletar);

//Rotas sem testes e que não funcionam

usuario_router.get('/login', Usuario_Controller.autenticar_login, Usuario_Controller.verificar_usuario_biblio);
usuario_router.post('/login', Usuario_Controller.autenticar_login, Usuario_Controller.verificar_usuario_biblio);
usuario_router.get('/erro', Usuario_Controller.erro);
usuario_router.get('/principal_userC', Usuario_Controller.principal_userC);
usuario_router.get('/principal_userF', Usuario_Controller.principal_userF);

export default usuario_router;
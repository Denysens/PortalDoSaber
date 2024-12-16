import { Router } from "express";
import Emprestimo_Controller from "../controller/Emprestimo_Controller.js";
import { auth } from "../middlewares/auth.js";
import { verificar_login } from "../middlewares/type.js";

const emprestimo_router = Router();

emprestimo_router.get('/emprestimos', Emprestimo_Controller.exibir); //verificar_login

emprestimo_router.get('/emprestimos/ativos', Emprestimo_Controller.exibir_ativos); //verificar_login

emprestimo_router.get('/emprestimos/usuario', Emprestimo_Controller.exibir_emprestimos_usuario); //auth

emprestimo_router.post('/emprestimos', Emprestimo_Controller.cadastrar); //verificar_login

emprestimo_router.put('/emprestimos/:id', Emprestimo_Controller.atualizar); //verificar_login

export default emprestimo_router;
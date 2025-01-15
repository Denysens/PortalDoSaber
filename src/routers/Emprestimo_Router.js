import { Router } from "express";
import emprestimo_controller from "../controller/Emprestimo_Controller.js";
import { auth } from "../middlewares/auth.js";
import { verificar_login } from "../middlewares/type.js";

const emprestimo_router = Router();

//Direciona para a página de todos os empréstimos ativos
emprestimo_router.get('/emprestimos/views', verificar_login, emprestimo_controller.emprestimos_views);

//Exibir todos os empréstimos
emprestimo_router.get('/emprestimos', verificar_login, emprestimo_controller.exibir_emprestimos_ativos); 

//Direcionar para a página de emprestimo do usuário comum 
emprestimo_router.get('/emprestimos_usuario/views', auth, emprestimo_controller.emprestimos_usuario_views); 

//Exibir os empréstimos de um usuário
emprestimo_router.get('/emprestimos_usuario', auth, emprestimo_controller.exibir_emprestimos_usuario);

//Cadastrar empréstimo 
emprestimo_router.post('/emprestimos', verificar_login, emprestimo_controller.cadastrar); 

//Atualizar um empréstimo (Devolver)
emprestimo_router.put('/emprestimos', verificar_login, emprestimo_controller.atualizar);

export default emprestimo_router;
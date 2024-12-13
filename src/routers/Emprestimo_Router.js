import { Router } from "express";
import Emprestimo_Controller from "../controller/Emprestimo_Controller.js";

const emprestimo_router = Router();

emprestimo_router.get('/emprestimos', Emprestimo_Controller.exibir);

emprestimo_router.get('/emprestimos/usuarios',Emprestimo_Controller.exibir_emprestimos_usuario);

emprestimo_router.post('/emprestimos', Emprestimo_Controller.cadastrar);

emprestimo_router.put('/emprestimos', Emprestimo_Controller.atualizar);

export default emprestimo_router;
import { Router } from "express";
import Livro_Controller from "../controller/Livro_Controller.js";
import { verificar_login } from "../middlewares/type.js"
const livro_router = Router();

//Rotas dos livros
livro_router.get('/livros', Livro_Controller.exibir);

livro_router.get('/livros/categoria', Livro_Controller.exibir_por_categoria);

livro_router.get('/livros/:id', Livro_Controller.exibir_por_id);

//livro_router.get('/livros/titulo', Livro_Controller.exibir_por_titulo);

livro_router.post('/livros', Livro_Controller.cadastar); //verificar_login

livro_router.put('/livros/:id', Livro_Controller.atualizar_emprestimo); //verificar_login

livro_router.delete('/livros/:id', Livro_Controller.deletar); //verificar_login

/*
router.get('/img', (req, res)=>{
    res.sendFile(process.cwd() + '../../img/user.jpg');
})*/

export default livro_router;
import { Router } from "express";
import Livro_Controller from "../controller/Livro_Controller.js";
import {verificar_login} from "../Middleware/type.js"
const livro_router =  Router();

//Rotas dos livros
livro_router.get('/livros', Livro_Controller.exibir);

livro_router.get('/livros/categoria', Livro_Controller.exibir_por_categoria);

livro_router.get('/livros/:id_livro', Livro_Controller.exibir_por_id);

livro_router.get('/livros/titulo/:id_livro', Livro_Controller.exibir_por_titulo)

livro_router.post('/livros',verificar_login, Livro_Controller.cadastar);

livro_router.put('/livros/:id', Livro_Controller.atualizar_emprestimo);

livro_router.delete('/livros/:id', Livro_Controller.deletar);

/*
router.get('/img', (req, res)=>{
    res.sendFile(process.cwd() + '../../img/user.jpg');
})*/

export default livro_router;
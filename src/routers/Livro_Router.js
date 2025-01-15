import { Router } from "express";
import livro_controller from "../controller/Livro_Controller.js";
import { verificar_login } from "../middlewares/type.js"

const livro_router = Router();

//Rotas dos livros

livro_router.get('/livros', livro_controller.exibir_livros_ativos);

livro_router.get('/livros_categoria', livro_controller.exibir_por_categoria);

livro_router.get('/livros/:titulo', livro_controller.exibir_por_titulo);

//Direcionar para a página de cadastrar livros
livro_router.get('/cadastrar_livros/views', verificar_login, livro_controller.cadastrar_livro); 

livro_router.post('/cadastrar_livros', verificar_login, livro_controller.cadastrar); 

livro_router.delete('/livros', verificar_login, livro_controller.deletar); 

export default livro_router;
import { Router } from "express";
import Categoria_Controller from "../controller/Categoria_Controller.js";
import { verificar_login } from "../middlewares/type.js";

const categoria_router = Router();

//Rotas de Categorias
categoria_router.get('/categorias', Categoria_Controller.exibir);

categoria_router.get('/categorias/:id_categoria', Categoria_Controller.exibir_por_id);

categoria_router.get('/categorias/nome', Categoria_Controller.exibir_por_nome);

categoria_router.post('/categorias', Categoria_Controller.cadastar); //verificar_login

categoria_router.delete('/categorias/:id', Categoria_Controller.deletar); //verificar_login

export default categoria_router;
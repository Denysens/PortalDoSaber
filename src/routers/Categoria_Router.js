import { Router } from "express";
import categoria_controller from "../controller/Categoria_Controller.js";
import { verificar_login } from "../middlewares/type.js";

const categoria_router = Router();

//Rotas de Categorias
categoria_router.get('/categorias', categoria_controller.exibir);

categoria_router.post('/categorias', verificar_login, categoria_controller.cadastrar); 

export default categoria_router;
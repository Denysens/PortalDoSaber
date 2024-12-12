import { Router } from "express";
import Livro_Controller from "./Livro_Controller.js";
import Usuario_Controller from "./Usuario_Controller.js";
import Categoria_Controller from "./Categoria_Controller.js";
//import Autenticacao_Controller from "./Autenticacao_Controller.js";

const router =  Router();

//Rotas de Categorias
router.get('/categorias', Categoria_Controller.exibir);

router.get('/categorias/:id_categoria', Categoria_Controller.exibir_por_id);

//ESSE NÃO FUNCIONA
router.get('/categorias/nome', Categoria_Controller.exibir_por_nome);

router.post('/categorias', Categoria_Controller.cadastar);

router.put('/categorias/:id', Categoria_Controller.atualizar);

router.delete('/categorias/:id', Categoria_Controller.deletar);


//Rotas dos livros
router.get('/livros', Livro_Controller.exibir);

router.get('/livros/categoria', Livro_Controller.exibir_por_categoria);

router.get('/livros/:id_livro', Livro_Controller.exibir_por_id);

router.get('/livros/titulo/:id_livro', Livro_Controller.exibir_por_titulo)

router.post('/livros',Livro_Controller.cadastar);

router.put('/livros/:id', Livro_Controller.atualizar_emprestimo);

router.delete('/livros/:id', Livro_Controller.deletar);


//Rotas dos Usuários
router.get('/usuarios', Usuario_Controller.exibir);

router.get('/usuarios/cpf', Usuario_Controller.exibir_por_cpf);

router.get('/usuarios/nome', Usuario_Controller.exibir_por_nome);

router.post('/usuarios', Usuario_Controller.cadastar);

router.put('/usuarios', Usuario_Controller.atualizar);

router.delete('/usuarios', Usuario_Controller.deletar);


router.get('/login', Usuario_Controller.autenticar_login, Usuario_Controller.verificar_tipo_usuario)
router.post('/login', Usuario_Controller.autenticar_login, Usuario_Controller.verificar_tipo_usuario)
router.get('/')

export default router;
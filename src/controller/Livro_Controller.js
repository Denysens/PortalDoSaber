import Livro_Model from "../model/Livro_Model.js";

class Livro_Controller {
    
    //Direcionar para a página de cadastrar livros 
    async cadastrar_livro(req, res) {
        res.sendFile("./src/views2/cadastrar_livro.html", { root: process.cwd() });
    }

    //Exibir todos os livros ativos
    async exibir_livros_ativos(req, res) {
        const ativo = true;
        const livros = await Livro_Model.buscar_livros({ativo});
        res.json(livros);
    }

    //Exibir livros por nome
    async exibir_por_titulo(req, res) {
        const titulo = req.body.titulo;
        const ativo = true;
        const livros = await Livro_Model.buscar_por_titulo({ titulo, ativo });
        res.json(livros);
    }

    //Exibir o livro de acordo com a pesquisa por id 
    async exibir_por_id(req, res) {
        const id = req.params.id;
        const ativo = req.body.ativo;
        const livro = await Livro_Model.buscar_por_id({ id, ativo });
        res.json(livro);
    }

    //Cadastrar livro 
    async cadastrar(req, res) {
        const titulo = req.body.titulo;
        const autor = req.body.autor;
        const editora = req.body.editora;
        const ano_publicacao = req.body.ano_publicacao;
        const descricao = req.body.descricao;
        const categoria_id = req.body.categoria;

        if(!titulo || !autor){
            return res.status(400).json({erro: 'Campos obrigatórios estão ausentes'});// status 400, erro por parte do cliente
        }
        try{
            const livro = await Livro_Model.adicionar({ titulo, autor, editora, ano_publicacao, descricao, categoria_id });
            res.status(201).json({message: "livro cadastrado"}); //status 201 é de sucesso
        }catch (error){
            res.status(500).json({erro: 'Erro ao cadastar o livro.'});
        }
    }
    
    //Atualizar estado do livro (empréstimo)
    async atualizar_emprestimo(req, res) {
        const id = req.params.id;
        const disponivel = req.body.disponivel;
        const ativo = true;
        const livro = await Livro_Model.atualizar({ id, disponivel, ativo });
        res.json({ message: "Empréstimo aualizado" });
    }

    //Excluir livro
    async deletar(req, res) {
        const id = req.params.id;
        const ativo = false;
        const livro = await Livro_Model.ativar_desativar({ id, ativo });
        res.json({ message: "Livro deletado" })
    }

    //Exibir os livros por categoria
    /*async exibir_por_categoria(req, res) {
        const id_categoria = req.body.id_categoria;
        const ativo = req.body.ativo;
        const livros = await Livro_Model.buscar_por_categoria({ id_categoria, ativo });
        res.json(livros);
    }*/
}

export default new Livro_Controller();
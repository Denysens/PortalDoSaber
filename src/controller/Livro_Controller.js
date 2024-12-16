import Livro_Model from "../model/Livro_Model.js";

class Livro_Controller {

    //De acordo com a requisição responde com os dados livros ativos em json usando o model
    async exibir(req, res) {
        const livros = await Livro_Model.buscar();
        res.json(livros);
    }

    //Exibir os livros por categoria
    async exibir_por_categoria(req, res) {
        const id_categoria = req.body.id_categoria;
        const ativo = true;
        const livros = await Livro_Model.buscar_por_categoria({ id_categoria, ativo });
        res.json(livros);
    }

    //Exibir o livro de acordo com a pesquisa por id 
    async exibir_por_id(req, res) {
        const id = req.params.id_livro;
        const ativo = req.body.ativo;
        const livro = await Livro_Model.buscar_por_id({ id, ativo });
        res.json(livro);
    }

    //Exibir livros por nome
    async exibir_por_titulo(req, res) {
        const id = req.params.id;
        const titulo = req.body.titulo;
        const ativo = req.body.ativo;
        const livros = await Livro_Model.buscar_por_titulo({ id, titulo, ativo });
        res.json(livros);
    }

    //Cadastra o livro 
    async cadastar(req, res) {
        const titulo = req.body.titulo;
        const autor = req.body.autor;
        const editora = req.body.editora;
        const ano_publicacao = req.body.ano_publicacao;
        const descricao = req.body.descricao;
        const disponivel = req.body.disponivel;
        const categoria_id = req.body.categoria_id;

        /*if(!titulo || !autor){
            return res.status(400).json({erro: 'Campos obrigatórios estão ausentes'});// status 400, erro por parte do cliente
        }
        try{
            res.status(201).json({message: "livro cadastrado"}); //status 201 é de sucesso
        }catch (error){
            res.status(500).json({erro: 'Erro ao cadastar o livro.'});
        }*/
        const livro = await Livro_Model.adicionar({ titulo, autor, editora, ano_publicacao, descricao, disponivel, categoria_id });
        res.json({ message: "Livro cadastrado" })
    }

    //Atualizar estado do livro (empréstimo)
    async atualizar_emprestimo(req, res) {
        const id = req.params.id;
        const disponivel = req.body.disponivel;
        const ativo = true; //só pode emprestar ou receber se o livro estiver ativo para essa função
        const livro = await Livro_Model.atualizar({ id, disponivel, ativo });
        console.log(livro);
        res.json({ message: "Empréstimo aualizado" });
    }

    //Excluir livro
    async deletar(req, res) {
        const id = req.params.id;
        const ativo = false;
        const livro = await Livro_Model.ativar_desativar({ id, ativo });
        res.json({ message: "Livro deletado" })
    }
}

export default new Livro_Controller();
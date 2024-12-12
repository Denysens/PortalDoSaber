import Livro_Model from "./Livro_Model.js";

class Livro_Controller {
   
    //De acordo com a requisição responde com os dados livros em json usando o model
    async exibir(req,res) {
        const livros = await Livro_Model.busca();
        res.json(livros);
    }

    //Exibir os livros por categoria
    async exibir_por_categoria(req,res){
        const id_categoria = req.body.id_categoria;
        const livros = await Livro_Model.busca_por_categoria(id_categoria);
        res.json(livros);
    }

    //Exibir o livro de acordo com a pesquisa por id 
    async exibir_por_id(req, res){
        const id = req.params.id_livro;
        const livro = await Livro_Model.busca_por_id(id);
        res.json(livro);
    }

    //Exibir livros por nome
    async exibir_por_titulo(req,res){
        const id =  req.params.id_livro;
        const titulo = req.body.titulo;
        const livros = await Livro_Model.busca_por_titulo({id,titulo});
        res.json(livros);
    }

    //Cadastra o livro 
    async cadastar(req, res){
        const titulo = req.body.titulo;
        const autor = req.body.autor;
        const editora = req.body.editora;
        const ano_publicacao = req.body.ano_publicacao;
        const descricao = req.body.descricao;
        const disponivel = true;
        const categoria_id = req.body.categoria_id;

        /*if(!titulo || !autor){
            return res.status(400).json({erro: 'Campos obrigatórios estão ausentes'});// status 400, erro por parte do cliente
        }
        try{
            res.status(201).json({message: "livro cadastrado"}); //status 201 é de sucesso
        }catch (error){
            res.status(500).json({erro: 'Erro ao cadastar o livro.'});
        }*/
        const livro = await Livro_Model.adicionar({titulo, autor, editora, ano_publicacao, descricao, disponivel, categoria_id})
        console.log(livro);
        res.json({message:"Livro cadastrado"})
    }

    //Atualizar estado do livro (empréstimo)
    async atualizar_emprestimo(req, res){
        const id = req.params.id;
        const disponivel = req.body.disponivel;
        const livro = await Livro_Model.atualizar({id, disponivel});
        console.log(livro);
        res.json({message: "Atualizado o estado de empréstimo"});
    }

    //Excluir livro
    async deletar(req, res){
        const id = req.params.id;
        const livro = await Livro_Model.deletar({id});
        console.log(livro);
        res.json({message: "Livro deletado com sucesso"})
    }
}

export default new Livro_Controller();
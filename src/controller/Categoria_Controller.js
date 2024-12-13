import Categoria_Model from "../model/Categoria_Model.js";

class Categoria_Controller {
   
    //De acordo com a requisição responde com os dados categorias em json usando o model
    async exibir(req,res) {
        const categorias = await Categoria_Model.busca();
        res.json(categorias);
    }

    //Exibir o categoria de acordo com a pesquisa por id_categoria
    async exibir_por_id(req, res){
        const id = req.params.id_categoria;
        const categoria = await Categoria_Model.busca_por_id(id);
        res.json(categoria);
    }

    //Exibir categorias por nome
    async exibir_por_nome(req,res){
        const id = req.params.id_categoria;
        const nome = req.body.nome;
        const categorias = await Categoria_Model.busca_por_nome({id, nome});
        res.json(categorias);
    }

    //Cadastra o categoria 
    async cadastar(req, res){
        const nome = req.body.nome;

        /*if(!nome ){
            throw new Error("Campos obrigatórios");
        }
        try{
            
            res.status(201).json({message: "categoria cadastrado"}); //status 201 é de criado
        }catch (error){
            res.status(500).json({erro: 'Erro ao cadastar o categoria.'});
        }*/

        const categoria = await Categoria_Model.adicionar({nome});
        console.log(categoria);
        res.json(categoria)
    }

    //Atualizar categoria
    async atualizar(req, res){
        const id = req.params.id;
        const nome = req.body.nome;

        const categoria = await Categoria_Model.atualizar({id, nome});
        res.json({message: "Atualizado o estado de empréstimo"});
    }

    //Excluir categoria
    async deletar(req, res){
        const id = req.params.id;
        const categoria = await Categoria_Model.deletar({id});
        res.json({message: "Categoria deletado com sucesso"});
    }
}

export default new Categoria_Controller();
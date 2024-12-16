import Categoria_Model from "../model/Categoria_Model.js";

class Categoria_Controller {

    //De acordo com a requisição responde com os dados categorias em json usando o model
    async exibir(req, res) {
        const categorias = await Categoria_Model.buscar();
        res.json(categorias);
    }

    //Exibir o categoria de acordo com a pesquisa por id_categoria
    async exibir_por_id(req, res) {
        const id = req.params.id_categoria;
        const categoria = await Categoria_Model.buscar_por_id(id);
        res.json(categoria);
    }

    //Exibir categorias por nome
    async exibir_por_nome(req, res) {
        const nome = req.body.nome;
        const categorias = await Categoria_Model.buscar_por_nome(nome);
        res.json(categorias);
    }

    //Cadastra o categoria 
    async cadastar(req, res) {
        const nome = req.body.nome;

        /*if(!nome ){
            throw new Error("Campos obrigatórios");
        }
        try{
            
            res.status(201).json({message: "categoria cadastrado"}); //status 201 é de criado
        }catch (error){
            res.status(500).json({erro: 'Erro ao cadastar o categoria.'});
        }*/

        const categoria = await Categoria_Model.adicionar({ nome });
        res.json({ message: "Categoria cadastrada" })
    }

    //Excluir categoria
    async deletar(req, res) {
        const id = req.params.id;
        const categoria = await Categoria_Model.deletar({ id });
        res.json({ message: "Categoria deletada" });
    }
}

export default new Categoria_Controller();
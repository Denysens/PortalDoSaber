import categoria_model from "../model/Categoria_Model.js";

class categoria_controller {

    //Exibir todas categorias 
    async exibir(req, res) {
        const categorias = await categoria_model.buscar();

        //Verifica a existência de categorias no sistema
        if (categorias.length === 0) {
            return res.json({ message: "Não há categorias cadastradas" });
        }
        res.json(categorias);
    }

    //Cadastra uma categoria 
    async cadastrar(req, res) {
        const nome = req.body.nome;

        //Validação do valor de nome
        if (!nome) {
            return res.json({ message: "Campos obrigatórios faltando" });
        }
        try {
            const categoria = await categoria_model.adicionar({ nome }); 
            res.json({ message: "Categoria cadastrada" });
        } catch (error) {
            res.json({ error: 'Erro ao cadastar o categoria.' });
        }
    }

}

export default new categoria_controller();
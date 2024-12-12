import Emprestimo_Model from "./Emprestimo_Model";

class Emprestimo_Controller{
    async exibir(req, res){
        const emprestimos = await Emprestimo_Model.buscar();
        res.json(emprestimos);
    }

    async cadastrar(req, res){
        const usuario_id = req.body.usuario_id;
        const livro_id = req.body.livro_id;
        const data_emprestimo = req.body.data_emprestimo;
        const data_devolucao_prevista = req.body.data_devolucao_prevista;
        const data_devolucao = req.body.data_devolucao;
        
        const emprestimo = await Emprestimo_Model.cadastrar({usuario_id, livro_id, data_emprestimo, data_devolucao_prevista, data_devolucao});
        res.json(emprestimo);
    }

    async editar(req, res){
        const id = req.body.id;
        const data_devolucao = req.body.data_devolucao;

        const emprestimo = await Emprestimo_Model.editar({id, data_devolucao});
        
        res.json({message: "Emprestimo atualizado"})
    }
}

export default new Emprestimo_Controller();
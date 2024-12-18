import Emprestimo_Model from "../model/Emprestimo_Model.js";

class Emprestimo_Controller {

    //Direcionar para a página de emprestimos do usuário comum 
    async empres_user(req, res) {
        res.sendFile('./src/views2/empres_user.html', { root: process.cwd() });
    }
    
    //Direcionar para a página de todos os empréstimos 
    async emprestimos(req, res) {
        res.sendFile("./src/views2/emprestimos.html", { root: process.cwd() });
    }
    
    //Exibir todos os emprestimos 
    async exibir(req, res) {
        const emprestimos = await Emprestimo_Model.buscar();
        res.json(emprestimos)
    }

    //Exibir um emprestimo pela pesquisa de id 
    async exibir_ativos(req, res) {
        const emprestimos = await Emprestimo_Model.buscar_emprestimos_ativos();
        res.json(emprestimos)
    }

    //Todos os emprestimos do usuario 
    async exibir_emprestimos_usuario(req, res) {
        const id_usuario = req.session.cpf;
        const emprestimos = await Emprestimo_Model.buscar_por_id_user(id_usuario);
        res.json(emprestimos)
    }

    //Cadastrar um empréstimo 
    async cadastrar(req, res) {
        const usuario_id = req.body.usuario_id;
        const livro_id = req.body.livro_id;
        const data_devolucao_prevista = req.body.data_devolucao_prevista;

        const emprestimo = await Emprestimo_Model.adicionar({ usuario_id, livro_id, data_devolucao_prevista });
        res.json({ message: "Empréstimo cadastrado" })
    }

    //finalizar um empréstimo, definindo a data de devolução 
    async atualizar(req, res) {
        const id = req.params.id;
        const ativo = false;
        const emprestimo = await Emprestimo_Model.editar({ id, ativo });

        res.json({ message: "Emprestimo atualizado" })
    }
}

export default new Emprestimo_Controller();
/*import Usuario_Model from "./Usuario_Model.js";

class Autenticacao_Controller{
    async login(req, res){
        const nome = req.body.nome;
        const senha = req.body.senha;

        const usuario = await Usuario_Model.busca_por_nome(nome);

        if(!usuario){
            throw new error("Usuário não encontrado");
            //return res.status(404).json({message: "Usuário inexistente"});
            return res.redirect("/login");
        }
        if(senha != usuario.senha){
            //return res.status(404).json({message: "Senha incorreta"});
            return res.redirect("/login");
        }
        req.session.logado = true;
        res.redirect("/home")
    }
}

export default new Autenticacao_Controller();*/
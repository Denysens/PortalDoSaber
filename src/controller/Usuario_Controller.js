import Usuario_Model from "../model/Usuario_Model.js";

class Usuario_Controller {

    //Direcionar para a página de login - (GET e erros ao logar)
    async login(req, res) {
        res.sendFile("../../login.html", { root: process.cwd() });
    }

    //Direcionar para a página de usuário comum
    async principal_userC(req, res) {
        res.sendFile("../../principal_userC.html", { root: process.cwd() });
    }

    //Direcionar para a página do bibliotecário/ funcionnário
    async principal_userF(req, res) {
        res.sendFile("../../principal_userF.html", { root: process.cwd() });
    }

    //Autenticar login
    async autenticar_login(req, res, next) {
        const cpf = req.body.cpf;
        const senha = req.body.senha;

        const usuario = await Usuario_Model.busca_por_cpf(cpf);

        if (!usuario)
            //throw new error("Usuário não encontrado");
            return res.redirect("/login");

        if (senha != usuario.senha)
            //throw new error("Senha incorreta");
            return res.redirect("/login");

        req.session.logado = true;
        req.session.tipo = usuario.tipo;

        if (usuario.tipo == "func") {
            return res.redirect("/principal_userF");

        } else {
            return res.redirect("/principal_userC");
        }
    }

    //De acordo com a requisição responde com os dados usuarios em json usando o model
    async exibir(req, res) {
        const usuarios = await Usuario_Model.busca();
        res.json(usuarios);
    }

    //Exibir o usuario de acordo com a pesquisa por cpf
    async exibir_por_cpf(req, res) {
        const cpf = req.body.cpf;
        const usuario = await Usuario_Model.busca_por_cpf(cpf);
        res.json(usuario);
    }

    //Exibir usuarios por nome
/*    async exibir_por_nome(req, res) {
        const nome = req.body.nome;
        const ativo = req.body.ativo;
        const usuarios = await Usuario_Model.busca_por_nome({ nome, ativo });
        res.json(usuarios);
    }*/

    //Cadastra o usuario 
    async cadastar(req, res) {
        const cpf = req.body.cpf;
        const nome = req.body.nome;
        const data_nasc = req.body.data_nasc;
        const senha = req.body.senha;
        const telefone = req.body.telefone;
        const tipo = req.body.tipo;

        /*if(!cpf || !nome || !senha){
            throw new Error("Campos obrigatórios")
            return res.status(400).json({erro: 'Campos obrigatórios estão ausentes'});// status 400, erro por parte do cliente
        }
        try{
            res.status(201).json({message: "usuario cadastrado"}); //status 201 é de criado
        }catch (error){
            res.status(500).json({erro: 'Erro ao cadastar o usuario.'});
        }*/
        const usuario = await Usuario_Model.adicionar({ cpf, nome, data_nasc, senha, telefone, tipo });
        res.json({ message: "Usuario cadastrado" })
    }

    //Atualizar dados do usuario ativo
    async atualizar(req, res) {
        const cpf = req.body.cpf;
        const senha = req.body.senha;
        const telefone = req.body.telefone;

        const usuario = await Usuario_Model.atualizar({ cpf, senha, telefone});
        res.json({ message: "Usuario atualizado" });
    }

    //Excluir usuario
    async deletar(req, res) {
        const cpf = req.body.cpf;
        const ativo = false;
        const usuario = await Usuario_Model.ativar_desativar({ cpf, ativo });
        res.json({ message: "Usuario deletado" });
    }
}

export default new Usuario_Controller();
import Usuario_Model from "./Usuario_Model.js";

class Usuario_Controller {

    //Direcionar para a página de login GET
    async login(req, res){
        res.sendFile("login.html", { root: process.cwd() });
    }

    //Direcionar para a página de erro (Usuario ou senha incorreto)
    async erro(req,res){
        res.sendFile("erro.html", { root: process.cwd() });
    }

    //Direcionar para a página de usuário comum
    async principal_userC(req, res){
        res.sendFile("principal_useC.html", { root: process.cwd() });
    }

    async principal_userF(req, res){
        res.sendFile("principal_func.html", { root: process.cwd() });
    }

    async home(req, res){
        res.sendFile("home.html", { root: process.cwd() });
    }

    //Autenticar login
    async autenticar_login(req, res, next){
        const cpf = Number(req.body.cpf);
        const senha = req.body.senha;

        const usuario = await Usuario_Model.busca_por_cpf(cpf);
        
        if(!usuario)
            throw new error("Usuário não encontrado");
            //return res.redirect("/erro");

        if(senha != usuario.senha)
            throw new error("Senha incorreta");
            //return res.redirect("/erro");

        req.session.logado = true;
        res.redirect(next());
    }
    
    //Verificar se está logado
    async verificar_login(req, res, next){
        if(req.session.logado){
            next();
        }else{
            return res.redirect("/login");
        }
    }

    //Verificar se é usuario ADM/Secretário
    async verificar_tipo_usuario(req, res){
        const tipo = req.body.tipo;

        if(tipo != "comum"){
            res.redirect("/principal_userF")
        }else{
            res.redirect("/principal_userC")
        }
    }

    //De acordo com a requisição responde com os dados usuarios em json usando o model
    async exibir(req,res) {
        const usuarios = await Usuario_Model.busca();
        res.json(usuarios);
    }

    //Exibir o usuario de acordo com a pesquisa por cpf
    async exibir_por_cpf(req, res){
        const cpf = req.body.cpf;
        const usuario = await Usuario_Model.busca_por_cpf(cpf);
        res.json(usuario);
    }

    //Exibir usuarios por nome
    async exibir_por_nome(req,res){
        const nome = req.body.nome;
        const usuarios = await Usuario_Model.busca_por_nome(nome);
        res.json(usuarios);
    }

    //Cadastra o usuario 
    async cadastar(req, res){
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
        const usuario = await Usuario_Model.adicionar({cpf, nome, data_nasc, senha, telefone, tipo});
        console.log(usuario);
        res.json({message: "Usuario cadastrado"})
    }

    //Atualizar estado do usuario (empréstimo)
    async atualizar(req, res){
        const cpf = req.body.cpf;
        const nome = req.body.nome;
        const data_nasc = req.body.data_nasc;
        const senha = req.body.senha;
        const telefone = req.body.telefone;
        const tipo = req.body.tipo;

        const usuario = await Usuario_Model.atualizar({cpf, nome, data_nasc,senha, telefone, tipo});
        res.json({message: "Atualizado o usuario"});
    }

    //Excluir usuario
    async deletar(req, res){
        const cpf = req.body.cpf;
        const usuario = await Usuario_Model.deletar({cpf});
        console.log(usuario);
        res.json({message: "Usuario deletado com sucesso"});
    }
}

export default new Usuario_Controller();
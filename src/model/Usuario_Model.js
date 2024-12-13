import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Usuario_Model {
   //Consulta o BD e retornar todos os usuarios 
    async busca(){
        const usuarios = await prisma.usuarios.findMany();
        console.log(usuarios);
        return usuarios;
    }

    //Pesquisa o usuario pelo CPF
    async busca_por_cpf(cpf){
        console.log(cpf);
        const usuario = await prisma.usuarios.findUnique({
            where:{
                cpf: cpf,
            },
        })
        console.log(usuario);
        return usuario;
    }

    //Pesquisa o usuario pelo nome 
    async busca_por_nome(nome){
        const usuarios = await prisma.usuarios.findMany({
            where:{
                nome:{
                    contains: String(nome),
                    mode: 'insensitive', //não deferencia maiúscula e minúscula
                },
            },
        })
        console.log(usuarios);
        return usuarios;
    }

    //Insere um novo usuario
    async adicionar(usuario){
        const novo_usuario = await prisma.usuarios.create({
            data:{
                cpf: usuario.cpf,
                nome: usuario.nome,
                data_nasc: usuario.data_nasc,
                senha: usuario.senha,
                telefone: usuario.telefone,
                tipo: usuario.tipo,
            },
        });
        console.log(novo_usuario);
        return novo_usuario
    }

    //Atualizar informações do usuário
    async atualizar(usuario){
        const usuario_atualizado = await prisma.usuarios.update({
            where: {
                cpf: usuario.cpf,
            },
            data:{
                nome: usuario.nome,
                data_nasc: usuario.data_nasc,
                senha: usuario.senha,
                telefone: usuario.telefone,
                tipo: usuario.tipo,
            },
        });
        console.log(usuario_atualizado);
        return usuario_atualizado
    }

    //Deletar um usuario
    async deletar(usuario){
        const usuario_deletado = await prisma.usuarios.delete({
            where:{
                cpf: usuario.cpf,
            },
        })
        console.log(usuario_deletado);
    }
}

export default new Usuario_Model();
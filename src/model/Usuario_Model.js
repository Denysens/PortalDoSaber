import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Usuario_Model {
    //Consulta o BD e retornar todos os usuarios ativos
    async busca() {
        const usuarios = await prisma.usuarios.findMany({
            where: {
                ativo: true
            }
        });
        return usuarios;
    }

    //Pesquisa o usuario pelo CPF
    async busca_por_cpf(cpf) {
        const usuario_buscado = await prisma.usuarios.findUnique({
            where: {
                cpf: Number(cpf)
            }
        });
        return usuario_buscado;
    }

    //Pesquisa o usuario pelo nome 
    /*    async busca_por_nome(nome) {
            const usuarios = await prisma.usuarios.findMany({
                where: {
                    nome: {
                        contains: String(nome),
                        mode: 'insensitive', //não deferencia maiúscula e minúscula
                    }
                }
            });
            return usuarios;
        }*/

    //Insere um novo usuario
    async adicionar(usuario) {
        const novo_usuario = await prisma.usuarios.create({
            data: {
                cpf: usuario.cpf,
                nome: usuario.nome,
                data_nasc: usuario.data_nasc,
                senha: usuario.senha,
                telefone: usuario.telefone,
                tipo: usuario.tipo
            }
        })
        return novo_usuario
    }

    //Atualizar informações do usuário
    async atualizar(usuario) {
        const usuario_atualizado = await prisma.usuarios.update({
            where: {
                cpf: Number(usuario.cpf)
            },
            data: {
                senha: Number(usuario.senha),
                telefone: usuario.telefone
            }
        })
        return usuario_atualizado
    }

    //("deletar" ou "reativar") um usuario
    async ativar_desativar(usuario) {
        const usuario_deletado = await prisma.usuarios.update({
            where: {
                cpf: Number(usuario.cpf),
            },
            data: {
                ativo: Boolean(usuario.ativo)
            }
        })
        console.log(usuario_deletado);
    }
}

export default new Usuario_Model();
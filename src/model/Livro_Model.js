import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Livro_Model {
    //Consulta o BD e retornar todos os livros ativos
    async buscar(ativo) {
        const livros = await prisma.livros.findMany({
            where: {
                ativo: ativo
            }
        });
        return livros;
    }
    
    //Pesquisa o livro pelo nome 
    async buscar_por_titulo(livro) {
        const livro_buscado = await prisma.livros.findMany({
            where: {
                AND: [
                    {
                        titulo: {
                            contains: String(livro.titulo),
                            mode: 'insensitive',
                        }
                    },
                    { ativo: Boolean(livro.ativo)}
                ]
            }
        });
        return livro_buscado;
    }

    //Insere um novo livro
    async adicionar(livro) {
        const novo_livro = await prisma.livros.create({
            data: {
                titulo: livro.titulo,
                autor: livro.autor,
                editora: livro.editora,
                ano_publicacao: Number(livro.ano_publicacao),
                descricao: livro.descricao,
                categoria_id: Number(livro.categoria_id),
            },
        });
        return novo_livro;
    }

    //Atualizar o estado de empréstimo do livro
    async atualizar(livro) {
        const livro_atualizado = await prisma.livros.updateMany({
            where: {
                AND: [
                    { id_livro: Number(livro.id) },
                    { ativo: Boolean(livro.ativo) }
                ]
            },
            data: {
                disponivel: Boolean(livro.disponivel),
            },
        });
        return livro_atualizado
    }

    //Deletar ou reativar um livro
    async ativar_desativar(livro) {
        const livro_deletado = await prisma.livros.update({
            where: {
                id_livro: Number(livro.id),
            }, data: {
                ativo: Boolean(livro.ativo)
            }
        })
        console.log(livro_deletado);
    }

    //Pesquisa o livro por categoria
    /*async buscar_por_categoria(livro) {
        const livros = await prisma.livros.findMany({
            where: {
                AND: [
                    { categoria_id: Number(livro.id_categoria) },
                    { ativo: livro.ativo },
                ]
            }
        })
        return livros;
    }*/

    //Pesquisa o livro por id
    /*async buscar_por_id(livro) {
        const livro_buscado = await prisma.livros.findMany({
            where: {
                AND: [
                    { id_livro: Number(livro.id) },
                    { ativo: livro.ativo }
                ]
            }
        })
        return livro_buscado;
    }*/
}

export default new Livro_Model();
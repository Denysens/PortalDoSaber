import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Livro_Model {
   //Consulta o BD e retornar todos os livros 
    async busca(){
        const livros = await prisma.livros.findMany();
        console.log(livros);
        return livros;
    }

    //Pesquisa o livro por categoria
    async busca_por_categoria(id_categoria){
        const livros = await prisma.livros.findMany({
            where:{
                categoria_id: Number(id_categoria),
            },
        })
        console.log(livros);
        return livros;
    }
    //Pesquisa o livro por id
    async busca_por_id(id){
        const livro = await prisma.livros.findUnique({
            where:{
                id_livro: Number(id),
            },
        })
        console.log(livro);
        return livro;
    }

    //Pesquisa o livro pelo nome 
    async busca_por_titulo(livro){
        const livro_buscado = await prisma.livros.findUnique({
            where:{
                id_livro: Number(livro.id),
                titulo: String(livro.titulo),
            },
        })
        console.log(livro_buscado);
        return livro_buscado;
    }

    //Insere um novo livro
    async adicionar(livro){
        const novo_livro = await prisma.livros.create({
            data:{
                titulo: livro.titulo,
                autor: livro.autor,
                editora: livro.editora,
                ano_publicacao: livro.ano_publicacao,
                descricao: livro.descricao,
                disponivel: livro.disponivel,
                categoria_id: livro.categoria_id,
            },
        });
        console.log(novo_livro);
        return novo_livro
    }

    //Atualizar o estado de empréstimo do livro
    async atualizar(livro){
        const livro_atualizado = await prisma.livros.update({
            where: {
                id_livro: Number(livro.id),
            },
            data:{
                disponivel: Boolean(livro.disponivel),
            },
        });
        console.log(livro_atualizado);
        return livro_atualizado
    }

    //Deletar um livro (estragou, não devolveram)
    async deletar(livro){
        const livro_deletado = await prisma.livros.delete({
            where:{
                id_livro: Number(livro.id),
            },
        })
        console.log(livro_deletado);
    }
}

export default new Livro_Model();
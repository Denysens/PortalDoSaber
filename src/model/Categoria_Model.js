import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Categoria_Model {
   //Consulta o BD e retornar todos os categorias 
    async busca(){
        const categorias = await prisma.categorias.findMany();
        console.log(categorias);
        return categorias;
    }

    //Pesquisa o categoria por id
    async busca_por_id(id){
        const categoria = await prisma.categorias.findUnique({
            where:{
                id_categoria: Number(id)
            },
        })
        console.log(categoria);
        return categoria;
    }

    //Pesquisa o categoria pelo nome 
    async busca_por_nome(categoria){
        const categoria_buscada = await prisma.categorias.findMany({
            where:{
                id_categoria: categoria.id,
                nome:{
                    search: String(categoria.nome),
                    mode: 'insensitive' //não deferencia maiúscula e minúscula
                },
            },
        })
        console.log(categoria_buscada);
        return categoria_buscada;
    }

    //Insere um novo categoria
    async adicionar(categoria){
        const nova_categoria = await prisma.categorias.create({
            data:{
                nome: categoria.nome
            },
        });
        console.log(nova_categoria);
        return nova_categoria
    }

    //Atualizar informações do usuário
    async atualizar(categoria){
        const categoria_atualizada = await prisma.categorias.update({
            where: {
                id_categoria: Number(categoria.id),
            },
            data:{
                nome: categoria.nome
            },
        });
        console.log(categoria_atualizada);
        return categoria_atualizada
    }

    //Deletar um categoria
    async deletar(categoria){
        const categoria_deletada = await prisma.categorias.delete({
            where:{
                id_categoria: Number(categoria.id),
            },
        })
        console.log(categoria_deletada);
        return categoria_deletada
    }
}

export default new Categoria_Model();
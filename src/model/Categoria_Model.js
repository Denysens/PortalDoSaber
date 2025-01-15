import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class categoria_model {

    //Consulta o BD e retorna todos os categorias 
    async buscar() {
        const categorias = await prisma.categorias.findMany();
        return categorias;
    }

    //Insere uma nova categoria
    async adicionar(categoria) {
        const nova_categoria = await prisma.categorias.create({
            data: {
                nome: String(categoria.nome)
            },
        });
        return nova_categoria
    }
}

export default new categoria_model();
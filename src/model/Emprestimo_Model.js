import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Emprestimo_Model{

    async buscar(){
        const emprestimos = await prisma.emprestimos.findMany();
        console.log(emprestimos);
        return emprestimos
    }

    async buscar_por_id_emprestimo(id){
        const emprestimo = await prisma.emprestimos.findUnique({
            where:{
                id_emprestimo: id
            }
        })
        return emprestimo
    }

    async buscar_por_id_user(id){
        const emprestimos = await prisma.emprestimos.findMany({
            where:{
                usuario_id: id
            },
        });
        console.log(emprestimos);
        return emprestimos
    }

    async buscar_por_id_livro(id){
        const emprestimo = await prisma.emprestimos.findMany({
            where:{
                livro_id: id
            },
        });
        return emprestimo
    }

    async adicionar(emprestimo){
        const novo_emprestimo = await prisma.emprestimos.create({
            data:{
                usuario_id: emprestimo.usuario_id,
                livro_id: emprestimo.livro_id,
                data_devolucao_prevista: emprestimo.data_devolucao_prevista,
            },
        });

        console.log(novo_emprestimo);
        return novo_emprestimo;
    }

    async editar(emprestimo){
        const emprestimo_atualizado = await prisma.emprestimos.update({
            where:{
                id: emprestimo.id
            },
            data:{
                data_devolucao: emprestimo.data_devolucao
            },
        });
        console.log(emprestimo_atualizado);
        return emprestimo_atualizado
    }

}

export default new Emprestimo_Model();
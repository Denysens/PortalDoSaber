import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class Emprestimo_Model {

    //Pesquisa todos os emprestimos
    async buscar() {
        const emprestimos = await prisma.emprestimos.findMany();
        return emprestimos
    }

    // Pesquisa os emmpréstimos ativos / sem devolução 
    async buscar_emprestimos_ativos() {
        const emprestimos = await prisma.emprestimos.findMany({
            where: {
               ativo: true
            }
        });
        return emprestimos;
    }

    //Pesquisa os empréstimos de um user específico
    async buscar_por_id_user(id) {
        const emprestimos = await prisma.emprestimos.findMany({
            where: {
                usuario_id: Number(id)
            },
        });
        return emprestimos
    }

    //Adicionar um empréstimo
    async adicionar(emprestimo) {
        const novo_emprestimo = await prisma.emprestimos.create({
            data: {
                usuario_id: emprestimo.usuario_id,
                livro_id: emprestimo.livro_id,
                data_devolucao_prevista: emprestimo.data_devolucao_prevista
            },
        });
        return novo_emprestimo;
    }

    //Editar o emmpéstimo /Realizar a devolução do livro
    async editar(emprestimo) {
        const emprestimo_atualizado = await prisma.emprestimos.update({
            where: {
                id_emprestimo: Number(emprestimo.id)
            },
            data: {
                ativo: emprestimo.ativo
            },
        });
        return emprestimo_atualizado
    }
}

export default new Emprestimo_Model();
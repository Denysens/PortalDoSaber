import livro_model from "../model/Livro_Model.js";

class livro_controller {

    //Exibir todos os livros ativos
    async exibir_livros_ativos(req, res) {
        const livros = await livro_model.buscar_livros();
        if (livros.length === 0) {
            return res.json({ message: "Não há livros cadastrados" })
        }
        res.json(livros);
    }

    //Exibir livros pelo titulo
    async exibir_por_titulo(req, res) {
        const titulo = req.params.titulo;

        //Busca os livros pelo titulo
        const livros = await livro_model.buscar_por_titulo(titulo);

        //Verifica se há algum livro com o titulo buscado
        if (livros.length === 0) {
            return res.json({ message: "Não há nenhum livro cadastrado com o titulo buscado" })
        }

        res.json(livros);
    }

    //Exibir livros pela categoria
    async exibir_por_categoria(req, res) {
        const id_categoria = req.query.categoria_id;

        // Verifica se o valor de categoria_id foi passado
        if (!id_categoria) {
            return res.json({ message: "O valor de id da categoria é obrigatório" });
        }
        try {
            // Busca os livros pela categoria
            const livros = await livro_model.buscar_por_categoria(id_categoria);

            if (livros.length === 0) {
                return res.json({ message: "Nenhum livro encontrado na categoria especificada." });
            }

            res.json(livros);
        } catch (error) {
            console.log("Erro ao buscar livros por categoria:", error);
            res.json({ message: "Erro interno do servidor." });
        }
    }

    //Direcionar para a página de cadastrar livros 
    async cadastrar_livro(req, res) {
        res.sendFile("./src/views/cadastrar_livro.html", { root: process.cwd() });
    }

    //Cadastrar livro 
    async cadastrar(req, res) {
        const titulo = req.body.titulo;
        const autor = req.body.autor;
        const editora = req.body.editora;
        const ano_publicacao = req.body.ano_publicacao;
        const descricao = req.body.descricao;
        const categoria_id = req.body.id_categoria;


        if (!titulo || !autor || !categoria_id) {
            return res.json({ message: 'Campos obrigatórios estão ausentes' });
        }
        try {
            const livro = await livro_model.adicionar({ titulo, autor, editora, ano_publicacao, descricao, categoria_id });
            res.json({ message: "Livro cadastrado" });
        } catch (error) {
            res.json({ message: 'Erro ao cadastar o livro.' });
        }
    }

    //Excluir livro
    async deletar(req, res) {
        const id_livro = req.body.id_livro;
        if (!id_livro) {
            return res.json({ message: "Campo obrigatório para exclusão faltando" });
        }
        const livro = await livro_model.deletar(id_livro);

        if (!livro) {
            return res.json({ message: "Livro indisponivel para exclusão" })
        }
        res.json({ message: "Livro deletado" })
    }

}

export default new livro_controller();
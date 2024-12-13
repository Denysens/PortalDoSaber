import 'express-async-errors'; //serve para tratar os erros sícronos e assícronos 
import express from "express";
import usuario_router from "./src/routers/Usuario_Router.js";
import livro_router from './src/routers/Livro_Router.js';
import categoria_router from './src/routers/Categoria_Router.js';
import emprestimo_router from './src/routers/Emprestimo_Router.js';
import cors from "cors";
import session from 'express-session';
import { Cookie } from "express-session";

const app = express();

app.use(cors());

//Veja o corpo de requisições como um json
app.use(express.json());

app.use('/public', express.static(process.cwd() + "/img"));

//VERIFICAR O QUE ISSO FAZ 
app.use(express.urlencoded({ extended: true }));

//Middleware de sessão - Express session
app.use(session({
    secret: "fjkfkjshfjk",
    resave: false,
    saveUninitialized: true,
    Cookie: {}
}));

//Envia para a página / o arq index.html, se este estiver na mesma pasta das demais (process.cwd)
app.get('/', (req, res) => {
    res.sendFile("index.html", { root: process.cwd() });
});

//VERIFICAR ISSO AQUI TAMBÉM
app.use(usuario_router, livro_router, categoria_router, emprestimo_router);

//app.use(errorHandler)
//é como um midle goblal, todos passam por ele
app.use((err, req, res, next)=>{
    console.log(err.message);
    res.status(500).send({error: "Erro interno"});
})

//Escute a porta 3000 (servidor na minha máquina, localhost)
app.listen(3000, () =>
    console.log("Servidor rodando na porta 3000")
);
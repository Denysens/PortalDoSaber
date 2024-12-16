import 'express-async-errors'; //serve para tratar os erros sícronos e assícronos 
import express from "express";
import router from './src/routers/index.js';
import cors from "cors";
import session from 'express-session';
import { Cookie } from "express-session";

const app = express();

app.use(cors());

//Veja o corpo de requisições como um json
app.use(express.json());

app.use('/public', express.static(process.cwd() + "/public"));

//VERIFICAR O QUE ISSO FAZ 
app.use(express.urlencoded({ extended: true }));

//Middleware de sessão - Express session
app.use(session({
    secret: "fjkfkjshfjk",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

//Envia para a página / o arq login.html, se este estiver na mesma pasta das demais (process.cwd)
app.get('/', (req, res) => {
    res.sendFile("./src/views/login.html", { root: process.cwd() });
});

//VERIFICAR ISSO AQUI TAMBÉM
app.use(router);

//app.use(errorHandler)
//é como um midle goblal, todos passam por ele
app.use((req, res, next) => {
    console.log(error);
    res.status(500).send({ error: "Erro interno" });
})

//Escute a porta 3000 (servidor na minha máquina, localhost)
app.listen(3000, () =>
    console.log("Servidor rodando na porta 3000")
);
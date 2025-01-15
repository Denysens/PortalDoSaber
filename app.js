import 'express-async-errors'; //serve para tratar os erros sícronos e assícronos 
import express from "express"; //
import router from './src/routers/index.js'; //importa todas as rotas
import cors from "cors";
import session from 'express-session';

const app = express(); //Criação de um instância express

//Veja o corpo de requisições como um json
app.use(express.json());

//Permite a leitura dos dados 
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(process.cwd() + "/public"));

app.use('/public/js', express.static(process.cwd() + "/public/js"));

app.use('/public/img', express.static(process.cwd() + "/public/img"));

app.use('/public/styles', express.static(process.cwd() + "/public/styles"));

app.use(cors());


//Middleware de sessão - Express session
app.use(session({
    secret: "fjkfkjshfjk",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(router);

//Envia para a página / o arq login.html, se este estiver na mesma pasta das demais (process.cwd)
app.get('/', (req, res) => {
    res.sendFile("./src/views/home_principal.html", { root: process.cwd() });
});


//Escute a porta 3000 (servidor na minha máquina, localhost)
app.listen(3000, () =>
    console.log("Servidor rodando na porta 3000")
);
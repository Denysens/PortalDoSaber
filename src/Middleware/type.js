    //Verificar se está logado
    const verificar_login = (req, res, next) =>{
        if(req.session.logado && req.session.tipo != "comum"){
            next();
        }else{
            return res.redirect("/login");
        }
    }
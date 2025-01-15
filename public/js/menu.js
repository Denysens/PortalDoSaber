function abrir_menu() {
    const menu = document.getElementById("menu_oculto");
    const principal = document.getElementById("principal");

    menu.style.width = "300px";
    principal.style.marginLeft = "300px";
}

function fechar_menu() {
    const menu = document.getElementById("menu_oculto");
    const principal = document.getElementById("principal");

    menu.style.width = "0";
    principal.style.marginLeft = "0";
}

abrir_menu ();
fechar_menu ();
export function abrir_menu(){
    document.getElementById("menu_oculto").style.width="300px";
    document.getElementById("principal").style.marginLeft="300px";
}
export function fechar_menu(){
    document.getElementById("menu_oculto").style.width="0";
    document.getElementById("principal").style.marginLeft="0";
}
// Função para abrir o menu
function abrir_menu() {
    const menu = document.getElementById('menu_oculto');
    menu.classList.add('aberto');  // Adiciona a classe 'aberto'
}

// Função para fechar o menu
function fechar_menu() {
    const menu = document.getElementById('menu_oculto');
    menu.classList.remove('aberto');  // Remove a classe 'aberto'
}
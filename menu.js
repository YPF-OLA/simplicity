const botaoMenu = document.querySelector(".titulo-menu a");

//selecione a lista de links do menu
const listasDeLinks = document.querySelector(".links-menu");

botaoMenu.addEventListener("click", function( event ){

    //Anulando o comportamento patrão de recarregar a página atraves de um link.
    event.preventDefault();
    
    listasDeLinks.classList.toggle("aberto")

    if(listasDeLinks.classList.contains("aberto")){
        botaoMenu.innerHTML = "Fechar &times;";
    }else {
        botaoMenu.innerHTML = "Menu &equiv;";
    }
    
});

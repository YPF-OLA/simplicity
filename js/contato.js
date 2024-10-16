// Selecionando os elementos que serão manipulados

const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoTelefone = formulario.querySelector("#telefone");
const campoEndereco = formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagemStatus = formulario.querySelector("#status");

/* Ativação da máscara para o telefone */
$(campoTelefone).mask("(00) 0000-0000");
$(campoCep).mask("00000-000");


/* Capturando o clique no botão Buscar */
botaoBuscar.addEventListener("click", async function(){
    /* Verificando se o ceo não tem 9 digitos */
    if( campoCep.value.length !== 9 ){
    
        mensagemStatus.textContent = "Digite um CEP válido";
        mensagemStatus.style.color = "purple";

        
        return;
    }

    let cepDigitado = campoCep.value;
console.log(cepDigitado);

    /* AJAX - Asyncronous JavaScript And XML 
    Técnica de comunicação (transmissão, recebimento) de dados muito usada entre sistemas e tecnologias diferentes */

    // Etapa 1: preparar a url contendo o CEP a ser buscado 
    let url = `https://viacep.com.br/ws/${cepDigitado}/json/`;
    console.log(url);
    

    //   Etapa 2: acessar a API (com a URL) e aguardar o retorno dela
    const resposta = await fetch(url);
    console.log(resposta);
    
       
    //   Etapa 3: extrair os dados do retorno/resposta 
    const dados = await resposta.json();
    console.log(dados);
    
       
    //  Etapa 4: lidar com os dados (em caso de erro e sucesso)
    if( "erro" in dados ){
        mensagemStatus.innerHTML = " CEP Inexistente";
        mensagemStatus.style.color = "red";
    }else{
        mensagemStatus.innerHTML = "CEP Encontrado";
        mensagemStatus.style.color = "blue";

        //selecionar todos os campos com classe indicada
        const campos = formulario.querySelectorAll(".campos-restantes");

        for(const campo of campos){
            campo.classList.remove("campos-restantes");
        }

        /* Atribuindo os dados para cada campo */

        //colocar o logradouro como valor do campo endereco
        campoEndereco.value = dados.logradouro;

        //colocar o bairro como valor do campo bairro
        campoBairro.value = dados.bairro;

        //colocar a localidade como valor do campo cidade
        campoCidade.value = dados.localidade;

        // colocar a uf como valor do campo estado 
        campoEstado.value = dados.uf;
      
    };
    
});
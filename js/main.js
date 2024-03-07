const html = document.querySelector('html');
const banner = document.querySelector('.app__image');

const btn = document.querySelectorAll('.app__card-button');


//Busca dentro da lista na const btn todos os botões e informa o conteúdo do clique.
btn.forEach((elemento) =>{
    elemento.addEventListener("click", () =>{
        const context = elemento.getAttribute('data-contexto');
        //console.log(moodValue);
        changeContext(context);    
    })
})

function changeContext(context){
        html.setAttribute('data-contexto', context);
        banner.setAttribute('src', "/imagens/"+context+".png");
}
const html = document.querySelector('html');

const btn = document.querySelectorAll('.app__card-button');


//Busca dentro da lista na const btn todos os botões e informa o conteúdo do clique.
btn.forEach((elemento) =>{
    elemento.addEventListener("click", (evento) =>{
        console.log(evento.target.textContent);

        if(evento.target.textContent === "Foco"){
            html.setAttribute('data-contexto', 'foco');
        } else if(evento.target.textContent === "Descanso curto"){
            html.setAttribute('data-contexto', 'descanso-curto');
        } else{
            html.setAttribute('data-contexto', 'descanso-longo');
        }
    })
})
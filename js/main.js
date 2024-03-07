const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');

const btn = document.querySelectorAll('.app__card-button');


//Busca dentro da lista na const btn todos os botões e informa o conteúdo do clique.
btn.forEach((elemento) => {
    elemento.addEventListener("click", () => {
        const context = elemento.getAttribute('data-contexto');
        //console.log(moodValue);
        changeContext(context);
    })
})

function changeContext(context) {
    html.setAttribute('data-contexto', context);
    banner.setAttribute('src', "/imagens/" + context + ".png");

    switch (context) {
        case "foco":
            title.innerHTML = `
                    Otimize sua produtividade,<br>
                    <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;
        case "short":
            title.innerHTML = `
                    Que tal dar uma respirada? 
                    <strong class="app__title-strong">Faça uma pausa curta!</strong>
                `
            break;
        case "long":
            title.innerHTML = `
                    Hora de voltar à superfície.
                    <strong class="app__title-strong"> Faça uma pausa longa.</strong>
                `
        default:
            break;
    }
}
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
});

// focoBt.addEventListener('click', () => {
//     html.setAttribute('data-contexto', 'foco')
//     banner.setAttribute('src', '/imagens/foco.png')
// });

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
});

// curtoBt.addEventListener('click', () => {
//     html.setAttribute('data-contexto', 'descanso-curto')
//     banner.setAttribute('src', '/imagens/descanso-curto.png')
// });

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
});

// longoBt.addEventListener('click', () => {
//     html.setAttribute('data-contexto', 'descanso-longo')
//     banner.setAttribute('src', '/imagens/descanso-longo.png')
// });

function alterarContexto (contexto) {
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong> `
            break;
        case "descanso-curto":
            titulo.innerHTML = `Qeu tal dar uma respirada?  <strong class="app__title-strong">Faça uma pausa curta. </strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar á superfície <strong class="app__title-strong">faça uma pausa longa.</strong>`
        default:
            break;
    }
}
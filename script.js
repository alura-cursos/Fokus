const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

focoBt.addEventListener('click', () => {
    alterarContexto('foco')
});

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
});

longBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
});

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar<br> uma respirada?<br>
                <strong class="app__title-strong">Faça uma<br>pausa curta!</strong>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar<br> à superfície<br>
                <strong class="app__title-strong">Faça uma<br>pausa longa.</strong>`
            break;
        default:
            break;
    }
}
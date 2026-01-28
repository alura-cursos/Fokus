const focoBotao = document.querySelector('.app__card-button--foco');
const descansoCurtoBotao = document.querySelector('app__card-button--curto'); 
const descansoLongoBotao = document.querySelector('app__card-button--longo'); 
const banner1 = document.querySelector('.app__image');
const html2 = document.querySelector('html');
const titulo1 = document.querySelector('.app__title');

function alterarContexto(contexto) {
    html.setAttribute('data-contexto', 'contexto');
    banner.setAttribute('src', `../imagens/${contexto}.png`);

    switch(contexto) {
        case 'foco':
            titulo1.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo1.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo1.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}

focoBotao.addEventListener('click', () => {
    alterarContexto('foco');
});

descansoCurtoBotao.addEventListener('click', () => {
    alterarContexto('descanso-curto');
});

descansoLongoBotao.addEventListener('click', () => {
    alterarContexto('descanso-longo');
});

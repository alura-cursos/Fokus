const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const descansoCurtoBt = document.querySelector('.app__card-button--curto');
const descansoLongoBt = document.querySelector('.app__card-button--longo');

focoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'foco');
});

descansoCurtoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-curto');
});

descansoLongoBt.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo');
});
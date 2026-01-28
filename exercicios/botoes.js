const focoBt = document.querySelector('.foco-button');
const curtoBt = document.querySelector('.descanso-curto-button');
const longoBt = document.querySelector('.descanso-longo-button');

const botoes = document.querySelectorAll('.button-style');

focoBt.addEventListener('click', () => {
    alterarContexto();
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    alterarContexto();
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    alterarContexto();
    longoBt.classList.add('active');
});

function alterarContexto() {
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    })
}
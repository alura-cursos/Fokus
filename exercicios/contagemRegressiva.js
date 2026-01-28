const play = new Audio('../sons/play.wav');
const pause = new Audio('../sons/pause.mp3');
const tempoFinalizado = new Audio('../sons/beep.mp3');
const focoButton = document.querySelector('.foco-button');
let intervaloId = null
let tempoDecorrido = 5;

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0) {
        tempoFinalizado.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorrido -= 1;
    console.log('Tempo decorrido:', tempoDecorrido);
}

function iniciar() {
    if(intervaloId) {
        pause.play();
        zerar();
        return;
    }
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000); 
}

focoBt.addEventListener('click', iniciar);

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}
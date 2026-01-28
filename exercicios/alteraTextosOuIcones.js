const play = new Audio('../sons/play.wav');
const pause = new Audio('../sons/pause.mp3');
const tempoFinalizado = new Audio('../sons/beep.mp3');
const focoButton = document.querySelector('.foco-button');
const startPauseSpan = document.querySelector('#start-pause span');
const startPauseImage = document.querySelector('#start-pause img');
const timer = document.querySelector('#timer');
let intervaloId = null
let tempoDecorrido = 5;

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0) {
        tempoFinalizado.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    mostrarTimer();
    tempoDecorrido -= 1;
}

function iniciar() {
    if(intervaloId) {
        pause.play();
        zerar();
        return;
    }
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000); 
    startPauseSpan.textContent = 'Pause';
    startPauseImage.setAttribute('src', '../imagens/pause.png');
}

focoBt.addEventListener('click', iniciar);

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    startPauseSpan.textContent = 'Começar';
    startPauseImage.setAttribute('src', '../imagens/play_arrow.png');
}

function mostrarTimer() {
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${tempoFormatado}`
    console.log(tempoFormatado);
}

mostrarTimer();
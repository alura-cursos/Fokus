const html = document.querySelector('html');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const icon = document.querySelector('.app__card-primary-butto-icon');

const btn = document.querySelectorAll('.app__card-button');

const startBtn = document.querySelector('#start-pause');
const startPauseBtn = document.querySelector('#start-pause span');

const musicBtn = document.querySelector('#alternar-musica');
const music = new Audio('/sons/luna-rise-part-one.mp3');
music.loop = true;

const startAudio = new Audio('./sons/play.wav');
const stopAudio = new Audio('./sons/pause.mp3');

const alertTimer = new Audio('./sons/beep.mp3');


const timeScreen = document.querySelector('#timer');
let timer = 1500;
let pause = null;

musicBtn.addEventListener('change', () => {
    if (music.paused) {

        music.play();
    } else {

        music.pause();
    }
})

//Busca dentro da lista na const btn todos os botões e informa o conteúdo do clique.
btn.forEach((elemento) => {
    elemento.addEventListener("click", () => {
        const context = elemento.getAttribute('data-contexto');
        //console.log(moodValue);
        changeContext(context);
        activeBtn(context);
    })
})

function changeContext(context) {
    html.setAttribute('data-contexto', context);
    banner.setAttribute('src', "/imagens/" + context + ".png");
    changeTimer(context);
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

function activeBtn(context) {
    removeActive();
    addActive(context);
}

function addActive(context) {
    const btn = document.querySelector(`.app__card-button--${context}`);
    btn.classList.add('active');
}

function removeActive() {
    const active = document.querySelector('.active');
    console.log(active);
    active.classList.remove('active');
}

const counter = () => {
    if (timer <= 0) {
        alertTimer.play();
        console.log('Tempo finalizado')

        const activeFocus = html.getAttribute('data-contexto') == 'foco';
        if(activeFocus){
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento);
        }

        stop();
        return;
    }
    timer -= 1;
    showTimer();
}

startBtn.addEventListener('click', startPause)

function startPause() {
    if (pause) {
        stopAudio.play();
        stop();
        return
    }
    startAudio.play();
    pause = setInterval(counter, 1000)
    startPauseBtn.textContent = "Pausar";
    icon.setAttribute('src', "/imagens/pause.png");
}

function stop() {
    clearInterval(pause)
    startPauseBtn.textContent = "Começar";
    icon.setAttribute('src', "/imagens/play_arrow.png");
    pause = null;
}

function showTimer() {
    const tempo = new Date(timer * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', {
        minute: '2-digit',
        second: '2-digit'
    });
    timeScreen.innerHTML = `${tempoFormatado}`;
}


function changeTimer(context) {
    switch (context) {
        case "foco":
            timer = 30 /*1500*/;
            showTimer();
            break;
        case "short":
            timer = 5 /*300*/;
            showTimer();
            break;
        case "long":
            timer = 15 /*900*/;
            showTimer();
        default:
            break;
    }
}
showTimer();
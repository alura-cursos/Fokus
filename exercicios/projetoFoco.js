const paragrafoDescricao = document.querySelector('.app__section-active-task-description');
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        // debugger
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        // console.log('Nova descrição da tarefa: ', novaDescricao)
        if (novaDescricao) {            
            paragrafo.textContent = novaDescricao
            tarefa.descricao = novaDescricao
            atualizarTarefas()
        }
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')
    botao.append(imagemBotao)

    li.onclick = () => {
        document.querySelectorAll(".app__section-task-list-item-active")
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active');
            });

        if(tarefaSelecionada == tarefa) {
            paragrafoDescricao.textContent = ''
            li.classList.remove('app__section-task-list-item-active');
            tarefaSelecionada = null;
            liTarefaSelecionada = null;
        }
        
        tarefaSelecionada = tarefa;
        liTarefaSelecionada = li;

        li.classList.add('app__section-task-list-item-active');
        paragrafoDescricao.textContent = tarefa.descricao;

    }

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    return li
}   

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled');
    }
})
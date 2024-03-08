// Encontrar o botão adicionar tarefa

const addBtn = document.querySelector('.app__button--add-task');
const cancelBtn = document.querySelector('.app__form-footer__button--cancel');

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')


const activityForm = document.querySelector('.app__form-add-task');
const formTxtArea = document.querySelector('.app__form-textarea');
const ulTaskArea = document.querySelector('.app__section-task-list');

const paragraphDescTask = document.querySelector('.app__section-active-task-description');

const tasks = JSON.parse(localStorage.getItem('tarefas')) || [];


let selectedTask = null;
let liSelectedTask = null;

function attTasks() {
    localStorage.setItem('tarefas', JSON.stringify(tasks));
}


//Criando um elemento
function createTask(task) {

    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
    `

    const paragraph = document.createElement('p');
    paragraph.classList.add('app__section-task-list-item-description')
    paragraph.textContent = task.description;

    const btn = document.createElement('button');
    btn.classList.add('app_button-edit');

    btn.onclick = () => {
        //debugger;
        const newDesc = prompt("Qual é o novo nome da tarefa?");
        console.log('Nova descrição da tarefa: ', newDesc);
        if (newDesc) {
            paragraph.textContent = newDesc;
            task.description = newDesc;
            attTasks();
        }
    }

    const imgBtn = document.createElement('img');
    imgBtn.setAttribute('src', '/imagens/edit.png');

    //Montando o HTML.
    btn.append(imgBtn);

    li.append(svg);
    li.append(paragraph);
    li.append(btn);

    if (task.completa) {
        li.classList.add('app__section-task-list-item-complete');
        btn.setAttribute('disabled', 'disabled');
    } else {
        li.onclick = () => {
            // Verifica se exitem elementos com a classe e remove a classe.
            document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active')
                })

            if (selectedTask == task) {
                paragraphDescTask.textContent = '';
                selectedTask = null;
                liSelectedTask = null;
                return;
            }

            selectedTask = task;
            liSelectedTask = li;
            paragraphDescTask.textContent = task.description;

            // Adiciona classe.
            li.classList.add('app__section-task-list-item-active');
        }
    }

    return li;
}

addBtn.addEventListener('click', () => {
    //Toggle = alterna a classe. Ou seja, clicando no botão ira esconder e exibir o form.
    activityForm.classList.toggle('hidden');
})

cancelBtn.addEventListener('click', () => {
    formTxtArea.value = '';
    activityForm.classList.toggle('hidden');
})

activityForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const task = {
        description: formTxtArea.value
    }
    tasks.push(task);
    //Mostrar a tarefa após inclusão
    const taskElement = createTask(task);
    ulTaskArea.append(taskElement);
    // Usar biblioteca JSON para poder guardar informações na localStorage. Principalmente se for Lista, visto que a localStorage por padrão não comporta listas.
    attTasks();

    formTxtArea.value = '';
    activityForm.classList.add('hidden');
})

tasks.forEach(tarefa => {
    const taskElement = createTask(tarefa);
    ulTaskArea.append(taskElement);
});

document.addEventListener('FocoFinalizado', () => {
    if (selectedTask && liSelectedTask) {
        liSelectedTask.classList.remove('app__section-task-list-item-active');
        liSelectedTask.classList.add('app__section-task-list-item-complete');

        liSelectedTask.querySelector('button').setAttribute('disabled', 'disabled');

        selectedTask.completa = true;
        attTasks();
    }
})

const removeTask  = (onlyComplete) => {
    let selector =  ".app__section-task-list-item"
    if (onlyComplete) {
        seletor = ".app__section-task-list-item-complete"
    }
    document.querySelectorAll(selector).forEach(elemento => {
        elemento.remove()
    })
    tasks = onlyComplete ? tasks.filter(task => !task.completa) : []
    atualizarTarefas()
}


btnRemoverConcluidas.onclick = () => removeTask(true)
btnRemoverTodas.onclick = () => removeTask(false)
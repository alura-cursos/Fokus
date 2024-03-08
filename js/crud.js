// Encontrar o botão adicionar tarefa

const addBtn = document.querySelector('.app__button--add-task');
const activityForm = document.querySelector('.app__form-add-task');
const formTxtArea = document.querySelector('.app__form-textarea');

const tasks = [];

addBtn.addEventListener('click', () => {
    //Toggle = alterna a classe. Ou seja, clicando no botão ira esconder e exibir o form.
    activityForm.classList.toggle('hidden');
})

activityForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const task = {
        description: formTxtArea.value
    }
    tasks.push(task);

    // Usar biblioteca JSON para poder guardar informações na localStorage
    localStorage.setItem('tarefas', JSON.stringify(tasks));
})
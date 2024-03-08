// Encontrar o botão adicionar tarefa

const addBtn = document.querySelector('.app__button--add-task');
const activityForm = document.querySelector('.app__form-add-task');

addBtn.addEventListener('click', () =>{
    //Toggle = alterna a classe. Ou seja, clicando no botão ira esconder e exibir o form.
    activityForm.classList.toggle('hidden');
})
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const ulTarefas = document.querySelector('.app__section-task-header__ul');

function criarTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.classList.add("app__section-task-icon-status");
  svg.innerHTML = `
    <svg class="app__section-task-icon-status"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
             
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>

            <path
                d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E">
            </path>
        </svg>
    `;

  const paragrafo = document.createElement("p");
  paragrafo.classList.add("app__section-task-list-item-description");
  paragrafo.textContent = tarefa.descricao;

  const botao = document.createElement("button");
  botao.classList.add("app_button-edit");

  const imgButton = document.createElement("img");
  imgButton.setAttribute("src", "/imagens/edit.png");

  botao.append(imgButton);
  li.append(svg);
  li.append(paragrafo);
  li.append(botao);

  return li;
}

tarefas.forEach(tarefa => {
    const elementoTarefa = criarTarefa(tarefa);
    ulTarefas.append(elementoTarefa);
});
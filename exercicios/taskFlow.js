const adicionarTarefaBt = document.querySelector(".btn-add-task");
const formulario = document.querySelector(".form-add-task");
const textarea = document.querySelector(".app__form-textarea");

const tarefas = [];

function atualizarTarefa() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

adicionarTarefaBt.addEventListener("click", () => {
  adicionarTarefaBt.classList.toggle("hidden");
});

function criaTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
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

  const button = document.createElement("button");
  button.classList.add("app_button-edit");

  button.onclick = () => {
    debugger;
    const novaDescricao = prompt('Digite a nova descição:');
    console.log('Nova descrição:', novaDescricao);
    if(novaDescricao) {
        paragrafo.textContent = novaDescricao;
        tarefa.descricao = novaDescricao
        atualizarTarefa();
    }
  }

  const imgButton = document.createElement("img");
  imgButton.setAttribute("src", "./imagens/edit.png");

  button.append(imgButton);
  li.append(svg);
  li.append(paragrafo);
  li.append(button);

  return li;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const tarefa = {
    descricao: textarea.value,
  };
  atualizarTarefa();
  tarefas.push(tarefa);
});

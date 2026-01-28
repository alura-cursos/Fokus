const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const bntRemoverConcluidas = document.querySelector('.btn-remover-concluidas');
const bntRemoverTodas = document.querySelector('.btn-remover-todas');

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
    // debugger;
    const novaDescricao = prompt("Qual a nova descrição?");
    // console.log("Verificando nova descrição:", novaDescricao);

    if (novaDescricao) {
      paragrafo.textContent = novaDescricao;
      tarefa.descricao = novaDescricao;
      atualizarTarefas();
    }
  };

  const imgButton = document.createElement("img");
  imgButton.setAttribute("src", "./imagens/edit.png");

  if (tarefa.completa) {
    li.classList.add("app__section-task-list-item-complete");
    button.setAttribute("disabled", "disabled");
  } else {
    li.onclick = () => {
      if (tarefaSelecionada == tarefa) {
        paragrafoTarefaDescricao.textContent = "";
        li.classList.remove("app__section-task-list-item-active");
        tarefaSelecionada = null;
        liTarefaSelecionada = null;
        return;
      }
      tarefaSelecionada = tarefa;
      liTarefaSelecionada = li;

      document
        .querySelectorAll(".app__section-task-list-item-active")
        .forEach((elemento) => {
          elemento.classList.remove("app__section-task-list-item-active");
        });

      paragrafoTarefaDescricao.textContent = tarefa.descricao;
      li.classList.add("app__section-task-list-item-active");
    };
  }

  button.append(imgButton);
  li.append(svg);
  li.append(paragrafo);
  li.append(button);

  return li;
}

const removerTarefas = (somenteConcluidas) => {
    const seletor = somenteConcluidas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item';
    document.querySelectorAll(seletor).forEach(elemento => {
        elemento.remove();
    });

    tarefas = somenteConcluidas ? tarefas.filter(tarefas => !tarefas.completa) : [];
    atualizarTarefas();
}

btnRemoverConcluidas.onclick() = () => removerTarefas(true);
btnRemoverTodas.onclick() = () => removerTarefas(false);

function atualizarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
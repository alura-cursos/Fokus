const adicionarTaskBt = document.querySelector(".app__button--add-task");
const formAdicionaTask = document.querySelector(".app__form-add-task");
const textarea = document.querySelector(".app__form-textarea");
const ulTarefas = document.querySelector(".app__section-task-list");
const paragrafoTarefaDescricao = document.querySelector(
  ".app__section-active-task-description",
);
const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas');
const btnRemoverTodas = document.querySelector('#btn-remover-todas');

let tarefaSelecionada = null;
let liTarefaSelecionada = null;

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []; // localStorage.getItem retorna uma string ou null, o JSON.parse converte JSON em objeto

function atualizarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas)); // O localStorage aceita apenas strings por isso o JSON.stringify
}

function limparConteudo() {
  textarea.value = "";
  formAdicionaTask.classList.toggle("hidden");
}

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

adicionarTaskBt.addEventListener("click", () => {
  formAdicionaTask.classList.toggle("hidden");

  const cancelarBotao = document.querySelector(
    ".app__form-footer__button--cancel",
  );
  cancelarBotao.onclick = () => {
    limparConteudo();
  };
});

formAdicionaTask.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const tarefa = {
    descricao: textarea.value,
  };

  tarefas.push(tarefa);
  atualizarTarefas();

  const elementoTarefa = criaTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
  limparConteudo();
});

tarefas.forEach((tarefa) => {
  const elementoTarefa = criaTarefa(tarefa);
  ulTarefas.append(elementoTarefa);
});

// Quando a contagem regressiva do contexto "foco" acabar, adicionar o estilo e desabilitar o botão da tarefa
document.addEventListener("FocoFinalizado", () => {
  if (tarefaSelecionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
    liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    liTarefaSelecionada
      .querySelector("button")
      .setAttribute("disabled", "disabled");
    tarefaSelecionada.completa = true;
    atualizarTarefas();
  }
});

const removerTarefas = (somenteConcluidas) => {
  let seletor = somenteConcluidas ? '.app__section-task-list-item-complete' : '.app__section-task-list-item'
  document.querySelectorAll(seletor).forEach(elemento => {
    elemento.remove();
  });

  tarefas = somenteConcluidas ? tarefas.filter(tarefa => !tarefa.completa) : [];
  atualizarTarefas();
}

btnRemoverConcluidas.onclick = () => removerTarefas(true);
btnRemoverTodas.onclick = () => removerTarefas(false);
// faz a requisição e busca todas as tarefas
const tbody = document.querySelector('tbody');

const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks');
    const tasks = await response.json();
    return tasks;
}

// função para criar elementos html
const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);
    
    if(innerText) {
        element.innerText = innerText;
    }

    if(innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
}


const createSelect = (value) => {
    const options = `
        <option value="pendente">Pendente</option>
        <option value="em andamento">Em andamento</option>
        <option value="concluída"}">Concluída</option>
    `;

    const select = createElement('select', '', options);

    select.value = value;

    return select;
}


const task = {
    id: 1,
    title: 'Teste Feliz',
    created_at: '00 janeiro 2023',
    status: 'concluída'
}

// função para triar uma linha da tabela, criando os elementos e setando os dados vindos do backend.
const createRow = (task) => {

    const { id, title, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', created_at);
    const tdStatus = createElement('td');
    const tdActions = createElement('td');
    const select = createSelect(status);
    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    tdStatus.appendChild(select);
    tdActions.appendChild(deleteButton);
    tdActions.appendChild(editButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    tbody.appendChild(tr);

}

createRow(task)
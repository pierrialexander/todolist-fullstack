const tbody = document.querySelector('tbody');
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');
const urlBaseApi = 'http://localhost:3333/tasks/'


// FUNÇÕES CRUD =================================================================

// função que busca no banco as tasks para posteriormente ser usada para carregar na tela.
const fetchTasks = async () => {
    const response = await fetch(urlBaseApi);
    const tasks = await response.json();
    return tasks;
}

// função para adicionar uma nova tarefa no banco.
const addTask = async (event) => {
    event.preventDefault();

    const task = { title: inputTask.value };

    await fetch(urlBaseApi, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });

    loadTasks();
    inputTask.value = '';
}

// função para excluir uma tarefa.
const deleteTask = async (id) => {
    await fetch(urlBaseApi+id, {
        method: 'delete'
    });
    loadTasks();
}

// função para atualizar uma task.
const updateTask = async (task) => {

    const { id, title, created_at, status } = task;

    await fetch(urlBaseApi+id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status }),
    });

    loadTasks();
}






//FUNÇÕES COMPLEMENTARES =============================================

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

// função para formatar a data para melhor visualização no frontend.
const formatDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short' };
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
}

// função responsável por criar o select que será jogado na tela.
const createSelect = (value) => {
    const options = `
        <option value="pendente">Pendente</option>
        <option value="em andamento">Em andamento</option>
        <option value="concluída">Concluída</option>
    `;

    const select = createElement('select', '', options);

    select.value = value;

    return select;
}

// função que cria uma linha da tabela, setando os dados vindos do backend.
const createRow = (task) => {

    const { id, title, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');
    
    const select = createSelect(status);
    select.addEventListener('change', ({ target }) => updateTask({ id, title, created_at, status: target.value }));
    
    const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');   
    const deleteButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

    const editForm = createElement('form');
    const editInput = createElement('input');

    editInput.value = title;
    editForm.appendChild(editInput);

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        updateTask({ id, title: editInput.value, status });
    });

    editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
    });

    editButton.classList.add('btn-action');
    deleteButton.classList.add('btn-action');

    deleteButton.addEventListener('click', () => deleteTask(id));

    tdStatus.appendChild(select);
    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    tr.appendChild(tdTitle);
    tr.appendChild(tdCreatedAt);
    tr.appendChild(tdStatus);
    tr.appendChild(tdActions);

    return tr;
}

// função responsável por buscar as tasks no banco de dados através do métoo "fetchTasks" e carregar na tela.
const loadTasks = async () => {
    const tasks = await fetchTasks();
    
    tbody.innerHTML = '';
    
    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

addForm.addEventListener('submit', addTask);

loadTasks();
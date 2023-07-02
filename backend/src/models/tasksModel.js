const connection = require('./connection');

// Rota para buscar todas as tarefas - READ ALL
const getAll = async () => {
    const [tasks] = await connection.execute('SELECT * FROM tasks');
    return tasks;
};

// Rota para buscar uma única tarefa - READ
const getOne = async (id) => {
    const task = await connection.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    return task;
};

// Cadastrar nova tarefa - CREATE
const createTask = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks (title, status, created_at) VALUES (?, ?, ?)';
    const [ createdTask ] = await connection.execute(query, [title, 'pendente', dateUTC]);
    return { insertId: createdTask.insertId };
};


// Deletar uma tarefa - DELETE
const deleteTask = async (id) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    const removedTask = await connection.execute(query, [id]);
    return removedTask;
};

// Atualizar uma tarefa - UPDATE
const updateTask = async (id, task) => {
    const { title, status } = task;
    
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

    const [ updatedTask ] = await connection.execute(query, [title, status, id]);
    return updatedTask;
};

module.exports = {
    getAll,
    getOne,
    createTask,
    deleteTask,
    updateTask,
};
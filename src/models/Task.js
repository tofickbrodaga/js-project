class Task {
  constructor(id, title, description, completed = false, createdAt = new Date()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = createdAt;
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
    this.currentId = 1;
  }

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id) {
    return this.tasks.find(task => task.id === id);
  }

  createTask(title, description = '') {
    const newTask = new Task(this.currentId++, title, description);
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id, updates) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    Object.assign(this.tasks[taskIndex], updates);
    return this.tasks[taskIndex];
  }

  deleteTask(id) {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) return null;

    return this.tasks.splice(taskIndex, 1)[0];
  }
}

module.exports = new TaskManager();
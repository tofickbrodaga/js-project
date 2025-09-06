const taskManager = require('../models/Task');

const getAllTasks = (req, res) => {
  res.json(taskManager.getAllTasks());
};

const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = taskManager.getTaskById(taskId);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
};

const createTask = (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = taskManager.createTask(title, description);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, completed } = req.body;

  const updates = {};
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (completed !== undefined) updates.completed = completed;

  const updatedTask = taskManager.updateTask(taskId, updates);
  
  if (!updatedTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(updatedTask);
};

const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const deletedTask = taskManager.deleteTask(taskId);
  
  if (!deletedTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json({ message: 'Task deleted successfully', task: deletedTask });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
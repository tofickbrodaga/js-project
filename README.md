# Jira-like TODO Manager API

Простой, но мощный менеджер задач с функциональностью, вдохновленной Jira. Построен на Node.js, Express и MongoDB с полной аутентификацией пользователей.

### Технологии

**Backend**: Node.js, Express.js
**Database**: MongoDB с Mongoose ODM
**Authentication**: JWT (JSON Web Tokens)
**Password Hashing**: bcryptjs
**Validation**: express-validator

## 📋 Требования

### Системные требования
- Node.js 14+
- MongoDB 4.4+
- npm или yarn

### Установка зависимостей
```bash
npm install
```

### Схема БД


Коллекция: users

```js
{
  _id: ObjectId,
  username: String,        // required, unique, min:3, max:30
  email: String,           // required, unique, lowercase
  password: String,        // required, min:6 (hashed)
  createdAt: Date,
  updatedAt: Date
}
```

Коллекция: boards

```js
{
  _id: ObjectId,
  name: String,           // required, max:100
  description: String,    // optional, max:500
  owner: ObjectId,        // required, ref: 'User'
  members: [ObjectId],    // ref: 'User'
  isPublic: Boolean,      // default: false
  createdAt: Date,
  updatedAt: Date
}

```
Коллекция: columns
```js

{
  _id: ObjectId,
  name: String,           // required, max:50
  position: Number,       // required, min:0
  board: ObjectId,        // required, ref: 'Board'
  createdAt: Date,
  updatedAt: Date
}

```

Коллекция: tasks

```js

{
  _id: ObjectId,
  title: String,          // required, max:200
  description: String,    // optional, max:2000
  type: String,           // enum: ['task', 'bug', 'story', 'epic']
  priority: String,       // enum: ['lowest', 'low', 'medium', 'high', 'highest']
  status: String,         // enum: ['backlog', 'todo', 'inprogress', 'review', 'done']
  assignee: ObjectId,     // ref: 'User'
  reporter: ObjectId,     // required, ref: 'User'
  board: ObjectId,        // required, ref: 'Board'
  column: ObjectId,       // required, ref: 'Column'
  labels: [String],       // max:20 chars each
  storyPoints: Number,    // min:0, max:100
  dueDate: Date,
  comments: [{
    user: ObjectId,       // ref: 'User'
    content: String,      // max:1000
    createdAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```


### API Маршруты

Аутентификация (/api/auth)

Метод	Эндпоинт	Описание	Аутентификация	Тело запроса
POST	/register	Регистрация	❌	{username, email, password}
POST	/login	Вход	❌	{email, password}
GET	/me	Профиль	✅	-
Доски (/api/boards)

Метод	Эндпоинт	Описание	Аутентификация
GET	/	Мои доски	✅
POST	/	Создать доску	✅	{name, description, isPublic}
GET	/:id	Получить доску	✅
PUT	/:id	Обновить доску	✅	{name, description, isPublic}
DELETE	/:id	Удалить доску	✅
Задачи (/api/tasks)

Метод	Эндпоинт	Описание	Аутентификация
POST	/	Создать задачу	✅	{title, description, type, priority, board, column, ...}
GET	/board/:boardId	Задачи доски	✅
PUT	/:id	Обновить задачу	✅	{title, description, status, assignee, ...}
POST	/:id/comments	Добавить комментарий	✅	{content}

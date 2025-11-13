## 🚀 1. Instalação

No diretório do projeto:

```bash
npm install
```

Esse comando instala as dependências:

- express
- sqlite & sqlite3
- bcrypt
- jsonwebtoken
- cors

### Inicia o servidor

```bash
npm start
```

---

### Endpoints de user

POST, register user

```bash
POST http://localhost:3000/users/register
```

body json

```json
{
  "name": "seu nome",
  "username": "seu username",
  "email": "seuemail@email.com",
  "password": "123456"
}
```

POST, login user

```bash
POST http://localhost:3000/users/login
```

body json

```json
{
  "email": "nica@email.com",
  "password": "123456"
}
```

---

### Endpoints de cards

POST create card

```bash
POST http://localhost:3000/cards
```

body json

```json
{
  "name": "Estudar React",
  "description": "Hooks",
  "start_time": "2025-11-13 06:00",
  "end_time": "2025-11-13 10:00",
  "status": "todo",
  "color": "#3498db",
  "user_id": 1
}
```

GET get card by user

```bash
GET http://localhost:3000/cards/user/1
```

GET card by id

```bash
GET http://localhost:3000/cards/1
```

PUT update card

```bash
PUT http://localhost:3000/cards/1
```

body json

```json
{
  "name": "Estudar React + Router",
  "description": "Hooks, Context e React Router",
  "start_time": "2025-11-13 09:00",
  "end_time": "2025-11-13 11:00",
  "status": "doing",
  "color": "#e67e22"
}
```

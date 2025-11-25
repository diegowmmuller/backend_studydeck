const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.routes');
const cardRoutes = require('./routes/card.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

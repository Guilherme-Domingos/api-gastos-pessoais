import express from 'express';
import {UserController} from "../src/controllers/UserController"

const app = express();
app.use(express.json());
const userController = new UserController();


app.get('/users', (req, res) => 
    userController.getAllUsers(req, res)
);

app.post('/registerUser', (req, res) =>
    userController.registerUser(req, res)
);

<<<<<<< HEAD

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
=======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
>>>>>>> John

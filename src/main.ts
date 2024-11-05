import {Api} from '../src/api/api';
import {UserController} from "../src/controllers/UserController"
import { TransactionController } from './controllers/TransactionController';

const userController = new UserController();
const  transactionController = new TransactionController();


function main(){
    const api = Api.build()

    api.addRota('/users', 'GET', userController.getAllUsers);
    api.addRota('/registerUser', 'POST', userController.registerUser);
    api.addRota('/updateUser','PUT', userController.updateUser)
    api.addRota('/deleteUser','DELETE', userController.deleteUser)

    api.addRota('transaction', 'GET', transactionController.getTransactions)
    // api.addRota('/transaction', 'POST', transactionController.createTransaction)
    // api.addRota('/transaction', 'PUT', transactionController.updateTransaction)
    // api.addRota('/transaction', 'DELETE', transactionController.deleteTransaction)
    api.start()
}

main()

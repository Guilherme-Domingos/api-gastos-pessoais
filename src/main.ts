import { Api } from "./api/api";
import { UserController } from "../src/controllers/UserController";
import { TransactionController } from "./controllers/TransactionController";
 
const userController = new UserController();
const transactionController = new TransactionController();

function main(){
    const api = Api.build()

    api.addRota("/user", "GET", userController.getAllUsers)
    api.addRota("/user/:id", "GET", userController.getUserById)
    api.addRota("/user", "POST", userController.registerUser)
    api.addRota("/user/:id", "PUT", userController.updateUser)
    api.addRota("/user/:id", "DELETE", userController.deleteUser)
    api.addRota("/userTransaction/:id", "GET", userController.getUserTransaction)

    api.addRota("/transaction", "GET", transactionController.getAllTransactions)
    api.addRota("/transaction/:id", "GET", transactionController.getIdTransaction)
    api.addRota("/transaction", "POST", transactionController.registerTransaction)
    api.addRota("/transaction/:id", "PUT", transactionController.updateTransaction)
    api.addRota("/transaction/:id", "DELETE", transactionController.deleteTransaction)

    api.start()
}
main()


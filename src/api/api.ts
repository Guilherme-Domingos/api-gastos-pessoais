import express, {Express, Request, Response} from "express"

export class Api{
    private constructor (readonly app: Express){}

    public static build(){
        const app = express()
        app.use(express.json())
        return new Api(app)
    }

    public start(){
        this.app.listen(3000, ()=>{
            console.log('Server is running on port 3000')
        })
    }

    public addRota(rota: string, method: string, funcao: (request: Request, response: Response)=>void):void{
        if (method === 'GET'){
            this.app.get(rota, funcao)
        }
        else if (method === 'POST'){
            this.app.post(rota, funcao)
        }
        else if (method === 'PUT'){
            this.app.put(rota, funcao)
        }
        else if (method === 'DELETE'){
            this.app.delete(rota, funcao)
        }
    }


}



import { Response, Request } from "express";
import prisma from "../connection";

class CProdutos {
    public getProdutos = async (req: Request, res: Response) => {
        try {
            const produtos = await prisma.produto.findMany()

            res.status(200).json({
                produtos: produtos
            })
        } catch (error) {
            console.error('Erro obtendo produtos: ', error)
            res.status(500).json({ message: 'Erro obtendo produtos:', error })
        }
    };

    public createProdutos = async (req: Request, res: Response) => {
        try {
            const data = req.body;

            const produto = await prisma.produto.create({
                data: data
            })

            res.status(201).json(produto)
        } catch (error) {
            console.error('Erro criando produto: ', error)
            res.status(500).json({ message: 'Erro criando produto: ', error })
        }
    };
}

const Cprodutos = new CProdutos();

export { Cprodutos }
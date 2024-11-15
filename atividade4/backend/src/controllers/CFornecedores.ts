import { Response, Request } from "express";
import prisma from "../connection";

class CFornecedores {
    public getFornecedores = async (req: Request, res: Response) => {
        try {
            const fornecedores = await prisma.fornecedor.findMany()

            res.status(200).json({
                fornecedores: fornecedores
            })
        } catch (error) {
            console.error('Erro obtendo fornecedores: ', error)
            res.status(500).json({ message: 'Erro obtendo fornecedores: ', error })
        }
    };

    public createFornecedores = async (req: Request, res: Response) => {
        try {
            const data = req.body

            const fornecedor = await prisma.fornecedor.create({
                data: data
            })

            res.status(201).json(fornecedor)
        } catch (error) {
            console.error('Erro criando fornecedor: ', error)
            res.status(500).json({ message: 'Erro criando fornecedor: ', error })
        }
    };
}

const Cfornecedores = new CFornecedores();

export { Cfornecedores }
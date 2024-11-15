import { Response, Request } from "express";
import prisma from "../connection";

class CHistorico {
    public getHistorico = async (req: Request, res: Response) => {
        const { fornecedor, produto, date } = req.query;

        try {
            const whereCondition: any = {}

            if (fornecedor) {
                whereCondition.id_fornecedor = Number(fornecedor)
            }
            if (produto) {
                whereCondition.id_produto = Number(produto)
            }
            if (date) {
                const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    
                if (datePattern.test(date as string)) {
                    whereCondition.data_compra = new Date(date as string);
                }
            }

            const historico = await prisma.historico.findMany({
                where: whereCondition,
                include: {
                    produto: {
                        select: {
                            nome_produto: true
                        }
                    },
                    fornecedor: {
                        select: {
                            nome_fornecedor: true
                        }
                    }
                }
            });

            res.status(200).json({
                historico: historico
            })
        } catch (error) {
            console.error('Erro obtendo historico: ', error)
            res.status(500).json({ message: 'Erro obtendo historico: ', error })
        }
    };

    public createHistorico = async (req: Request, res: Response) => {
        try {
            const {id_fornecedor, id_produto} = req.body;

            const historico = await prisma.historico.create({
                data: {
                    id_fornecedor,
                    id_produto,
                    data_compra: new Date()
                }
            })

            res.status(201).json(historico)
        } catch (error) {
            console.error('Erro criando historico: ', error)
            res.status(500).json({ message: 'Erro criando historico: ', error })
        }
    };
}

const Chistorico = new CHistorico();

export { Chistorico }
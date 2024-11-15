import express from "express";
import { Cprodutos } from "../controllers/Cprodutos";
import { Cfornecedores } from "../controllers/Cfornecedores";
import { Chistorico } from "../controllers/Chistorico";

const router = express.Router();

router
    .route('/produtos')
    .get(Cprodutos.getProdutos)
    .post(Cprodutos.createProdutos)

router
    .route('/fornecedores')
    .get(Cfornecedores.getFornecedores)
    .post(Cfornecedores.createFornecedores)

router
    .route('/historico')
    .get(Chistorico.getHistorico)
    .post(Chistorico.createHistorico)

export default router
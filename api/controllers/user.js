// Criação das funções de querys
import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";
    // Realiza a query, trata erros e retorna o resultado
    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};
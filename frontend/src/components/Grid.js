import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 0px 5px rgba(204, 204, 204, 0.15);
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all; // Quebra as palavras da tabela em casos de display pequenos
`;

export const Thead = styled.thead``;

export const Tr = styled.tr``;

export const Tbody = styled.tbody``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px){
        ${(props) => props.onlyWeb && "display: none"}
    }
`;


const Grid = ({ users, setUsers, setOnEdit }) => {
    // Função que seta o item para editar
    const handleEdit = (item) => {
        setOnEdit(item);
    };

    // Função que deleta o usuário pelo id utilizando o axios
    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:8800/" + id)
            .then(({ data }) => {
                const newArray = users.filter((user) => user.id !== id);

                setUsers(newArray);
                toast.success(data);
            })
            .catch(({ data }) => toast.error(data));

        setOnEdit(null);
    };

    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th onlyWeb>Fone</Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) =>(
                    <Tr key={i}>
                        <Td width="30%">{item.nome}</Td>
                        <Td width="30%">{item.email}</Td>
                        <Td width="20%" onlyWeb>{item.fone}</Td>
                        <Td width="5%" alignCenter><FaEdit onClick={() => handleEdit(item)} cursor="pointer"/></Td>
                        <Td width="5%" alignCenter><FaTrash onClick={() => handleDelete(item.id)} cursor="pointer"/></Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};

export default Grid;
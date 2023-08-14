import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 0px 5px rgba(204, 204, 204, 0.15);
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: #fff;
    height: 42px;
`;

// Componente de formulário
const Form = ({ onEdit, setOnEdit, getUsers }) => {
    const ref = useRef();
    //Preenche os campos do formulário com os dados de edição
    useEffect(() => {
        if(onEdit){
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = ref.current;
        //Verifica se algum dos campos está vazio
        if(
           !user.nome.value ||
           !user.email.value ||
           !user.fone.value ||
           !user.data_nascimento.value 
        ){
            return toast.warn("Preencha todos os campos!");
        }
        //Atualiza os dados do usuário
        if(onEdit){
            await axios
            .put("http://localhost:8800/" + onEdit.id, {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else{ //Se não, cadastra esse usuário
            await axios
            .post("http://localhost:8800", {
                nome: user.nome.value,
                email: user.email.value,
                fone: user.fone.value,
                data_nascimento: user.data_nascimento.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }
        //Limpa os campos do formulário
        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";
        
        setOnEdit(null);
        getUsers();
    };

    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome"/> {/* name deve ser o mesmo nome no db */}
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" type="email"/>
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone"/>
            </InputArea>
            <InputArea>
                <Label>Nascimento</Label>
                <Input name="data_nascimento" type="date"/>
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;
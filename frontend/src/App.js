import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  //Pega os usuarios da api e ordena seus nomes por ordem alfabética
  const getUsers = async () =>{
    try{
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch(error){
      toast.error(error);
    }
  };

  //Recarrega a função sempre que um novo usuário for adicionado
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setUsers={setUsers} setOnEdit={setOnEdit}/>
        <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
      </Container>
      <ToastContainer autoClose={2000} position={toast.POSITION.TOP_RIGHT} />
      <GlobalStyle />
    </>
  );
}

export default App;

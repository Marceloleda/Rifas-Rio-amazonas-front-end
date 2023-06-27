'use client'
import { styled } from "styled-components"
import { useRouter } from 'next/navigation';
import { useState } from "react";

//colocar a logo RA
export default function Sidebar({onFindCampaign}){
    const router = useRouter()
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        window.location.reload();
      };

    const exit = ()=>{
        localStorage.setItem("token", '')
        alert("Desconectado")
        router.push("/")
    }
    return(
        <SidebarWrapper>
            <Titlle>Rifas Rio Amazonas</Titlle>
            <User>
                <h2>
                    Bem vindo ao seu painel :)
                </h2>
            </User>
            <Option onClick={handleRefresh} disabled={refreshing}>Home</Option>
            <Option>Buscar ganhador</Option>
            <Option onClick={onFindCampaign}>Minhas Campanhas</Option>
            <Option>Minha Conta</Option>
            <Option>Suporte</Option>
            <Exit onClick={(()=>{exit()})}>Sair da conta</Exit>


        </SidebarWrapper>
    )
}

const SidebarWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Roboto', sans-serif;
font-weight: bold;

  width: 200px;
  height: 100vh;
  left: 0;
  top: 0;
  padding: 20px;
`;
const Titlle = styled.h1`
font-size: 30px;
margin-bottom: 60px;
`;
const OptionIcon = styled.div`
  margin-right: 10px;
`;

const Option = styled.div`
display:flex;
justify-content:center;
align-items: center;
margin-bottom: 10px;
height: 50px;
width:190px;
cursor: pointer;
&:hover {
    background-color: #ff847c;
}
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
border-radius: 15px;
border: 1px solid black;
`; 
const Exit = styled.div`
display:flex;
justify-content:center;
align-items: center;
height: 50px;
width:190px;
cursor: pointer;
margin: auto;
background: red;
&:hover {
    background-color: #ff847c;
}
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
border-radius: 15px;
border: 1px solid black;
`;
const User = styled.div`
margin-bottom: 25px;
`;

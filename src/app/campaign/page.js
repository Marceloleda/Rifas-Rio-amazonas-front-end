'use client'
import { useState } from "react";
import styled from "styled-components";
import { createRaffle } from "@/services/api";
import { useRouter } from 'next/navigation';

export default function CreateCampaign() {
    const router = useRouter()
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    ticket_price: "",
    total_tickets: "",
    end_date: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    createRaffle(campaignData)
      .then((res) => {
        alert("Cadastrado com sucesso!");
        router.push("/seller")
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 409") {
          alert(`Já está cadastrado`);
        }
        if (err.message === "Request failed with status code 422") {
          alert(`Verifique se seus dados foram digitados corretamente`);
        }
        if (err.message === "Network Error") {
          alert(`Erro de conexão, tente novamente mais tarde`);
        }

        console.log(err.message);
      });
  };

  return (
    <>
      <Conteiner>
        <h1>Rifas Rio Amazonas</h1>
        <h4>Criar Campanha</h4>

        <Forms>
          <form onSubmit={handleFormSubmit}>
            <Inserir
              id="title"
              placeholder="Título"
              value={campaignData.title}
              onChange={(e) =>
                setCampaignData({ ...campaignData, title: e.target.value })
              }
            />
            <Inserir
              id="description"
              type="text"
              placeholder="Descrição, ex: Pix de 10 mil..."
              value={campaignData.description}
              onChange={(e) =>
                setCampaignData({ ...campaignData, description: e.target.value })
              }
            />
            <Inserir
              id="ticket_price"
              type="number"
              placeholder="Valor de cota"
              value={campaignData.ticket_price}
              onChange={(e) =>
                setCampaignData({ ...campaignData, ticket_price: e.target.value })
              }
            />
            <Inserir
              id="total_tickets"
              type="number"
              placeholder="Quantidade de cotas"
              value={campaignData.total_tickets}
              onChange={(e) =>
                setCampaignData({ ...campaignData, total_tickets: e.target.value })
              }
            />
            {/* <Inserir
              id="end_date"
              type="date"
              placeholder="Data do sorteio (caso queira colocar)"
              value={campaignData.end_date}
              onChange={(e) =>
                setCampaignData({ ...campaignData, end_date: e.target.value })
              }
            /> */}

            <Botao type="submit">Criar campanha</Botao>
          </form>
        </Forms>
      </Conteiner>
    </>
  );
}


const Conteiner = styled.div`
font-family: 'Raleway';
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    h1{
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
        font-size: 32px;
        color:black;
    }
`;

const Forms = styled.div`
    form{
            display:flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
        }
`
const Inserir = styled.input`
    width: 326px;
    height: 58px;
    margin-bottom: 16px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    &:first-child{
        margin-top: 25px;
    }
`;
const Botao = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 326px;
height: 46px;
background: green;
border-radius: 5px;
border:none;
cursor: pointer;
font-family: 'Raleway';
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
`;
const Entrar = styled.div`
    margin-top: 35px;
    h2{
        color: #FFFFFF;
        font-size: 15px;
        font-weight: 700;
    }
`;
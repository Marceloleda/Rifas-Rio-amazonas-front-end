import { findCampaigns } from "@/services/api";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

export default function FindCampaign(){
    const [campaignsData, setCampaignData] = useState([])
    useEffect(()=>{
        findCampaigns()
            .then((res)=>{
                console.log(res.data)
                setCampaignData(res.data)
            })
            .catch(err=>{
                console.log(err.message)
            })
    },[])
    const handleViewDetails = (id) => {
        // Lógica para exibir os detalhes da campanha com o ID fornecido
      };
    const rafflesCard = campaignsData.map((data, id)=>{
        return(
            <Raffle key= {id}>
                <h1>Rifa: {data.title}</h1>
                <h2>Total de cotas: {data.total_tickets}</h2>
                <h3>Expira em: {data.expire_at}</h3>
                <Button onClick={() => handleViewDetails(data.id)}>Ver pagina da Rifa</Button>
            </Raffle>
        )
    })
    return(
        <Conteiner>
            {rafflesCard}
        </Conteiner>
    );
}
const Conteiner = styled.div`
display:flex;
justify-content:center;
justify-content: space-around;
flex-direction: wrap;
height: 100%;
widght: 100%;

`;
const Raffle = styled.div`
  height: 250px;
  width: 200px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #ff847c;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e74c3c;
  }
`;
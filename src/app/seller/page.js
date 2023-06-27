'use client'

import { findUser } from "@/services/api";
import Sidebar from "@/components/sidebar";
import { styled } from "styled-components";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import CreateCampaign from "../../components/createCampaign/page";
import FindCampaign from "@/components/findCampaign";

export default function Seller(){
    const router = useRouter()
    const [showCreateCampaign, setShowCreateCampaign] = useState(false);
    const [showFindCampaign, setShowFindCampaign] = useState(false);
    const [user, setUser] = useState({})

    const handleCreateCampaign = () => {
        setShowCreateCampaign(true);
        setShowFindCampaign(false);
      };
    
      const handleFindCampaign = () => {
        setShowFindCampaign(true);
        setShowCreateCampaign(false);
      };

    useEffect(()=>{
        findUser()
            .then((res)=>{
                console.log(res.data)
                setUser(res.data)
            })
            .catch((err=>{
                console.log(err.message)
            }))
    },[])

    return (
        <SellerPageWrapper>
            <Sidebar onFindCampaign={handleFindCampaign}/>
            <SellerPage>

                <HeaderMini>
                    <h1>Dashboard</h1>
                </HeaderMini>
                <DataUser>
                    <h3>Saldo: {user.total_ticket_plan}</h3>
                    <h3>{user.plans?.name}</h3>                
                </DataUser>
                {(!showCreateCampaign && !showFindCampaign) && (
                    <Block onClick={handleCreateCampaign}>Criar Campanha</Block>
                )}
                {showCreateCampaign && <CreateCampaign />}
                {showFindCampaign && <FindCampaign />}
            </SellerPage>
        </SellerPageWrapper>
    )
}

const SellerPage = styled.div`
font-family: 'Roboto', sans-serif;
display:flex;
flex-direction: column;
padding: 20px;
flex:1;
box-sizing: border-box;
background: #f2f2f2;
h2{
    margin-bottom: 50px;
}
`;
const SellerPageWrapper = styled.div`
  display: flex;
`;
const HeaderMini = styled.div`
display:flex;
justify-content: center;
align-items: center;
height: 60px;
width: 100%;
background-color: black;
margin-bottom: 40px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    h1{
        color:white;
        font-size:35px;
    }
`;
const Block = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: black;
font-size: 30px;
height: 80px;
widght:80px;
cursor: pointer;
&:hover {
    background-color: #ff847c;
}
border-radius: 20px;
border: 1px solid black;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);

`;
const Blocks = styled.div`
display: flex;

`;
const DataUser = styled.div`
margin-bottom: 50px;
height: 50px;
box-sizing: border-box;
padding: 20px;

display:flex;
justify-content: space-between;
align-items: center;
border-radius: 20px;
border: 1px solid black;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

`;
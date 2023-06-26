'use client'

import Sidebar from "@/components/sidebar";
import { styled } from "styled-components";
import { useRouter } from 'next/navigation';


export default function Seller(){
    const router = useRouter()
    return (
        <SellerPageWrapper>
            <Sidebar/>
            <SellerPage>
                <HeaderMini>
                    <h1>Dashboard</h1>
                </HeaderMini>
                <Block onClick={(()=>{router.push("/campaign")})}>
                    Criar Campanha
                </Block>

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
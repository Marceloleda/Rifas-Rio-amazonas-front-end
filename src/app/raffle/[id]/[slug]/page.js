'use client'
import { findRaffle } from '@/services/api';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
 
export default function Page({params}) {
  const [raffle, setRaffle] = useState([])

  useEffect(()=>{
    findRaffle(params.id, params.slug)
      .then((res)=>{

        console.log(res.data)
        setRaffle(res.data)
      })
      .catch((err)=> console.log(err.message))
  },[])
  return (
    <Conteiner>
      
      <h1>{raffle.title}</h1>
      <h1>R$ {raffle.ticket_price}</h1>
      <ImageRaffle></ImageRaffle>



    </Conteiner>
  )
}

const Conteiner = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    h1{
        font-family: 'Roboto', sans-serif;
        font-size: 32px;
        color:black;
    }
`;

const ImageRaffle = styled.div`
background:yellow;
wight:350px;
height: 250px;

`;


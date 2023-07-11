'use client'

import { styled } from 'styled-components'
import Header from '@/components/header'
import Plans from '@/components/plans'

export default function Home() {
  return (
    <>
      <Header/>
      <Conteiner>
        <Description>
          <h1>Conquiste o sucesso com suas rifas! <br/>  </h1>
          <h2>
            Com os nossos planos exclusivos, você terá todo o suporte necessário para alcançar suas metas e criar experiências memoráveis. <br/>
          </h2>
          <h3>
            Aproveite a oportunidade e faça parte desse universo!
          </h3>
        </Description>
        <Plans/>
      </Conteiner>
    </>
  )
}
const Conteiner = styled.div`
display: flex;
flex-direction: column;
min-height: 100vh;
align-items: center;
padding-top: 80px; 
`;

const Description = styled.div`
display: flex;
flex-direction: column;
margin-top: 40px;
text-align:center;
  h1{
    color: #333333;
    font-family: 'Open Sans', sans-serif;
    font-size: 25px; 
    margin-bottom: 40px;
  }
  h2{
    font-family: 'Nunito', sans-serif;
    margin-bottom: 25px;
    color: #333333;
  }
  h3{
    font-family: 'Nunito', sans-serif;
    color: #333333;
  }


`;

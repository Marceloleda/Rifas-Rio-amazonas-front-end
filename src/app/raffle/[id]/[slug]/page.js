'use client'
import { buyTicket, findRaffle } from '@/services/api';
import Image from 'next/image';
import picLogo from '../../../../assets/images/picLogo.png'
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';
import { BasicModal } from '@/components/buyerModal/page';
 
export default function Page({ params, searchParams }) {
  const router = useRouter()
  const [raffle, setRaffle] = useState([]);
  const [defaultValue, setDefaultValue] = useState(1);
  const showModal = searchParams?.modal;


  useEffect(() => {
    findRaffle(params.id, params.slug)
      .then((res) => {
        setRaffle(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  const totalPrice = defaultValue * raffle.ticket_price;

  const modal = ()=>{
    const body = {
      raffleId: params.id,
      quantity: defaultValue,
      total: totalPrice,
    }
    const bodyString = JSON.stringify(body);
    localStorage.setItem("bodyRaffle", bodyString);

    router.push(`${params.slug}/?modal=true`)
  }

  const handleIncrementSet = (value) => {
    setDefaultValue(defaultValue + value);
  };
  const handleIncrement = () => {
    setDefaultValue(defaultValue + 1);
  };
  const handleDecrement = () => {
    if (defaultValue > 0) {
      setDefaultValue(defaultValue - 1);
    }
  };

  const handleInputChange = (e) => {
    const parsedValue = parseFloat(e.target.value);

    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setDefaultValue(parsedValue);
    }
  };


  return (
    <Conteiner>
      <ImageRaffle>
        <Image src={picLogo} alt="Logo" width={350} height={250} />
      </ImageRaffle>

      <h1>{raffle.title}</h1>
      <h1>R$ {raffle.ticket_price}</h1>
      <h1>Restam: {raffle.avaliable_tickets} tickets</h1>
      <Plus>
        <SetNumber onClick={() => handleIncrementSet(5)}>+5</SetNumber>
        <SetNumber onClick={() => handleIncrementSet(10)}>+10</SetNumber>
        <SetNumber onClick={() => handleIncrementSet(20)}>+20</SetNumber>
      </Plus>

      <Quatity>
        <ButtonQuantity onClick={handleDecrement}>-</ButtonQuantity>
        <InputQuantity
           type="text" // Alterado para type="text"
           value={defaultValue}
           onChange={handleInputChange}
           min="0"
           inputMode="numeric" // Adicionado o atributo inputMode
           pattern="\d*" // Adicionado o atributo pattern
        />
        <ButtonQuantity onClick={handleIncrement}>+</ButtonQuantity>
      </Quatity>
      <Total_Value>Total: R$ {defaultValue * raffle.ticket_price}</Total_Value>
      <ButtonBuy onClick={modal}>Comprar</ButtonBuy>
      {showModal && 
      <>
        <BasicModal /> 
        <Overlay/>
      </>}

    </Conteiner>
  );
}

const Conteiner = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    background: #f2f2f2;
    flex-direction: column;
    height: 100vh;
    h1{
        font-family: 'Roboto', sans-serif;
        font-size: 32px;
        color:black;
    }
`;
const Overlay = styled.div`
position: fixed;
inset: 0;
background-color: rgba(0, 0, 0, 0.55);
transition: opacity 0.9s;
`;

const Total_Value = styled.p`
font-family: 'Roboto', sans-serif;
margin-bottom: 30px;
font-size:35px;
color:black;

`;
const ImageRaffle = styled.div`
background:grey;
width:350px;
height: 250px;

`;
const ButtonBuy = styled.button`
width:100px;
height: 50px;
`;
const ButtonQuantity = styled.button`
  width: 80px;
  height: 55px;
  background: red;

  &:nth-child(3) {
    background: #3ee83e;
  }
`;
const InputQuantity = styled.input`
display:flex;
align-items: center;
text-align: center;
width:80px;
height: 50px;
`;
const Quatity = styled.div`
display:flex;
justify-content: space-around;
width: 300px;
height: 80px;
`;
const SetNumber = styled.button`
display:flex;
justify-content:center;
align-items:center;

width: 100px;
height: 30px;
background: #84f4b6;

`;
const Plus = styled.div`
display:flex;
justify-content: space-around;
margin-top: 30px;
margin-bottom: 0px;

width: 400px;
height: 80px;
`;
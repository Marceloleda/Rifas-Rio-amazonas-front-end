'use client'
import { buyTicket, findRaffle } from '@/services/api';
import Image from 'next/image';
import picLogo from '../../../../assets/images/picLogo.png'
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';
import { BasicModal } from '@/components/buyerModal/page';
// import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';


 
export default function Page({ params, searchParams }) {
  // const [progress, setProgress] = useState(10);
  const router = useRouter();
  const [raffle, setRaffle] = useState([]);
  const [defaultValue, setDefaultValue] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const showModal = searchParams?.modal;
  // function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  //   return (
  //     <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //       <Box sx={{ width: '100%', mr: 1 }}>
  //         <LinearProgress variant="determinate" {...props} />
  //       </Box>
  //       <Box sx={{ minWidth: 35 }}>
  //         <Typography variant="body2" color="text.secondary">{`${Math.round(
  //           props.value,
  //         )}%`}</Typography>
  //       </Box>
  //     </Box>
  //   );
  // }

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
  //   }, 800);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  useEffect(() => {
    findRaffle(params.id, params.slug)
      .then((res) => {
        setRaffle(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, []);

  const totalPrice = (defaultValue * raffle.ticket_price).toFixed(2); 

  const modal = () => {
    const body = {
      raffleId: params.id,
      quantity: defaultValue,
      total: totalPrice,
    };
    const bodyString = JSON.stringify(body);
    localStorage.setItem("bodyRaffle", bodyString);

    router.push(`${params.slug}/?modal=true`);
  };

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
    <>
      {isLoading ? (
        <SpinnerContainer>
          <StyledSpinner />
        </SpinnerContainer>
      ) : (
        <Conteiner>
          <ResponsiveInfoRaffle>
              <ResponsiveImageRaffle>
                <Image src={picLogo} alt="Logo" width={350} height={300} />
              </ResponsiveImageRaffle>
              <div>
                <h1>{raffle?.title}</h1>
                <h1>Valor: R$ {raffle?.ticket_price}</h1>
                <h2>Descrição: </h2>
                <h3>{raffle?.description}</h3>
              </div>
          </ResponsiveInfoRaffle>
          {/* <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
              <h1>Restam: {raffle?.avaliable_tickets} tickets</h1> */}
          <Plus>
            <SetNumber onClick={() => handleIncrementSet(5)}>+5</SetNumber>
            <SetNumber onClick={() => handleIncrementSet(10)}>+10</SetNumber>
            <SetNumber onClick={() => handleIncrementSet(20)}>+20</SetNumber>
          </Plus>

          <Quatity>
            <ButtonQuantity onClick={handleDecrement}>-</ButtonQuantity>
            <InputQuantity
              type="text" 
              value={defaultValue}
              onChange={handleInputChange}
              min="0"
              inputMode="numeric" 
              pattern="\d*" 
            />
            <ButtonQuantity onClick={handleIncrement}>+</ButtonQuantity>
          </Quatity>
          <Total_Value>Total: R$ {totalPrice}</Total_Value>
          <ButtonBuy onClick={modal}>Comprar</ButtonBuy>
          {showModal && (
            <>
              <BasicModal />
              <Overlay />
            </>
          )}
        </Conteiner>
      )}
    </>
  );
}


const Conteiner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f9e5b6;
    flex-direction: column;
    min-height: 100vh; 
`;
const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    background: #f2f2f2;
    align-items: center;
    min-height: 100vh; 
`;
const StyledSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid purple;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const InfoRaffle = styled.div`
  display: flex;
  border-radius:10px;
  border: 1px solid black ;
  background: #f7ecd2;
  margin-top: 25px;
  height: 300px;
  width: 80%;
  padding: 20px; 

  div {
    margin-right: 30px;
  }
  
  h1 {
    font-family: 'Raleway', sans-serif;
    font-size: 32px;
    color: black;
    margin-bottom: 25px;
    margin-top: 25px;
  }
  
  h2 {
    font-family: 'Raleway', sans-serif;
    font-size: 20px;
    font-weight: bold;
  }
`;

const ResponsiveInfoRaffle = styled(InfoRaffle)`
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: #f7ecd2;
    margin-top: 25px;
    height: 70%;

    padding: 20px; 
    width: 90%; 
    max-width: 800px; 

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
const ResponsiveImageRaffle = styled(ImageRaffle)`
  @media (max-width: 900px) {
    background:grey;
    width:350px;
    height: 250px;
    margin-bottom: 50px;
  }
`;
const ButtonBuy = styled.button`
width:200px;
height: 50px;
border-radius: 10px;
background: #fc923c;
border: none;
border: 3px solid #f77811 ;
cursor:pointer;
&:hover{
  background: #f77811;
}
`;
const ButtonQuantity = styled.button`
  width: 80px;
  height: 55px;
  background: red;
  border-radius: 15px;
  cursor:pointer;
  border: none;
  border: 2px solid #961701 ;
  &:hover{
    background: #961701;
  }

  &:nth-child(3) {
    background: #3ee83e;
    border: 3px solid #319901 ;
    &:hover{
      background: #319901;
    }
  }
`;
const InputQuantity = styled.input`
display:flex;
align-items: center;
text-align: center;
width:80px;
height: 50px;
border-radius: 15px;
border: none;
border: 1px solid #f77811 ;


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
border:none;
cursor: pointer;
border-radius:10px;
border: 3px solid #13f77d ;
&:hover{
  background: #13f77d;
}

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
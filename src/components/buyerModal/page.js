'use client'

import Link from "next/link";
import { styled } from "styled-components"
import { useRouter } from "next/navigation";
import { useState } from "react";

export function BasicModal() {
  const router =useRouter()
  const [cadastro, setCadastro] = useState({
    name: '',
    email: '',
    phone_number:'',
    cpf:'',
    senha: '',
    confirmeSenha: ''
})

function Cadastro(event){
  event.preventDefault();

  signUpSend(signUp)
    .then((res)=>{
      alert("Cadastrado com sucesso!")
    })
    .catch(err=>{
      if(err.message === "Request failed with status code 409"){
          alert(`Voce ja esta cadastrado `)
      }
      if(err.message === "Request failed with status code 422"){
        alert(`Verifique se seus dados foram digitados corretamente`)
      }
      if(err.message === "Network Error"){
        alert(`Erro de conexao, tente novamente mais tarde`)
      }
           
      alert(`Verifique seus dados e tente novamente ;-)`)
        console.log(err.message)
      })
}
    return (
      <ModalContainer>
        <ContentWrapper>
          <ModalContent>
                <h1>Preencha seu dados</h1>

                <Forms>
                    <form onSubmit={Cadastro}>
                        <Inserir id="name" placeholder="Nome completo" value={cadastro.name} onChange={(e)=>
                        setCadastro({...cadastro, name: e.target.value})
                        }/>
                        <Inserir id="email" type="email" placeholder="Email" value={cadastro.email} onChange={(e)=>
                        setCadastro({...cadastro, email: e.target.value})
                        }/>
                        <Inserir id="phone_number" type="phone" placeholder="celular" value={cadastro.phone_number} onChange={(e)=>
                        setCadastro({...cadastro, phone_number: e.target.value})
                        }/>

                        <Botao type="submit">Continuar</Botao>
                    </form>
                </Forms>
            <div>
                <ModalButton onClick={()=>{router.back()}}>Voltar</ModalButton>
            </div>
          </ModalContent>
        </ContentWrapper>
      </ModalContainer>
    );
  }
const ModalContainer = styled.div`
  position: fixed;
  z-index: 10;
  inset: 0;
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-top: 4rem;
  padding-bottom: 20px;
  text-align: center;
`;

const ModalContent = styled.div`
  display:flex;
  justify-content: center;
  flex-direction:column;
  width:400px;
  background-color: #fff;
  border-radius: 0.375rem;
  padding: 1rem;

  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const ModalButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 0.375rem;
  border: none;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #3182ce;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #4299e1;
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
    width: 100%;
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
margin-bottom: 20px;
width: 100%;
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

    &:hover {
      background-color: #28e241;
    }
`;

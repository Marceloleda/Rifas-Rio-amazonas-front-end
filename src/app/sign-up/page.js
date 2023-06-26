'use client'
import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { signUpSend } from "@/services/api";

export default function Cadastro(){
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

        const {senha, confirmeSenha} = cadastro;

        if(senha === confirmeSenha){
            const signUp = {
                name: cadastro.name,
                email: cadastro.email,
                phone_number: cadastro.phone_number,
                cpf: cadastro.cpf,
                password_hash: cadastro.senha
            }
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
        }else{
            alert("As senhas nao conferem! Coloque as senhas iguais ;-)")
        }
    }
    return(
        <>
            <Conteiner>
                <h1>Rifas Rio Amazonas</h1>
                <Forms>
                    <form onSubmit={Cadastro}>
                        <Inserir id="name" placeholder="Nome" value={cadastro.name} onChange={(e)=>
                        setCadastro({...cadastro, name: e.target.value})
                        }/>
                        <Inserir id="email" type="email" placeholder="Email" value={cadastro.email} onChange={(e)=>
                        setCadastro({...cadastro, email: e.target.value})
                        }/>
                        <Inserir id="phone_number" type="phone" placeholder="celular" value={cadastro.phone_number} onChange={(e)=>
                        setCadastro({...cadastro, phone_number: e.target.value})
                        }/>
                        <Inserir id="cpf" type="cpf" placeholder="cpf" value={cadastro.cpf} onChange={(e)=>
                        setCadastro({...cadastro, cpf: e.target.value})
                        }/>
                        <Inserir id="password" type="password" placeholder="Senha" value={cadastro.senha} onChange={(e)=>
                        setCadastro({...cadastro, senha: e.target.value})
                        }/>
                        <Inserir id="confirmPassword" type="password" placeholder="Confirme a senha" value={cadastro.confirmeSenha} onChange={(e)=>
                        setCadastro({...cadastro, confirmeSenha: e.target.value})
                        }/>

                        <Botao type="submit">Cadastar</Botao>
                    </form>
                </Forms>

                <Entrar>
                    <Link href={`/`} style={{ textDecoration: 'none' }}>
                        <h2>Já tem uma conta? Entre agora!</h2>
                    </Link>
                </Entrar>
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
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color:white;
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
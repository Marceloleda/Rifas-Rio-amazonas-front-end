'use client'

import { useState } from "react";
// import { useNavigate } from "react-router";
import styled from "styled-components";
import Swal from "sweetalert2";
import { api, signIn } from "../../services/api";
import Link from "next/link";
import { useRouter } from 'next/navigation';



export default function Login(){
    const router = useRouter();
    const [login, setLogin] = useState({
        email: '',
        password_hash: ''
    })
    function enviarLogin(event){
        event.preventDefault();

        signIn(login)
            .then((response)=>{
            api.defaults.headers["Authorization"] = `Bearer ${response.data.Token}`;

            console.log(response.data)
            localStorage.setItem("token", response.data.Token)
            alert('logado com sucesso')
            router.push("/");
        })
            .catch(err => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "E-mail e/ou senha incorreto(s)",
              });
            console.log(err.message)
        })
    }
    return(
        <>
            <Conteiner>
                <h1>Rifas Rio Amazonas</h1>
                <Forms>
                    <form onSubmit={enviarLogin}>
                        <Inserir  id="email" type="email" placeholder="Email" value={login.email} onChange={(e)=>
                        setLogin({...login, email: e.target.value})
                        }required/>
                        <Inserir id="password" type="password" placeholder="Senha" value={login.password_hash} onChange={(e)=>
                        setLogin({...login, password_hash: e.target.value})
                        }required/>

                        <Botao type="submit">Entrar</Botao>
                        {/* <Botao2 type="submit">Entrar com sua conta Google</Botao2> */}
                    </form>
                </Forms>

                <Cadastro>
                    <Link href={"/sign-up"} style={{ textDecoration: 'none' }}>
                        <h2>Primeira vez? Clique aqui e cadastre-se!</h2>
                    </Link>
                </Cadastro>
            </Conteiner>
        </>
    );
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
const Forms = styled.div`
    form{
            display:flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
        }
`;

const Inserir = styled.input`
    width:330px;
    height: 58px;

    margin-bottom:16px;
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    border-radius: 16px;
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
    margin-bottom:16px;

    background: green;
    border-radius: 15px;
    border:none;
    cursor: pointer;
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    font-family: 'Raleway';
`;
const Botao2 = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 326px;
    height: 46px;
    margin-bottom:16px;

    background: blue;
    border-radius: 5px;
    border:none;
    cursor: pointer;
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    text-align: center;
    color: #FFFFFF;
    font-family: 'Raleway';
`;

const Cadastro = styled.div`
    margin-top: 35px;
    h2{
        font-family: 'Raleway';
        color: #333333;
        font-size: 15px;
        font-weight: 700;
    }
`;
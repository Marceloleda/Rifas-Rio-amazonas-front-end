"use client";
import { styled } from "styled-components"
import Image from 'next/image';
import Logo from '../../assets/images/logo.png'
import Link from "next/link";

export default function Header(){
    let TOKEN;
    if (typeof window !== 'undefined') {
        TOKEN = localStorage.getItem('token');
     }    
    return (
        <Conteiner>
            <Image
               src={Logo} 
               alt="Logo"
               width={75} 
               height={75} 
            />
            <h1>Rifas Rio Amazonas</h1>
                {TOKEN? 
                <Link href="/seller" style={{ textDecoration: 'none' }}><h2>Meu Painel</h2></Link> :

                <Link href="/auth-login" style={{ textDecoration: 'none' }}>
                    <h2>Login</h2>
                </Link>
                }
        </Conteiner>
    )
}
const Conteiner = styled.div`
    background-color: #ff847c; 
    box-sizing: border-box;
    width: 100%;
    padding: 15px;
    display: flex; 
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    h1{
        font-family: 'Nunito', sans-serif;
        font-size: 60px; 
    }
    h2{
        font-size: 25px; 
        color: black; 
    }

`;
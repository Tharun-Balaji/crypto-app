import React from 'react'
import { Link } from 'react-router-dom'
import logoSVG from "../assets/logo.svg";

export default function Logo() {
  return (
    <Link to = "/" className=' absolute top-[1.5rem] left-[1.5rem] [text-decoration:none] text-lg text-cyan flex items-center' >
      <img src= {logoSVG} alt="CryptoVerse"  />
      <span>CryptoVerse</span>
    </Link>
  )
}

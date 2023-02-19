import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Add() {

  const [book, setBook] = useState({
    title: "",
    cover: "",
    price: null,
    desc: ""
  })

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/books', book)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='form'>
      <h1>Add new books</h1>
      <input type="text" placeholder='title' onChange={handleChange} name='title' />
      <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
      <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
      <input type="number" placeholder='price' onChange={handleChange} name='price' />
      <button className='formButton' onClick={handleClick}>Add Book</button>
    </div>
  )
}

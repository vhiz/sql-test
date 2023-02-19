import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Update() {

  const navigate = useNavigate()

  const location = useLocation()
  const bookId = location.pathname.split('/')[2]
  const [book, setBook] = useState({
    title: "",
    cover: "",
    price: null,
    desc: ""
  })

  const [aBooks, setABooks] = useState([])
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/books/${bookId}`)
        setABooks(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchAll()
  }, [bookId])

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }





  const handleClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:3001/books/${bookId}`, book)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='form'>
      <h1>Update Book</h1>
      <input type="text" placeholder='title' onChange={handleChange} name='title' />
      <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
      <input type="text" placeholder='cover' onChange={handleChange} name='cover' />
      <input type="number" placeholder='price' onChange={handleChange} name='price' />
      <button className='formButton' onClick={handleClick}>Update Book</button>
    </div>
  )
}

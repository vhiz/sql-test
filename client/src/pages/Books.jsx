import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Books() {

    const [books, setBooks] = useState([])
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await axios.get('http://localhost:3001/books')
                setBooks(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAll()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/books/${id}`)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h1>
                Control Books Store
            </h1>
            <div className="books">
                {books.map(book => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt='' />}
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <button className="delete" onClick={() => { handleDelete(book.id) }}>Delete</button>
                        <button className="update"> <Link to={`/update/${book.id}`} style={{ textDecoration: "none" }}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button><Link to={'/add'}>Add new book</Link></button>
        </div>
    )
}

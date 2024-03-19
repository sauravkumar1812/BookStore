import React from 'react'
import { Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/CreateBooks'
import DeleteBook from './pages/DeleteBook'
import Edit from './pages/Edit'
import ShowBook from './pages/ShowBook'


const App = () => {
  return (
    <Routes>
      <Route path ="/" element = {<Home/>} />
      <Route path ="/books/create " element = {<CreateBook/>} />
      <Route path ="/books/details/:id" element = {<ShowBook/>} />
      <Route path ="/books/edit/:id" element = {<Edit/>} />
      <Route path =" /books/delete/:id" element = {<DeleteBook/>} />
    </Routes>
  )
}

export default App
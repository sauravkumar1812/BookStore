import React, { useState,useEffect } from "react";
import BackButton from "../components/button";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate , useParams} from "react-router-dom";

const DeleteBook = () => {
  const [loading,setLoding] = useState(false);
  const navigate = useNavigate();
    const {id} = useParams();
    const handDeleteBook = () => {
     setLoding(true);
     axios
     .delete(`http://localhost:4519/books/${id}`)
     .then( ( ) => {
      setLoding(false);
      navigate('/');
     })
     .catch((error) => {
      alert("An error happend , please check it");
      console.log(error);
     });
    };   
  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner/> :''}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure want to delete this book?</h3>
       <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handDeleteBook}>
        yes, Delete it...
       </button>
      </div>
    </div>
  )
}

export default DeleteBook
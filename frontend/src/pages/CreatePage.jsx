import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../libs/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData( prev => ({
      ...prev,
      [name]:value
    }))
  }
  function handleInputClear () {
    setFormData({ title: '', content: '' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.title.trim() || !formData.content.trim()){
      toast.warn("All fields are required!");
      return;
    }
      try {
        await api.post('/notes/',formData);
        toast.success("Note created successfully.")
        setTimeout(() => navigate('/'), 1500);
        setFormData({ title: '', content: '' });
      } catch (error) {
        toast.error("Failed to create note.");
      }
  }
  return (
    <form>
      <motion.div
        initial={{opacity:0, scale:1, x:300}}
        animate={{opacity:1, scale:1, x:0, transition:{duration:0.75,delay:0.25,type:'spring',stiffness:120}}}
        className='container-fluid row mx-auto mt-5 bg-gold rounded-5 col-11 col-sm-9 col-md-8 col-xl-6  p-5 '
      >
        <h1 className='text-center mb-5'>Create a new Note</h1>
        <div className="input-group input-group-sm mb-4 col-12 col-md-6">
          <input type="text" value={formData.title} onChange={ e => handleInput(e)} name='title' className="form-control" placeholder='Title here' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div className=" mb-3 ">
            <textarea value={formData.content} onChange={ e => handleInput(e)} name='content' className="form-control" placeholder='Content here' rows="3"></textarea>
        </div>
        <div className='d-flex gap-3 justify-content-center mt-3'>
          <button className="btn btn-primary fs-6 py-2 px-3" type='submit' onClick={e => handleSubmit(e)}>Create</button>
          <button className="btn btn-secondary fs-6 py-2 px-3" type='button' onClick={handleInputClear}>Clear</button>
        </div>
      </motion.div>
      <ToastContainer position="top-center" autoClose={1000} />
    </form>
  );
}
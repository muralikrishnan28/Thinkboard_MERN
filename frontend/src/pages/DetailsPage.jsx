import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import api from '../libs/axios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DetailedPage() {
  const navigate = useNavigate()
  const location = useLocation();
  const noteData = location.state.note || {};
  const [formData, setFormData] = useState({
    title: noteData.title,
    content: noteData.content
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData( prev => ({
      ...prev,
      [name]:value
    }))
  }
  const handleUpdate = async (id) => {
    if(!formData.title.trim() || !formData.content.trim()){
      toast.warn("All fields are required to update. !");
      return ;
    }
    try {
      await api.put(`/notes/${id}`, formData);
      toast.success("Note updated successfully.");
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      toast.error("Failed to update. !");
    }
  }
  async function handleDelete (id) {
    try{
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully.");
      setTimeout(() => navigate('/'), 1500);
    } catch {
      toast.error("Failed to delete. !");
    }
  }

  return (
    <div className='container-fluid col-md-8'>
      <div className="container-fluid mt-4 d-flex justify-content-between gap-3">
        <NavLink to={'/'} className='text-decoration-none'>
          <p className='btn btn-secondary p-2  fw-normal'><i className="bi bi-arrow-left me-2"></i>Back</p>
        </NavLink>
        <p className='btn btn-danger ' title='Delete Note' onClick={() => handleDelete(noteData._id)}>
          <i className="bi bi-trash fs-5"></i>
        </p>
      </div>
      <motion.div
        initial={{opacity:0, scale:1, x:300}}
        animate={{opacity:1, scale:1, x:0, transition:{duration:0.75,delay:0.25,type:'spring',stiffness:120}}}
        className='container-md row mx-auto mt-3 bg-gold rounded-5 p-5 '
      >
        <h1 className='text-center mb-5'>Edit note</h1>
        <span>Title:</span>
        <div className="input-group input-group-sm mb-3 col-12 col-md-6">
          <input type="text" value={formData.title} onChange={ e => handleInput(e)} name='title' className="form-control mt-2" placeholder='Title here' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div className=" mb-3 ">
            <label htmlFor="content" className="form-label">Content:</label>
            <textarea value={formData.content} onChange={ e => handleInput(e)} name='content' className="form-control" placeholder='Content here' id="content" rows="3"></textarea>
        </div>
        <div className="container-fluid d-flex justify-content-end gap-3">
          <button className="btn btn-primary mb-3" type='submit' onClick={() => handleUpdate(noteData._id)}>Update</button>
        </div>
      </motion.div>
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
}

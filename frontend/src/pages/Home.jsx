import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import Notes from '../components/Notes';
import Loading from'../components/Loading';
import api from '../libs/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Home() {
  const [notes,setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiCall = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load. !");
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    apiCall()
  },[]);

  async function handleDelete (id) {
    try{
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully.");
      setTimeout(() => apiCall(), 1000);
    } catch {
      toast.error("Failed to delete. !");
    }
  }

  return (
    <main className="container-fluid p-5">
      <AnimatePresence mode='wait'>
        {!loading ? <motion.div
          key="notes"
          initial={{ scale:0.8 }}
          animate={{ scale:1, transition: {duration:0.75} }}
          exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
          className='mt-5 row'
        >
          { notes.length > 0 ? (
            notes.map((note,index) =>(
                <Notes note={note} index={index} key={index} handleDelete={handleDelete} />
            ))) :
            <div className="mx-auto col-12 col-md-8 col-xxl-6 d-flex d-flex align-items-center justify-content-center my-auto ">
              <div className='text-center'>
                <h1 className="text-warning">No notes to display :(</h1>
                <span className='display-1'>📄</span> <br />
                <NavLink to={'/create'} className="btn btn-success mt-4"> Create Note ✒️</NavLink>
              </div>
            </div>
          }
        </motion.div>
        : <motion.div
          key="loading"
          exit={{opacity:0, y:50, transition:{duration:0.5}}}
        >
          <Loading />
        </motion.div>}
      </AnimatePresence>
      <ToastContainer position="top-center" autoClose={1000} />
    </main>
  );
}

import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FullDateConverstion } from '../libs/DateConverstion.js';

export default function Notes({ note, handleDelete }) {
  return (
    <div className="col-11 col-md-6 col-xl-4 mb-4">
      <motion.div
        initial={{y:'100vh', opacity:0 }}
        animate={{opacity:1, y:0, transition:{duration:0.5, type:'tween', stiffness:100}}}
        className='col-12 bg-iced p-2 p-sm-4 display-content rounded'
      >
        <h1 className='h1 text-capitalize fw-normal text-secondary mb-3'>{note.title}</h1>
        <p className='h6 mb-5 text-muted'>{note.content}</p>
        <div className='d-flex align-items-center justify-content-between gap-2 gap-sm-3 gap-md-5 p-0'>
          <p className='fs-6 p-2 badge fw-light m-0 bg-light text-black mb-2 mb-sm-0'>{FullDateConverstion(note.createdAt)}</p>
          <div>
            <motion.p
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className='fs-6 badge text-bg-light me-2 me-sm-3 m-0 p-1 mb-2 mb-sm-0'
              >
              <NavLink to={'/details'} title='Edit' state={{ note }} className="text-white text-decoration-none" ><i className="bi bi-pen text-primary fs-3"></i></NavLink>
            </motion.p>
            <motion.p
              whileHover={{scale:1.1}}
              whileTap={{scale:0.9}}
              className='fs-6 badge text-bg-light m-0 p-1 mb-2 mb-sm-0' title='Delete Note' onClick={() => handleDelete(note._id)}>
              <i className="bi bi-trash text-danger fs-3"></i>
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
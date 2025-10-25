import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <header className='bg-iced'>
      <nav className="d-flex flex-sm-row flex-column align-items-center justify-content-between px-5 py-2">
        <div>
          <NavLink to={'/'} className='text-decoration-none'>
            <h2 className='pt-2 text-primary fw-normal'>Thinkboard</h2>
          </NavLink>
        </div>
        <motion.div
          whileHover={{ scale:1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <NavLink to={'create'} className='btn bg-gold text-white pb-2 fs-6 text-decoration-none' >Create Note</NavLink>
        </motion.div>
      </nav>
    </header>
  );
}

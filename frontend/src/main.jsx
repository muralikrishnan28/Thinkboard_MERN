import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import DetailedPage from './pages/DetailsPage';
import CreatePage from './pages/CreatePage';
import Error from './components/Error';

const router = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        errorElement:<Error />,
        children:[
            { index: true, element:<Home /> },
            { path:'/:id', element:<DetailedPage /> },
            { path:'/create', element:<CreatePage /> }
        ]
    }
])


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)

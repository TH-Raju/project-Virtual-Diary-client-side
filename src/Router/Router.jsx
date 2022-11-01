import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Note from "../components/Note";
import Update from "../components/Update";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/users')
    },
    {
        path: '/note',
        element: <Note></Note>
    }, {
        path: '/update/:id',
        element: <Update></Update>,
        loader: ({ params }) => fetch(`http://localhost:5000/users/${params.id}`)
    }
])
export default router;
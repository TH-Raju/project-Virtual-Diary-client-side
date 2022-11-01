import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Note from "../components/Note";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home></Home>
    },
    {
        path: '/note',
        element: <Note></Note>
    }
])
export default router;
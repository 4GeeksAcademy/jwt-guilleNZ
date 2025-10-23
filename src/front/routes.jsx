import { createBrowserRouter } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Single from "./pages/Single";
import Login from "./pages/Login";
import Private from "./pages/Private";
import CreateUser from "./pages/CreateUser";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/demo",
                element: <Demo />
            },
            {
                path: "/single",
                element: <Single />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <CreateUser />
            },
            {
                path: "/private",
                element: <Private />
            }
        ]
    }
]);

export default router;
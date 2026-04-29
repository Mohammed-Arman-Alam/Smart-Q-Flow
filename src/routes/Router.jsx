import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import PatientRegistration from "../pages/PatientRegistration/PatientRegistration";

const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children:[
            {
                index: true,
                Component: Home,
            },
            {
                path:'/register',
                Component: PatientRegistration,
            }
        ]
    }
])

export default router;
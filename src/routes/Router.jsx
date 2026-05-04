import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import PatientRegistration from "../pages/PatientRegistration/PatientRegistration";
import CentralDesk from "../pages/CentralDesk/CentralDesk";
import PatientStatus from "../pages/PatientStatus/PatientStatus";
import Register from "../pages/Register/Register";

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
            },
            {
                path:'/central-desk',
                Component: CentralDesk,
            },
            {
                path:'/trial',
                Component: PatientStatus,
            },
            {
                path: '/register-user',
                Component: Register,
            }
        ]
    }
])

export default router;
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import PatientRegistration from "../pages/PatientRegistration/PatientRegistration";
import CentralDesk from "../pages/CentralDesk/CentralDesk";

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
            }
        ]
    }
])

export default router;
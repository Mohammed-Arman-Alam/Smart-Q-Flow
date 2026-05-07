import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import PatientRegistration from "../pages/PatientRegistration/PatientRegistration";
import CentralDesk from "../pages/CentralDesk/CentralDesk";
import PatientStatus from "../pages/PatientStatus/PatientStatus";
import Register from "../pages/Register/Register";
import DoctorManager from "../pages/DoctorManager/DoctorManager";
import DoctorRoom from "../pages/DoctorRoom/DoctorRoom";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import PublicDisplay from "../pages/PublicDisplay/PublicDisplay";

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
            },
            {
                path: '/doctor-manager',
                Component: DoctorManager,
            },
            {
                path: '/doctor-room',
                Component: DoctorRoom,
            },
            {
                path: '/admin',
                Component: AdminPanel,
            },
            {
                path: '/display',
                Component: PublicDisplay,
            }
            
        ]
    }
])

export default router;
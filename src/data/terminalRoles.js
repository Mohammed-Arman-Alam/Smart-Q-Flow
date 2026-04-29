import {
  FaUserPlus,
  FaTasks,
  FaUserMd,
  FaStethoscope,
  FaTv,
  FaChartLine,
  FaPlayCircle
} from "react-icons/fa";

export const terminalRoles = [
  {
    id: "registration_counter",
    title: "Registration Counter",
    description: "Register new patients and issue general tickets",
    icon: FaUserPlus,
    route: "/register"
  },
  {
    id: "central_desk",
    title: "Central Desk",
    description: "Assign patients to specific doctor rooms",
    icon: FaTasks,
    route: "/central-desk"
  },
  {
    id: "doctor_manager",
    title: "Doctor Manager",
    description: "Manage queues for up to 2 rooms",
    icon: FaUserMd,
    route: "/doctor-manager"
  },
  {
    id: "doctor_room",
    title: "Doctor Room",
    description: "View and call patients for consultation",
    icon: FaStethoscope,
    route: "/doctor-room"
  },
  {
    id: "public_display",
    title: "Public Display",
    description: "Wall-mounted display for the waiting hall",
    icon: FaTv,
    route: "/display"
  },
  {
    id: "admin_dashboard",
    title: "Admin Dashboard",
    description: "Live hospital-wide summary",
    icon: FaChartLine,
    route: "/admin"
  },
  {
    id: "trial_mode",
    title: "Trial Mode",
    description: "Walk through the full patient journey from register to visit complete",
    icon: FaPlayCircle,
    route: "/trial"
  }
];
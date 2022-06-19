import Index from "views/Index.jsx";
import Login from "views/pages/Login.jsx";
var routes = [{
        path: "/index",
        name: "Inicio",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/admin"
    },
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth"
    }
];
export default routes;
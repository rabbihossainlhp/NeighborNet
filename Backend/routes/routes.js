const authRouter = require('./auth.route');



const routes = [
    {
        path:'/api/auth',
        handler:authRouter
    }
]


const useRoute = (app)=>{
    routes.map(route=>{
        app.use(route.path, route.handler);
    })
}


module.exports = useRoute;


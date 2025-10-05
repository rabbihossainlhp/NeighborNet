const authRouter = require('./auth.route');
const profileRouter = require('./profile.route');
const messageRouter = require('./message.route');



const routes = [
    {
        path:'/api/auth',
        handler:authRouter
    },
    {
        path:'/api/profile',
        handler:profileRouter
    },
    {
        path:'/api/message',
        handler:messageRouter
    }
]


const useRoute = (app)=>{
    routes.map(route=>{
        app.use(route.path, route.handler);
    })
}


module.exports = useRoute;






const routes = [
    {
        path:'api/auth',
        handler:
    }
]


const useRoute = (app)=>{
    routes.map(route=>{
        app.use(route.path, route.handler);
    })
}


module.exports = useRoute;
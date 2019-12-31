import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router);

//Instantiate router
const router = new Router({
    mode : 'history',
    base: process.env.BASE_URL,
    routes
   });

//MIDDLEWARE
// Middleware helper function
function nextCheck(context, middleware, index){
    const nextMiddleware = middleware[index];
    if(!nextMiddleware) return context.next;

    return (...parameters) => {
        context.next(...parameters);
        const nextMidd = nextCheck(context, middleware, index+1);

        nextMiddleware({...context, nextMidd});
    }
}

//Append Middleware
router.beforeEach((to, from, next) => {
    if(to.meta.middleware){
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware] ;

        const context = { to, from, next, router }

        const nextMiddleware = nextCheck(context, middleware, 1)
        return middleware[0]({...context, nextMiddleware});

    }
    return next();
})


export default router;
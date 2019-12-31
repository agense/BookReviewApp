export default function auth({next, router}){
    if(!localStorage.getItem('auth')){
        return router.push({name: 'login'});
    }
    return next();
 }
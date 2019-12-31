export default function guest({next, router}){
    if(localStorage.getItem('auth')){
        return router.push({name: 'home'});
    }
    return next();
 }
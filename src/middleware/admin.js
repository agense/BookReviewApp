export default function admin({next, router}){
    const auth = JSON.parse(localStorage.getItem("auth"));
    if(!auth){
        return router.push({name: 'login'});
    }else if(auth.user.role !== 'admin'){
        return router.push({name: 'unauthorized'});
    }else{
        return next();
    }
 }
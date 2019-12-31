import Middleware from '../middleware/index'

const routes =  [
    //Authentication Routes
    { 
        path: '/login',
        name: 'login', 
        component: () => import('../views/auth/Login.vue'),
        meta:{
            middleware: [Middleware.guest],
            title: 'Login'
        }
    },
    { 
        path: '/signup', 
        name: 'signup', 
        component: () => import('../views/auth/Signup.vue'),
        meta:{
            middleware: [Middleware.guest],
            title: 'New Account'
        }
    },
    { 
        path: '/forgot-password', 
        name: 'forgot-password', 
        component: () => import('../views/auth/ForgotPassword.vue'),
        meta:{
            middleware: [Middleware.guest],
            title: 'Forgot Password'
        }
    },
    { 
        path: '/reset-password', 
        name: 'reset-password', 
        component: () => import('../views/auth/ResetPassword.vue'),
        meta:{
            middleware: [Middleware.guest],
            title: 'ResetPassword'
        }
    },

    //Book Routes
    { 
        path: '/books/add', 
        name: 'add_book', 
        component: () => import('../views/AddBook.vue'),
        meta:{
            middleware: [Middleware.auth],
            title: 'Add A Book'
        }
    },
    { 
        path: '/books/edit/:id(\\d+)', 
        name: 'edit_book', 
        component: () => import('../views/EditBook.vue'),
        meta:{
            middleware: [Middleware.auth],
            title: 'Edit Book'
        }
    },
    { 
        path: '/books/:id(\\d+)', 
        name: 'book', 
        component: () => import('../views/Book.vue'),
        meta:{
            title: 'Book'
        }
    },
    { 
        path: '/books', 
        name: 'books', 
        component: () => import('../views/Books.vue'),
        meta:{
            title: 'Books'
        }
    },    

    //Member Account Management
    { 
        path: '/members/account', 
        name: 'member_account', 
        component: () => import('../views/MemberAccount.vue'),
        meta:{
            middleware: [Middleware.auth],
            title: 'Member Account'
        } 
    },    

    //Admin Routes
    { 
        path: '/admin/authors', 
        name: 'manage_authors', 
        component: () => import('../views/Admin/AdminAuthors.vue'),
        meta:{
            middleware: [Middleware.admin],
            title: 'Admin'
        }  
    },
    { 
        path: '/admin/genres', 
        name: 'manage_genres', 
        component: () => import('../views/Admin/AdminGenres.vue'),
        meta:{
            middleware: [Middleware.admin],
            title: 'Admin'
        } 
    },
    { 
        path: '/admin/books', 
        name: 'manage_books', 
        component: () => import('../views/Admin/AdminBooks.vue'),
        meta:{
            middleware: [Middleware.admin],
            title: 'Admin'
        } 
    },
    { 
        path: '/admin/reviews', 
        name: 'manage_reviews', 
        component: () => import('../views/Admin/AdminReviews.vue'),
        meta:{
            middleware: [Middleware.admin],
            title: 'Admin'
        }  
    },
    { 
        path: '/admin/members', 
        name: 'manage_members', 
        component: () => import('../views/Admin/AdminManageMembers.vue'),
        meta:{
            middleware: [Middleware.admin],
            title: 'Admin'
        }  
    },
    { 
        path: '/admin', 
        name: 'admin_dashboard', 
        component: () => import('../views/Admin/AdminDashboard.vue'),
        meta:{
            middleware: [Middleware.admin],
            title: 'Admin'
        } 
    },
    
    //Helper Routes
    { 
        path: '/', 
        name: 'home', 
        component: () => import('../views/LandingPage.vue')
    },
    { 
        path: '/unauthorized', 
        name: 'unauthorized', 
        component: () => import('../views/Unauthorized.vue') 
    },
    { 
        path: '/*', 
        name: 'not_found', 
        component: () => import('../views/NotFound.vue')
    },

]
export default routes;
export default [
    {
        name: 'Master',
        path: '/',
        component: () => import('../pages/layout/master'),
        redirect: '/dashboard',
        children: [
            {
                name:'dashboard',
                path: '/dashboard',
                component: () => import('../pages/dashboard'),
            },
            {
                name:'Mahasiswa',
                path: '/Mahasiswa',
                component: () => import('../pages/Mahasiswa'),
            },
            {
                name:'product',
                path: '/product',
                component: () => import('../pages/product'),
            },
            {
                name:'customer',
                path: '/customer',
                component: () => import('../pages/customer'),
            },
            {
                name:'contact',
                path: '/contact',
                component: () => import('../pages/contact'),
            },
            {
                name:'setting',
                path: '/setting',
                component: () => import('../pages/setting'),
            },
        ]
    },
]

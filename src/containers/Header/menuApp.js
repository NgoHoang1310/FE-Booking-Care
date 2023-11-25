export const adminMenu = [
    { //hệ thống
        name: 'admin.account.header', menus: [
            // {
            //     name: 'admin.account.manage-Admin',

            //     // subMenus: [
            //     //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //     //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },
            //     // ]
            // },
            {
                name: 'admin.account.manage-User',
                link: '/system/user-manage',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'admin.account.manage-User-Redux',
                link: '/system/user-redux',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'admin.account.manage-Doctor',
                link: '/system/manage-doctor',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'doctor.manage-schedule',
                link: '/doctor/manage-schedule',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'doctor.manage-patient',
                link: '/doctor/manage-patient',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },
                // ]
            },
        ]
    },
    { //hệ thống
        name: 'admin.clinic.header', menus: [
            {
                name: "admin.clinic.header",
                link: '/system/manage-clinic',
            }


        ]
    },
    { //hệ thống
        name: 'admin.specialty.header',
        menus: [
            {
                name: "admin.specialty.header",
                link: '/system/manage-specialty',
            }

        ]
    },
    { //hệ thống
        name: 'admin.handbook.header', menus: [
            {
                name: "admin.handbook.header",
                link: '/system/manage-handbook',
            }

        ]
    },
];

export const doctorMenu = [
    { //hệ thống
        name: 'doctor.title',
        menus: [
            {
                name: 'doctor.manage-schedule',
                link: '/doctor/manage-schedule',
            },
            {
                name: 'doctor.manage-patient',
                link: '/doctor/manage-patient',
            }
        ]

        // subMenus: [
        //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //     { name: 'menu.system.system-administrator.product-manage', link: '/system/user-redux' },
        // ]
    },

];
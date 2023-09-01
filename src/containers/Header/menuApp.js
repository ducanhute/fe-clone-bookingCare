export const adminMenu = [
    {
        //quản lý người dủng
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.admin.crud",
                link: "/system/user-manage",
            },
            {
                name: "menu.admin.crud-redux",
                link: "/system/user-redux",
            },
            {
                name: "menu.admin.manage-doctor",
                link: "/system/manage-doctor",
            },
            {
                name: "menu.doctor.manage-schedule",
                link: "/doctor/manage-schedule",
            },
        ],
    },
    {
        //quản lý phòng khám
        name: "menu.admin.clinic",
        menus: [
            {
                name: "menu.admin.manage-clinic",
                link: "/system/manage-clinic",
            },
        ],
    },
    {
        //quản lý chuyên khoa
        name: "menu.admin.specialty",
        menus: [
            {
                name: "menu.admin.manage-specialty",
                link: "/system/manage-specialty",
            },
        ],
    },
    {
        //quản lý cẩm nang
        name: "menu.admin.handBook",
        menus: [
            {
                name: "menu.admin.manage-handBook",
                link: "/system/manage-handBook",
            },
        ],
    },
];

export const doctorMenu = [
    {
        // Kế hoạch khám bệnh của bác sĩ
        name: "menu.admin.manage-user",
        menus: [
            {
                name: "menu.doctor.manage-schedule",
                link: "/doctor/manage-schedule",
            },
        ],
    },
];

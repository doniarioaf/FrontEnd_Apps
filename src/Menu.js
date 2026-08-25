import * as pathmenu           from './containers/shared/pathMenu';
import * as permissionmenu from './containers/shared/permissionMenu';
const handleMenu = () => {
    let listMenu = [
        {
            heading: 'Main Navigation',
            translate: 'sidebar.heading.HEADER'
        },
        {
            name: 'Administrator',
            icon: 'icon-user',
            translate: 'label_ADMINISTRAOTR',
            // label: { value: 3, color: 'success' },
            submenu:[
                {
                    name: 'Company',
                    path: pathmenu.menucompany,
                    translate: 'label_COMPANY',
                    permission:permissionmenu.MenuCompany,
                },
                {
                    name: 'Branch',
                    path: pathmenu.menuBranch,
                    translate: 'label_BRANCH',
                    permission:permissionmenu.MenuBranch,
                },{
                    name: 'Role',
                    path: pathmenu.menuRole,
                    translate: 'Role',
                    permission:permissionmenu.MenuRole,
                },
                
            ]
        },
        {
            name: 'Master',
            icon: 'icon-user',
            translate: 'Master',
            submenu:[
                {
                    name: 'Area',
                    path: pathmenu.menuarea,
                    translate: 'Category Product',
                    permission:permissionmenu.MenuCategoryProduct,
                },
                {
                    name: 'Category Product',
                    path: pathmenu.menuCategoryProduct,
                    translate: 'Category Product',
                    permission:permissionmenu.MenuCategoryProduct,
                },
                {
                    name: 'Customer',
                    path: pathmenu.menuCustomer,
                    translate: 'Customer',
                    permission:permissionmenu.MenuCustomer,
                },
                {
                    name: 'Inventory',
                    path: pathmenu.menuInventori,
                    translate: 'Inventory',
                    permission:permissionmenu.MenuInventori,
                },
                {
                    name: 'Mapping Stock',
                    path: pathmenu.menumappingstock,
                    translate: 'Mapping Stock',
                    permission:permissionmenu.MenuMappingStock,
                },
                {
                    name: 'Product',
                    path: pathmenu.menuProduct,
                    translate: 'Product',
                    permission:permissionmenu.MenuProduct,
                },
                {
                    name: 'Parameter',
                    path: pathmenu.menuParameter,
                    translate: 'Parameter',
                    permission:permissionmenu.MenuParameterClient,
                },
                {
                    name: 'Vendor',
                    path: pathmenu.menuVendor,
                    translate: 'Parameter',
                    permission:permissionmenu.MenuVendor,
                }
            ]
        },
        {
            name: 'Cargo',
            icon: 'icon-user',
            translate: 'Cargo',
            submenu:[
                {
                    name: 'Cargo',
                    path: pathmenu.menucargo,
                    translate: 'Cargo',
                    permission:permissionmenu.MenuCargo,
                },
                {
                    name: 'Lprn Tagihan Cargo',
                    path: pathmenu.menuReportStatusTagihanCargo,
                    translate: 'Lprn Tagihan Cargo',
                    permission:permissionmenu.MenuReportStatusTagihanCargo,
                },
            ]
        },
        {
            name: 'Stock',
            icon: 'icon-user',
            translate: 'Stock',
            submenu:[
                {
                    name: 'Stock Adjusment',
                    path: pathmenu.menustockadjusment,
                    translate: 'Stock Adjusment',
                    permission:permissionmenu.MenuStockAdjusment,
                },{
                    name: 'Lprn Stock H&M',
                    path: pathmenu.menuReportStockUdangHidupMati,
                    translate: 'Lprn Stock H&M',
                    permission:permissionmenu.MenuReportStockUdangHidpuDanMati,
                },
                {
                    name: 'Rekap Brg Masuk',
                    path: pathmenu.menuReportRekapBarangMasuk,
                    translate: 'Rekapan Barang Masuk Harian',
                    permission:permissionmenu.MenuReportRekapanBarangMasuk,
                },
                {
                    name: 'Lprn Kartu Stock',
                    path: pathmenu.menuReportKartuStock,
                    translate: 'Lprn Kartu Stock',
                    permission:permissionmenu.MenuReportKartuStock,
                },
            ]
        },
        {
            name: 'Pembelian',
            icon: 'icon-user',
            translate: 'Pembelian',
            submenu:[
                {
                    name: 'Deposit',
                    path: pathmenu.menudeposit,
                    translate: 'Deposit',
                    permission:permissionmenu.MenuDeposit,
                },
                {
                    name: 'Pinjaman',
                    path: pathmenu.menuPinjaman,
                    translate: 'Pinjaman',
                    permission:permissionmenu.MenuPinjaman,
                },
                {
                    name: 'Input Penerimaan Barang',
                    path: pathmenu.menudraftpurchasereceive,
                    translate: 'Input Penerimaan Barang',
                    permission:permissionmenu.MenuDraftPurchaseReceive,
                },
                {
                    name: 'Nota Pembelian',
                    path: pathmenu.menupurchasereceive,
                    translate: 'Nota Pembelian',
                    permission:permissionmenu.MenuPurchaseReceive,
                },
                {
                    name: 'Komisi',
                    path: pathmenu.menukomisi,
                    translate: 'Komisi',
                    permission:permissionmenu.MenuKomisi,
                },
                {
                    name: 'Lprn Pembelian',
                    path: pathmenu.menureportpurchasereceive,
                    translate: 'Lprn Pembelian',
                    permission:permissionmenu.MenuReportPurchaseReceive,
                },

                {
                    name: 'Lprn Kartu Deposit',
                    path: pathmenu.menuReportKartuDeposit,
                    translate: 'Lprn Kartu Deposit',
                    permission:permissionmenu.MenuReportKartuDeposit,
                },
                {
                    name: 'Lprn Kartu Pinjaman',
                    path: pathmenu.menuReportKartuPinjaman,
                    translate: 'Lprn Kartu Pinjaman',
                    permission:permissionmenu.MenuReportKartuPinjaman,
                },

                {
                    name: 'Lprn Komisi',
                    path: pathmenu.menuReportKomisi,
                    translate: 'Lprn Kartu Deposit',
                    permission:permissionmenu.MenuReportKomisi,
                },
                {
                    name: 'Integrasi Saldo',
                    path: pathmenu.integrasiSaldo,
                    translate: 'Integrasi Saldo',
                    permission:permissionmenu.MenuIntegrasi,
                },

            ]
        },
        {
            name: 'Hutang',
            icon: 'icon-user',
            translate: 'Hutang',
            submenu:[
                {
                    name: 'Pelunasan Hutang',
                    path: pathmenu.menupelunasanhutang,
                    translate: 'Packing List',
                    permission:permissionmenu.MenuPelunasanHutang,
                },
                {
                    name: 'Lprn Hutang',
                    path: pathmenu.menuReportHutang,
                    translate: 'Hutang',
                    permission:permissionmenu.MenuReportHutang,
                },
            ]
        },
        {
            name: 'Penjualan',
            icon: 'icon-user',
            translate: 'Penjualan',
            submenu:[
                {
                    name: 'PriceList Harian',
                    path: pathmenu.menupricelist,
                    translate: 'PriceList Harian',
                    permission:permissionmenu.MenuPriceList,
                },
                {
                    name: 'Packing List',
                    path: pathmenu.menupackinglist,
                    translate: 'Packing List',
                    permission:permissionmenu.MenuPackingList,
                },
                {
                    name: 'Cancel Packing List',
                    path: pathmenu.menucancelpackinglist,
                    translate: 'Packing List',
                    permission:permissionmenu.MenuCancelPackingList,
                },
                {
                    name: 'Lprn Cancel Packing List',
                    path: pathmenu.menuReportCancelPackingList,
                    translate: 'Lprn Penjualan',
                    permission:permissionmenu.MenuReportCancelPackingList,
                },
                {
                    name: 'Invoice',
                    path: pathmenu.menuinvoice,
                    translate: 'Invoice',
                    permission:permissionmenu.MenuInvoice,
                },
                {
                    name: 'Lprn Penjualan',
                    path: pathmenu.menuReportPenjualan,
                    translate: 'Lprn Penjualan',
                    permission:permissionmenu.MenuReportPenjualan,
                },
            ]
        },
        {
            name: 'Piutang',
            icon: 'icon-user',
            translate: 'Piutang',
            submenu:[
                {
                    name: 'Pelunasan Piutang',
                    path: pathmenu.menupelunasanpiutang,
                    translate: 'Packing List',
                    permission:permissionmenu.MenuPelunasanPiutang,
                },

                {
                    name: 'Lprn Piutang',
                    path: pathmenu.menuReportPiutang,
                    translate: 'Lprn Piutang',
                    permission:permissionmenu.MenuReportPiutang,
                },
                {
                    name: 'Lprn Pelunasan Piutang',
                    path: pathmenu.menuReportPelunasanPiutang,
                    translate: 'Lprn Pelunasan Piutang',
                    permission:permissionmenu.MenuReportPelunasanPiutang,
                },
            ]
        },
        // {
        //     name: 'Transaksi',
        //     icon: 'icon-user',
        //     translate: 'Transaksi',
        //     submenu:[]
        // },
        {
            name: 'User',
            icon: 'icon-user',
            translate: 'label_USER',
            submenu:[
                {
                    name: 'Internal User',
                    path: pathmenu.menuInternalUser,
                    translate: 'label_INTERNAL_USERR',
                    permission:permissionmenu.MenuInternalUser,
                },
                // {
                //     name: 'User Mobile',
                //     path: pathmenu.menuusermobile,
                //     translate: 'label_MOBILE_USER',
                //     permission:permissionmenu.MenuUserMobile,
                // }
            ]
        },
        {
            name: 'System',
            icon: 'icon-user',
            translate: 'System',
            submenu:[
                {
                    name: 'BackUp DB',
                    path: pathmenu.backUpDB,
                    translate: 'BackUp DB',
                    permission:permissionmenu.MenuBackUpDB,
                }
            ]
        }
        // {
        //     name: 'Transaksi',
        //     icon: 'icon-user',
        //     translate: 'Transaksi',
        //     submenu:[]
        // },
        // {
        //     name: 'Laporan',
        //     icon: 'icon-user',
        //     translate: 'Laporan',
        //     submenu:[]
        // },
       
        // {
        //     name: 'Mobile',
        //     icon: 'icon-user',
        //     translate: 'Mobile',
        //     submenu:[
        //         {
        //             name: 'Call Plan',
        //             path: pathmenu.menucallplan,
        //             translate: 'label_CALL_PLAN',
        //             permission:permissionmenu.MenuCallPlan,
        //         },
        //         {
        //             name: 'Info',
        //             path: pathmenu.menuinfo,
        //             translate: 'label_INFORMATION',
        //             permission:permissionmenu.MenuInformation,
        //         },{
        //             name: 'Monitoring',
        //             path: pathmenu.reportmonitoring,
        //             translate: 'Monitoring',
        //             permission:permissionmenu.MenuMonitoring,
        //         },{
        //             name: 'Monitoring Maps',
        //             path: pathmenu.monitoringmaps,
        //             translate: 'Monitoring Maps',
        //             permission:permissionmenu.MenuMonitoringMaps,
        //         }
        //     ]
        // },
        // {
        //     name: 'Import',
        //     icon: 'icon-note',
        //     translate: 'Import',
        //     submenu:[
        //         {
        //             name: 'Import Customer Call Plan',
        //             path: pathmenu.importcustomercallplan,
        //             translate: 'Import Customer Call Plan',
        //             permission:permissionmenu.MenuUploadCustomerCallPlan,
        //         }
        //     ]
        // }
        // ,
        // {
        //     name: 'Dashboard',
        //     icon: 'icon-speedometer',
        //     translate: 'sidebar.nav.DASHBOARD',
        //     label: { value: 3, color: 'success' },
        //     submenu: [{
        //             name: 'Dashboard v1',
        //             path: '/dashboardv1'
        //         },
        //         {
        //             name: 'Dashboard v2',
        //             path: '/dashboardv2'
        //         },
        //         {
        //             name: 'Dashboard v3',
        //             path: '/dashboardv3'
        //         },
        //         {
        //             name: 'Branch',
        //             path: pathmenu.menuBranch
        //         }
        //     ]
        // },
        // {
        //     name: 'Widgets',
        //     icon: 'icon-grid',
        //     path: '/widgets',
        //     label: { value: 30, color: 'success' },
        //     translate: 'sidebar.nav.WIDGETS'
        // },
        // {
        //     heading: 'Components',
        //     translate: 'sidebar.heading.COMPONENTS'
        // },
        // ,{
        //     name: 'Elements',
        //     icon: 'icon-chemistry',
        //     translate: 'sidebar.nav.element.ELEMENTS',
        //     submenu: [{
        //             name: 'Buttons',
        //             path: '/buttons',
        //             translate: 'sidebar.nav.element.BUTTON'
        //         },
        //         {
        //             name: 'Notifications',
        //             path: '/notifications',
        //             translate: 'sidebar.nav.element.NOTIFICATION'
        //         },
        //         {
        //             name: 'Sweetalert',
        //             path: '/sweetalert'
        //         },
        //         {
        //             name: 'Carousel',
        //             path: '/carousel',
        //             translate: 'sidebar.nav.element.INTERACTION'
        //         },
        //         {
        //             name: 'Spinners',
        //             path: '/spinners',
        //             translate: 'sidebar.nav.element.SPINNER'
        //         },
        //         {
        //             name: 'Dropdown',
        //             path: '/dropdown',
        //             translate: 'sidebar.nav.element.DROPDOWN'
        //         },
        //         {
        //             name: 'Nestable',
        //             path: '/nestable'
        //         },
        //         {
        //             name: 'Sortable',
        //             path: '/sortable'
        //         },
        //         {
        //             name: 'Cards',
        //             path: '/cards',
        //             translate: 'sidebar.nav.element.CARD'
        //         },
        //         {
        //             name: 'Grid',
        //             path: '/grid',
        //             translate: 'sidebar.nav.element.GRID'
        //         },
        //         {
        //             name: 'Grid Masonry',
        //             path: '/grid-masonry',
        //             translate: 'sidebar.nav.element.GRID_MASONRY'
        //         },
        //         {
        //             name: 'Typography',
        //             path: '/typography',
        //             translate: 'sidebar.nav.element.TYPO'
        //         },
        //         {
        //             name: 'IconsFont',
        //             path: '/icons-font',
        //             translate: 'sidebar.nav.element.FONT_ICON',
        //             label: { value: '+400', color: 'success' }
        //         },
        //         {
        //             name: 'IconsWeather',
        //             path: '/icons-weather',
        //             translate: 'sidebar.nav.element.WEATHER_ICON',
        //             label: { value: '+100', color: 'success' }
        //         },
        //         {
        //             name: 'Colors',
        //             path: '/colors',
        //             translate: 'sidebar.nav.element.COLOR'
        //         }
        //     ]
        // },
        // {
        //     name: 'Forms',
        //     icon: 'icon-note',
        //     translate: 'sidebar.nav.form.FORM',
        //     submenu: [{
        //             name: 'Standard',
        //             path: '/form-standard',
        //             translate: 'sidebar.nav.form.STANDARD'
        //         },
        //         {
        //             name: 'Extended',
        //             path: '/form-extended',
        //             translate: 'sidebar.nav.form.EXTENDED'
        //         },
        //         {
        //             name: 'Validation',
        //             path: '/form-validation',
        //             translate: 'sidebar.nav.form.VALIDATION'
        //         },
        //         {
        //             name: 'Wizard',
        //             path: '/form-wizard',
        //         },
        //         {
        //             name: 'Upload',
        //             path: '/form-upload',
        //         },
        //         {
        //             name: 'Cropper',
        //             path: '/form-cropper',
        //         }
        //     ]
        // },
        // {
        //     name: 'Charts',
        //     icon: 'icon-graph',
        //     translate: 'sidebar.nav.chart.CHART',
        //     submenu: [{
        //             name: 'Flot',
        //             path: '/chart-flot',
        //             translate: 'sidebar.nav.chart.FLOT'
        //         },
        //         {
        //             name: 'Radial',
        //             path: '/chart-radial',
        //             translate: 'sidebar.nav.chart.RADIAL'
        //         },
        //         {
        //             name: 'Chartjs',
        //             path: '/chart-chartjs',
        //         },
        //         {
        //             name: 'Morris',
        //             path: '/chart-morris',
        //         },
        //         {
        //             name: 'Chartist',
        //             path: '/chart-chartist',
        //         }
        //     ]
        // },
        // {
        //     name: 'Tables',
        //     icon: 'icon-grid',
        //     translate: 'sidebar.nav.table.TABLE',
        //     submenu: [{
        //             name: 'Standard',
        //             path: '/table-standard',
        //             translate: 'sidebar.nav.table.STANDARD'
        //         },
        //         {
        //             name: 'Extended',
        //             path: '/table-extended',
        //             translate: 'sidebar.nav.table.EXTENDED'
        //         },
        //         {
        //             name: 'Datatable',
        //             path: '/table-datatable',
        //             translate: 'sidebar.nav.table.DATATABLE'
        //         },
        //         {
        //             name: 'Datagrid',
        //             path: '/table-datagrid',
        //         }
        //     ]
        // },
        // {
        //     name: 'Maps',
        //     icon: 'icon-map',
        //     translate: 'idebar.nav.map.MAP',
        //     submenu: [{
        //             name: 'Google',
        //             path: '/map-google',
        //             translate: 'sidebar.nav.map.GOOGLE'
        //         },
        //         {
        //             name: 'Vector',
        //             path: '/map-vector',
        //             translate: 'sidebar.nav.map.VECTOR'
        //         }
        //     ]
        // },
        // {
        //     heading: 'More',
        //     translate: 'sidebar.heading.MORE'
        // },
        // {
        //     name: 'Pages',
        //     icon: 'icon-doc',
        //     translate: 'sidebar.nav.pages.PAGES',
        //     submenu: [{
        //             name: 'Login',
        //             path: '/login',
        //             translate: 'sidebar.nav.pages.LOGIN'
        //         },
        //         {
        //             name: 'Register',
        //             path: '/register',
        //             translate: 'sidebar.nav.pages.REGISTER'
        //         },
        //         {
        //             name: 'Recover',
        //             path: '/recover',
        //             translate: 'sidebar.nav.pages.RECOVER'
        //         },
        //         {
        //             name: 'Lock',
        //             path: '/lock',
        //             translate: 'sidebar.nav.pages.LOCK'
        //         },
        //         {
        //             name: 'Not Found',
        //             path: '/notfound',
        //         },
        //         {
        //             name: 'Error 500',
        //             path: '/error500'
        //         },
        //         {
        //             name: 'Maintenance',
        //             path: '/maintenance'
        //         }
        //     ]
        // },
        // {
        //     name: 'Extras',
        //     icon: 'icon-cup',
        //     translate: 'sidebar.nav.extra.EXTRA',
        //     submenu: [{
        //             name: 'Mailbox',
        //             path: '/mailbox',
        //             translate: 'sidebar.nav.extra.MAILBOX',
        //         },
        //         {
        //             name: 'Bug Tracker',
        //             path: '/bug-tracker'
        //         },
        //         {
        //             name: 'Contact Details',
        //             path: '/contact-details'
        //         },
        //         {
        //             name: 'Contacts',
        //             path: '/contacts'
        //         },
        //         {
        //             name: 'Faq',
        //             path: '/faq'
        //         },
        //         {
        //             name: 'File Manager',
        //             path: '/file-manager'
        //         },
        //         {
        //             name: 'Followers',
        //             path: '/followers'
        //         },
        //         {
        //             name: 'Help Center',
        //             path: '/help-center'
        //         },
        //         {
        //             name: 'Plans',
        //             path: '/plans'
        //         },
        //         {
        //             name: 'Project Details',
        //             path: '/project-details'
        //         },
        //         {
        //             name: 'Projects',
        //             path: '/projects'
        //         },
        //         {
        //             name: 'Settings',
        //             path: '/settings'
        //         },
        //         {
        //             name: 'Social Board',
        //             path: '/social-board'
        //         },
        //         {
        //             name: 'Team Viewer',
        //             path: '/team-viewer'
        //         },
        //         {
        //             name: 'Vote Links',
        //             path: '/vote-links'
        //         },
        //         {
        //             name: 'Timeline',
        //             path: '/timeline',
        //             translate: 'sidebar.nav.extra.TIMELINE'
        //         },
        //         {
        //             name: 'Calendar',
        //             path: '/calendar',
        //             translate: 'sidebar.nav.extra.CALENDAR'
        //         },
        //         {
        //             name: 'Invoice',
        //             path: '/invoice',
        //             translate: 'sidebar.nav.extra.INVOICE'
        //         },
        //         {
        //             name: 'Search',
        //             path: '/search',
        //             translate: 'sidebar.nav.extra.SEARCH'
        //         },
        //         {
        //             name: 'Todo',
        //             path: '/todo',
        //             translate: 'sidebar.nav.extra.TODO'
        //         },
        //         {
        //             name: 'Profile',
        //             path: '/profile',
        //             translate: 'sidebar.nav.extra.PROFILE'
        //         }
        //     ]
        // },
        // {
        //     name: 'Blog',
        //     icon: 'icon-notebook',
        //     submenu: [{
        //             name: 'List',
        //             path: '/blog-list'
        //         },
        //         {
        //             name: 'Post',
        //             path: '/blog-post'
        //         },
        //         {
        //             name: 'Articles',
        //             path: '/blog-articles'
        //         },
        //         {
        //             name: 'Article View',
        //             path: '/blog-article-view'
        //         }
        //     ]
        // },
        // {
        //     name: 'eCommerce',
        //     icon: 'icon-basket-loaded',
        //     submenu: [{
        //             name: 'Orders',
        //             path: '/ecommerce-orders',
        //             label: { value: 10, color: 'success' },
        //         },
        //         {
        //             name: 'Order-view',
        //             path: '/ecommerce-order-view'
        //         },
        //         {
        //             name: 'Products',
        //             path: '/ecommerce-products'
        //         },
        //         {
        //             name: 'Product-view',
        //             path: '/ecommerce-product-view'
        //         },
        //         {
        //             name: 'Checkout',
        //             path: '/ecommerce-checkout'
        //         }
        //     ]
        // },
        // {
        //     name: 'Forum',
        //     icon: 'icon-speech',
        //     path: '/forum'
        // }
    ]

    return listMenu;
}
const Menu = handleMenu();

export default Menu;
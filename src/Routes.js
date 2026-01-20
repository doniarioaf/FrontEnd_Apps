import React, { Suspense, lazy, useEffect } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* loader component for Suspense*/
import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
import * as pathmenu from './containers/shared/pathMenu';

import { useSelector, useDispatch } from 'react-redux';
import { checkUser, authSuccess } from './store/actions';
import { put, call } from 'redux-saga/effects';
import { useHistory } from 'react-router-dom';
import * as key from './containers/shared/constantKey';
import { deleteSessionAndLocalStorage } from './containers/shared/globalFunc';
// import BaseHorizontal from './components/Layout/BaseHorizontal';

/* Used to render a lazy component with react-router */
const waitFor = Tag => props => <Tag {...props} />;

// const DashboardV1 = lazy(() => import('./components/Dashboard/DashboardV1'));
// const DashboardV2 = lazy(() => import('./components/Dashboard/DashboardV2'));
// const DashboardV3 = lazy(() => import('./components/Dashboard/DashboardV3'));

// const Widgets = lazy(() => import('./components/Widgets/Widgets'));

// const Buttons = lazy(() => import('./components/Elements/Buttons'));
// const Notifications = lazy(() => import('./components/Elements/Notifications'));
// const SweetAlert = lazy(() => import('./components/Elements/SweetAlert'));
// const BsCarousel = lazy(() => import('./components/Elements/Carousel'));
// const Spinner = lazy(() => import('./components/Elements/Spinner'));
// const DropdownAnimation = lazy(() => import('./components/Elements/DropdownAnimation'));
// const Nestable = lazy(() => import('./components/Elements/Nestable'));
// const Sortable = lazy(() => import('./components/Elements/Sortable'));
// const Cards = lazy(() => import('./components/Elements/Cards'));
// const Grid = lazy(() => import('./components/Elements/Grid'));
// const GridMasonry = lazy(() => import('./components/Elements/GridMasonry'));
// const Typography = lazy(() => import('./components/Elements/Typography'));
// const FontIcons = lazy(() => import('./components/Elements/FontIcons'));
// const WeatherIcons = lazy(() => import('./components/Elements/WeatherIcons'));
// const Colors = lazy(() => import('./components/Elements/Colors'));

// const ChartFlot = lazy(() => import('./components/Charts/ChartFlot'));
// const ChartRadial = lazy(() => import('./components/Charts/ChartRadial'));
// const ChartChartJS = lazy(() => import('./components/Charts/ChartChartJS'));
// const ChartMorris = lazy(() => import('./components/Charts/ChartMorris'));
// const ChartChartist = lazy(() => import('./components/Charts/ChartChartist'));

// const MapsGoogle = lazy(() => import('./components/Maps/MapsGoogle'));
// const MapsVector = lazy(() => import('./components/Maps/MapsVector'));

// const TableStandard = lazy(() => import('./components/Tables/TableStandard'));
// const TableExtended = lazy(() => import('./components/Tables/TableExtended'));
// const Datatable = lazy(() => import('./components/Tables/DatatableView'));
// const DataGrid = lazy(() => import('./components/Tables/DataGrid'));

// const FormStandard = lazy(() => import('./components/Forms/FormStandard'));
// const FormExtended = lazy(() => import('./components/Forms/FormExtended'));
// const FormValidation = lazy(() => import('./components/Forms/FormValidation'));
// const FormWizard = lazy(() => import('./components/Forms/FormWizard'));
// const FormUpload = lazy(() => import('./components/Forms/FormUpload'));
// const FormCropper = lazy(() => import('./components/Forms/FormCropper'));

// const Login = lazy(() => import('./components/Pages/Login'));
const Register = lazy(() => import('./components/Pages/Register'));
const Recover = lazy(() => import('./components/Pages/Recover'));
const Lock = lazy(() => import('./components/Pages/Lock'));
const NotFound = lazy(() => import('./components/Pages/NotFound'));
const Error500 = lazy(() => import('./components/Pages/Error500'));
const Maintenance = lazy(() => import('./components/Pages/Maintenance'));

// const Mailbox = lazy(() => import('./components/Extras/Mailbox'));
// const Timeline = lazy(() => import('./components/Extras/Timeline'));
// const Calendar = lazy(() => import('./components/Extras/Calendar'));
// const Invoice = lazy(() => import('./components/Extras/Invoice'));
// const Search = lazy(() => import('./components/Extras/Search'));
// const Todo = lazy(() => import('./components/Extras/Todo'));
// const Profile = lazy(() => import('./components/Extras/Profile'));
// const BugTracker = lazy(() => import('./components/Extras/BugTracker'));
// const ContactDetails = lazy(() => import('./components/Extras/ContactDetails'));
// const Contacts = lazy(() => import('./components/Extras/Contacts'));
// const Faq = lazy(() => import('./components/Extras/Faq'));
// const FileManager = lazy(() => import('./components/Extras/FileManager'));
// const Followers = lazy(() => import('./components/Extras/Followers'));
// const HelpCenter = lazy(() => import('./components/Extras/HelpCenter'));
// const Plans = lazy(() => import('./components/Extras/Plans'));
// const ProjectDetails = lazy(() => import('./components/Extras/ProjectDetails'));
// const Projects = lazy(() => import('./components/Extras/Projects'));
// const Settings = lazy(() => import('./components/Extras/Settings'));
// const SocialBoard = lazy(() => import('./components/Extras/SocialBoard'));
// const TeamViewer = lazy(() => import('./components/Extras/TeamViewer'));
// const VoteLinks = lazy(() => import('./components/Extras/VoteLinks'));

// const EcommerceOrder = lazy(() => import('./components/Ecommerce/EcommerceOrders'));
// const EcommerceOrderView = lazy(() => import('./components/Ecommerce/EcommerceOrderView'));
// const EcommerceProduct = lazy(() => import('./components/Ecommerce/EcommerceProducts'));
// const EcommerceProductView = lazy(() => import('./components/Ecommerce/EcommerceProductView'));
// const EcommerceCheckout = lazy(() => import('./components/Ecommerce/EcommerceCheckout'));

// const BlogList = lazy(() => import('./components/Blog/BlogList'));
// const BlogPost = lazy(() => import('./components/Blog/BlogPost'));
// const BlogArticle = lazy(() => import('./components/Blog/BlogArticles'));
// const BlogArticleView = lazy(() => import('./components/Blog/BlogArticleView'));

// const ForumHome = lazy(() => import('./components/Forum/ForumHome'));


const LoginBizz = lazy(() => import('./containers/Page/Login'));
const Logout = lazy(() => import('./containers/Page/Login/Logout'));

const Home = lazy(() => import('./containers/Page/home'));

//admin
const menuBranch = lazy(() => import('./containers/Admin/Branch'));
const addBranch = lazy(() => import('./containers/Admin/Branch/addFormBranch'));
const detailBranch = lazy(() => import('./containers/Admin/Branch/detail'));
const editBranch = lazy(() => import('./containers/Admin/Branch/editFormBranch'));

const menuCompany = lazy(() => import('./containers/Admin/Company'));
const addFormCompany = lazy(() => import('./containers/Admin/Company/addFormCompany'));
const editFormCompany = lazy(() => import('./containers/Admin/Company/editFormCompany'));
const detailCompany = lazy(() => import('./containers/Admin/Company/detail'));

const menuRole = lazy(() => import('./containers/Admin/Role'));
const addFormRole = lazy(() => import('./containers/Admin/Role/addFormRole'));
const detailRole = lazy(() => import('./containers/Admin/Role/detail'));
const editFormRole = lazy(() => import('./containers/Admin/Role/editFormRoles'));

const menuInternalUser = lazy(() => import('./containers/Admin/InternalUser'));
const addInternalUser = lazy(() => import('./containers/Admin/InternalUser/addFormInternalUser'));
const detailInternalUser = lazy(() => import('./containers/Admin/InternalUser/detail'));
const editInternalUser = lazy(() => import('./containers/Admin/InternalUser/editFormInternalUser'));
const changePasswordForm = lazy(() => import('./containers/Admin/InternalUser/changePasswordForm'));


const menuUserMobile = lazy(() => import('./containers/Admin/UserMobile'));
const addUserMobile = lazy(() => import('./containers/Admin/UserMobile/addFormUserMobile'));
const editUserMobile = lazy(() => import('./containers/Admin/UserMobile/editFormUserMobileForm'));
const detailUserMobile = lazy(() => import('./containers/Admin/UserMobile/detail'));

const menuParameter = lazy(() => import('./containers/Parameter/Client'));
const detailMenuParameter = lazy(() => import('./containers/Parameter/Client/detail'));
const addMenuParameter = lazy(() => import('./containers/Parameter/Client/add'));
const editMenuParameter = lazy(() => import('./containers/Parameter/Client/edit'));

const menuCustomer = lazy(() => import('./containers/Master/Customer'));
const addCustomer = lazy(() => import('./containers/Master/Customer/add'));
const detailcustomer = lazy(() => import('./containers/Master/Customer/detail'));
const editcustomer = lazy(() => import('./containers/Master/Customer/edit'));

const menuProduct = lazy(() => import('./containers/Master/Product'));
const addProduct = lazy(() => import('./containers/Master/Product/add'));
const detailProduct = lazy(() => import('./containers/Master/Product/detail'));
const editProduct = lazy(() => import('./containers/Master/Product/edit'));

const menuVendor = lazy(() => import('./containers/Master/Vendor'));
const addVendor = lazy(() => import('./containers/Master/Vendor/add'));
const detailVendor = lazy(() => import('./containers/Master/Vendor/detail'));
const editVendor = lazy(() => import('./containers/Master/Vendor/edit'));

const menuInventori = lazy(() => import('./containers/Master/Inventori'));
const addInventori = lazy(() => import('./containers/Master/Inventori/add'));
const detailInventori = lazy(() => import('./containers/Master/Inventori/detail'));
const editInventori = lazy(() => import('./containers/Master/Inventori/edit'));

const menuCategoryProduct = lazy(() => import('./containers/Master/CategoryProduct'));
const addCategoryProduct = lazy(() => import('./containers/Master/CategoryProduct/add'));
const detailCategoryProduct = lazy(() => import('./containers/Master/CategoryProduct/detail'));
const editCategoryProduct = lazy(() => import('./containers/Master/CategoryProduct/edit'));

const menuMappingStock = lazy(() => import('./containers/Master/MappingStock'));
const addMappingStock = lazy(() => import('./containers/Master/MappingStock/add'));
const detailMappingStock = lazy(() => import('./containers/Master/MappingStock/detail'));
const editMappingStock = lazy(() => import('./containers/Master/MappingStock/edit'));

const menuPriceList = lazy(() => import('./containers/Master/PriceList'));
const addPriceList = lazy(() => import('./containers/Master/PriceList/add'));
const detailPriceList = lazy(() => import('./containers/Master/PriceList/detail'));
const editPriceList = lazy(() => import('./containers/Master/PriceList/edit'));

const menuPurchaseReceive = lazy(() => import('./containers/Transaksi/PurchaseReceive/indexnew'));
const addPurchaseReceive = lazy(() => import('./containers/Transaksi/PurchaseReceive/add'));
const addPrFromTabDpr = lazy(() => import('./containers/Transaksi/PurchaseReceive/addPrFromTabDpr'));
const printNota = lazy(() => import('./containers/Transaksi/PurchaseReceive/printNota'));
const detailPurchaseReceive = lazy(() => import('./containers/Transaksi/PurchaseReceive/detail'));
const editPurchaseReceive = lazy(() => import('./containers/Transaksi/PurchaseReceive/edit'));
const reportPembelian = lazy(() => import('./containers/Report/reportPembelian'));

const menuDeposit = lazy(() => import('./containers/Transaksi/Deposit'));
const addDeposit = lazy(() => import('./containers/Transaksi/Deposit/add'));
const detailDeposit = lazy(() => import('./containers/Transaksi/Deposit/detail'));
const editDeposit = lazy(() => import('./containers/Transaksi/Deposit/edit'));

const menuArea = lazy(() => import('./containers/Master/Area'));
const addArea = lazy(() => import('./containers/Master/Area/add'));
const detailArea = lazy(() => import('./containers/Master/Area/detail'));
const editArea = lazy(() => import('./containers/Master/Area/edit'));

const menuDraftPurchaseReceive = lazy(() => import('./containers/Transaksi/DraftPurchaseReceive'));
const addDraftPurchaseReceive = lazy(() => import('./containers/Transaksi/DraftPurchaseReceive/add'));
const detailDraftPurchaseReceive = lazy(() => import('./containers/Transaksi/DraftPurchaseReceive/detail'));
const editDraftPurchaseReceive = lazy(() => import('./containers/Transaksi/DraftPurchaseReceive/edit'));


const menuStockAdjusment = lazy(() => import('./containers/Transaksi/StockAdjusment'));
const addStockAdjusment = lazy(() => import('./containers/Transaksi/StockAdjusment/add'));
const detailStockAdjusment = lazy(() => import('./containers/Transaksi/StockAdjusment/detail'));
const editStockAdjusment = lazy(() => import('./containers/Transaksi/StockAdjusment/edit'));

const menuPackingList = lazy(() => import('./containers/Transaksi/PackingList'));
const addPackingList = lazy(() => import('./containers/Transaksi/PackingList/add'));
const detailPackingList = lazy(() => import('./containers/Transaksi/PackingList/detail'));
const editPackingList = lazy(() => import('./containers/Transaksi/PackingList/edit'));
const printPdfPackingList = lazy(() => import('./containers/Transaksi/PackingList/Print'));

const menuInvoice = lazy(() => import('./containers/Transaksi/invoice'));
const addInvoice = lazy(() => import('./containers/Transaksi/invoice/add'));
const detailInvoice = lazy(() => import('./containers/Transaksi/invoice/detail'));
const editInvoice = lazy(() => import('./containers/Transaksi/invoice/edit'));
const printInvoice = lazy(() => import('./containers/Transaksi/invoice/Print'));

const reportStockUdangMati = lazy(() => import('./containers/Report/reportStockUdangMati'));
const reportRekapBarangMasuk = lazy(() => import('./containers/Report/reportRekapBarangMasuk'));

const menuPelunasanHutang = lazy(() => import('./containers/Transaksi/PelunasanHutang'));
const detailHutangPR = lazy(() => import('./containers/Transaksi/PelunasanHutang/detailHutangPR'));
const detailpelunasanhutang = lazy(() => import('./containers/Transaksi/PelunasanHutang/detailpelunasanhutang'));
const detailHutangCargo = lazy(() => import('./containers/Transaksi/PelunasanHutang/detailHutangCargo'));

const menuCargo = lazy(() => import('./containers/Transaksi/Cargo'));
const addCargo = lazy(() => import('./containers/Transaksi/Cargo/add'));
const detailCargo = lazy(() => import('./containers/Transaksi/Cargo/detail'));
const editCargo = lazy(() => import('./containers/Transaksi/Cargo/edit'));

const menuPelunasanPiutang = lazy(() => import('./containers/Transaksi/PelunasanPiutang'));
const bayarPelunasanPiutang = lazy(() => import('./containers/Transaksi/PelunasanPiutang/bayarPiutang'));
const detailPelunasanPiutang = lazy(() => import('./containers/Transaksi/PelunasanPiutang/detail'));
const editPelunasanPiutang = lazy(() => import('./containers/Transaksi/PelunasanPiutang/edit'));

const reportStatusTagihanCargo = lazy(() => import('./containers/Report/reportStatusTagihanCargo'));
const reportHutang = lazy(() => import('./containers/Report/reportHutang'));
const reportPiutang = lazy(() => import('./containers/Report/reportPiutang'));
const reportPenjualan = lazy(() => import('./containers/Report/reportPenjualan'));
const reportPelunasanPiutang = lazy(() => import('./containers/Report/reportPelunasanPiutang'));
const reportKartuDeposit = lazy(() => import('./containers/Report/reportKartuDeposit'));
const reportKartuPinjaman = lazy(() => import('./containers/Report/reportKartuPinjaman'));
const reportKartuStock = lazy(() => import('./containers/Report/reportKartuStock'));

const menuKomisi = lazy(() => import('./containers/Transaksi/Komisi'));
const bayarKomisi = lazy(() => import('./containers/Transaksi/Komisi/BayarKomisi'));
const detailKomisi = lazy(() => import('./containers/Transaksi/Komisi/detail'));
const editbayarKomisi = lazy(() => import('./containers/Transaksi/Komisi/editBayarKomisi'));
const printNotaKomisi = lazy(() => import('./containers/Transaksi/Komisi/Print'));
const reportKomisi = lazy(() => import('./containers/Report/reportKomisi'));
const printDraftPr = lazy(() => import('./containers/Transaksi/DraftPurchaseReceive/print'));
const printStockAdjusmentUdangMati = lazy(() => import('./containers/Transaksi/StockAdjusment/print'));

const menuPinjaman = lazy(() => import('./containers/Transaksi/Pinjaman'));
const addPinjaman = lazy(() => import('./containers/Transaksi/Pinjaman/add'));
const detailPinjaman = lazy(() => import('./containers/Transaksi/Pinjaman/detail'));
const editPinjaman = lazy(() => import('./containers/Transaksi/Pinjaman/edit'));

const cancelPackingList = lazy(() => import('./containers/Transaksi/PackingList/cancelPackingList'));

const menuCancelPackingList = lazy(() => import('./containers/Transaksi/CancelPackingList'));
const detailCancelPackingList = lazy(() => import('./containers/Transaksi/CancelPackingList/detail'));
const editCancelPackingList = lazy(() => import('./containers/Transaksi/CancelPackingList/edit'));
const printPdfCancelPackingList = lazy(() => import('./containers/Transaksi/CancelPackingList/print'));

const reportCancelPackingList = lazy(() => import('./containers/Report/reportCancelPackingList'));
const integrasiSaldo = lazy(() => import('./containers/Transaksi/Integrasi/integrasiSaldo'));

const unauthorized = lazy(() => import('./containers/Page/home/unauthorized'));

// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
    '/login',
    '/register',
    '/recover',
    '/lock',
    '/notfound',
    '/error500',
    '/maintenance',
    '/loginapps',
    pathmenu.unauthorized
];

const Routes = ({ location, ...props }) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };
    let isAuthenticated = true;//useSelector(state => state.auth.isvalid == null || state.auth.isvalid == undefined ? true:state.auth.isvalid);
    let typeaction = useSelector(state => state.auth.typeaction);
    let username = useSelector(state => state.auth.username);
    let permissions = useSelector(state => state.auth.permissions);
    const dispatch = useDispatch();
    const history = useHistory();

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'

    const animationName = 'rag-fadeIn'

    useEffect(() => {
        // dispatch(checkUser());
        // console.log('typeaction ',typeaction);
        // if(isfirst !== undefined && isfirst !== null){
        //     if(isfirst){
        //         dispatch(checkUser());
        //     }else{
        //         isAuthenticated = true;   
        //     }

        // }else{
        //     isAuthenticated = true;
        // }

        // // if(username !== ''){
        // //     dispatch(checkUser());
        // // }else{
        // //     isAuthenticated = true;
        // // }

        // console.log('isAuthenticated ',isAuthenticated)

        // if(typeaction == 'check'){
        //     dispatch(checkUser());
        // }else{
        //     isAuthenticated = true;
        // }
        let sessionuser = sessionStorage.getItem(key.sessionuser);
        let flagout = false;
        if (sessionuser == null || sessionuser == undefined) {
            flagout = true;
        }
        if (localStorage.getItem(key.token) === null || localStorage.getItem(key.token) === undefined || localStorage.getItem(key.token) == '') {
            flagout = true;
        }
        if (flagout) {
            deleteSessionAndLocalStorage();
            history.push('/logout');
        }
        const currentLanguage = localStorage.getItem('bizzapps-lng');
        if (currentLanguage === undefined || currentLanguage === null)
            props.i18n.changeLanguage('en');
        else if (currentLanguage !== 'en')
            props.i18n.changeLanguage(currentLanguage);
        return () => {
        };

    }, []);


    if (isAuthenticated) {
        // if(typeaction == 'login'){
        //     let obj = new Object();
        //     obj.username = username;
        //     obj.permissions = permissions;
        //     obj.typeaction = 'check';
        //     dispatch(authSuccess(obj));
        // }
        if (listofPages.indexOf(location.pathname) > -1) {
            return (
                // Page Layout component wrapper
                <BasePage>
                    <Suspense fallback={<PageLoader />}>
                        <Switch location={location}>
                            {/* <Route path="/login" component={waitFor(Login)}/> */}
                            <Route path="/login" component={waitFor(LoginBizz)} />
                            {/* <Route path="/loginapps" component={waitFor(LoginBizz)}/> */}
                            <Route path="/register" component={waitFor(Register)} />
                            <Route path="/recover" component={waitFor(Recover)} />
                            <Route path="/lock" component={waitFor(Lock)} />
                            <Route path="/notfound" component={waitFor(NotFound)} />
                            <Route path="/error500" component={waitFor(Error500)} />
                            <Route path="/maintenance" component={waitFor(Maintenance)} />
                            <Route path={pathmenu.unauthorized} component={waitFor(unauthorized)} />
                        </Switch>
                    </Suspense>
                </BasePage>
            )
        }
        else {
            return (
                // Layout component wrapper
                // Use <BaseHorizontal> to change layout
                <Base>
                    <TransitionGroup>
                        <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                            <div>
                                <Suspense fallback={<PageLoader />}>
                                    <Switch location={location}>
                                        <Route path="/home" component={waitFor(Home)} />
                                        <Route path={pathmenu.menuBranch} component={waitFor(menuBranch)} />
                                        <Route path={pathmenu.addBranch} component={waitFor(addBranch)} />
                                        <Route path={pathmenu.detailBranch + '/:id'} component={waitFor(detailBranch)} />
                                        <Route path={pathmenu.editBranch + '/:id'} component={waitFor(editBranch)} />

                                        <Route path={pathmenu.menucompany} component={waitFor(menuCompany)} />
                                        <Route path={pathmenu.addcompany} component={waitFor(addFormCompany)} />
                                        <Route path={pathmenu.editcompany + '/:id'} component={waitFor(editFormCompany)} />
                                        <Route path={pathmenu.detailcompany + '/:id'} component={waitFor(detailCompany)} />

                                        <Route path={pathmenu.menuRole} component={waitFor(menuRole)} />
                                        <Route path={pathmenu.addrole} component={waitFor(addFormRole)} />
                                        <Route path={pathmenu.detailrole + '/:id'} component={waitFor(detailRole)} />
                                        <Route path={pathmenu.editrole + '/:id'} component={waitFor(editFormRole)} />

                                        <Route path={pathmenu.menuInternalUser} component={waitFor(menuInternalUser)} />
                                        <Route path={pathmenu.addinternaluser} component={waitFor(addInternalUser)} />
                                        <Route path={pathmenu.detailinternaluser + '/:id'} component={waitFor(detailInternalUser)} />
                                        <Route path={pathmenu.editinternaluser + '/:id'} component={waitFor(editInternalUser)} />
                                        <Route path={pathmenu.changePasswordInternalUser + '/:id'} component={waitFor(changePasswordForm)} />

                                        <Route path={pathmenu.menuusermobile} component={waitFor(menuUserMobile)} />
                                        <Route path={pathmenu.addusermobile} component={waitFor(addUserMobile)} />
                                        <Route path={pathmenu.editusermobile + '/:id'} component={waitFor(editUserMobile)} />
                                        <Route path={pathmenu.detailusermobile + '/:id'} component={waitFor(detailUserMobile)} />

                                        <Route path={pathmenu.menuParameter} component={waitFor(menuParameter)} />
                                        <Route path={pathmenu.addparameter} component={waitFor(addMenuParameter)} />
                                        <Route path={pathmenu.editparameter + '/:id'} component={waitFor(editMenuParameter)} />
                                        <Route path={pathmenu.detailparameter + '/:id'} component={waitFor(detailMenuParameter)} />

                                        <Route path={pathmenu.menuCustomer} component={waitFor(menuCustomer)} />
                                        <Route path={pathmenu.detailCustomer + '/:id'} component={waitFor(detailcustomer)} />
                                        <Route path={pathmenu.addCustomer} component={waitFor(addCustomer)} />
                                        <Route path={pathmenu.editCustomer + '/:id'} component={waitFor(editcustomer)} />

                                        <Route path={pathmenu.menuProduct} component={waitFor(menuProduct)} />
                                        <Route path={pathmenu.addProduct} component={waitFor(addProduct)} />
                                        <Route path={pathmenu.detailProduct + '/:id'} component={waitFor(detailProduct)} />
                                        <Route path={pathmenu.editProduct + '/:id'} component={waitFor(editProduct)} />

                                        <Route path={pathmenu.menuVendor} component={waitFor(menuVendor)} />
                                        <Route path={pathmenu.addVendor} component={waitFor(addVendor)} />
                                        <Route path={pathmenu.detailVendor + '/:id'} component={waitFor(detailVendor)} />
                                        <Route path={pathmenu.editVendor + '/:id'} component={waitFor(editVendor)} />

                                        <Route path={pathmenu.menuInventori} component={waitFor(menuInventori)} />
                                        <Route path={pathmenu.addInventori} component={waitFor(addInventori)} />
                                        <Route path={pathmenu.detailInventori + '/:id'} component={waitFor(detailInventori)} />
                                        <Route path={pathmenu.editInventori + '/:id'} component={waitFor(editInventori)} />

                                        <Route path={pathmenu.menuCategoryProduct} component={waitFor(menuCategoryProduct)} />
                                        <Route path={pathmenu.addcategoryproduct} component={waitFor(addCategoryProduct)} />
                                        <Route path={pathmenu.detailcategoryproduct + '/:id'} component={waitFor(detailCategoryProduct)} />
                                        <Route path={pathmenu.editcategoryproduct + '/:id'} component={waitFor(editCategoryProduct)} />


                                        <Route path={pathmenu.menumappingstock} component={waitFor(menuMappingStock)} />
                                        <Route path={pathmenu.addmappingstock} component={waitFor(addMappingStock)} />
                                        <Route path={pathmenu.detailmappingstock + '/:id'} component={waitFor(detailMappingStock)} />
                                        <Route path={pathmenu.editmappingstock + '/:id'} component={waitFor(editMappingStock)} />

                                        <Route path={pathmenu.menupricelist} component={waitFor(menuPriceList)} />
                                        <Route path={pathmenu.addpricelist} component={waitFor(addPriceList)} />
                                        <Route path={pathmenu.detailpricelist + '/:id'} component={waitFor(detailPriceList)} />
                                        <Route path={pathmenu.editpricelist + '/:id'} component={waitFor(editPriceList)} />

                                        <Route path={pathmenu.menupurchasereceive} component={waitFor(menuPurchaseReceive)} />
                                        <Route path={pathmenu.addpurchasereceive} component={waitFor(addPurchaseReceive)} />
                                        <Route path={pathmenu.addpurchasereceivefromtabpenerimaanbarang+ '/:id'} component={waitFor(addPrFromTabDpr)} />
                                        <Route path={pathmenu.printnota + '/:id'} component={waitFor(printNota)} />
                                        <Route path={pathmenu.detailpurchasereceive + '/:id'} component={waitFor(detailPurchaseReceive)} />
                                        <Route path={pathmenu.editpurchasereceive + '/:id'} component={waitFor(editPurchaseReceive)} />
                                        <Route path={pathmenu.menureportpurchasereceive} component={waitFor(reportPembelian)} />

                                        <Route path={pathmenu.menudeposit} component={waitFor(menuDeposit)} />
                                        <Route path={pathmenu.adddeposit} component={waitFor(addDeposit)} />
                                        <Route path={pathmenu.detaildeposit + '/:id'} component={waitFor(detailDeposit)} />
                                        <Route path={pathmenu.editdeposit + '/:id'} component={waitFor(editDeposit)} />

                                        <Route path={pathmenu.menuarea} component={waitFor(menuArea)} />
                                        <Route path={pathmenu.addarea} component={waitFor(addArea)} />
                                        <Route path={pathmenu.detailarea + '/:id'} component={waitFor(detailArea)} />
                                        <Route path={pathmenu.editarea + '/:id'} component={waitFor(editArea)} />

                                        <Route path={pathmenu.menudraftpurchasereceive} component={waitFor(menuDraftPurchaseReceive)} />
                                        <Route path={pathmenu.adddraftpurchasereceive} component={waitFor(addDraftPurchaseReceive)} />
                                        <Route path={pathmenu.detaildraftpurchasereceive + '/:id'} component={waitFor(detailDraftPurchaseReceive)} />
                                        <Route path={pathmenu.editdraftpurchasereceive + '/:id'} component={waitFor(editDraftPurchaseReceive)} />
                                        

                                        <Route path={pathmenu.menustockadjusment} component={waitFor(menuStockAdjusment)} />
                                        <Route path={pathmenu.addstockadjusment} component={waitFor(addStockAdjusment)} />
                                        <Route path={pathmenu.detailstockadjusment + '/:id'} component={waitFor(detailStockAdjusment)} />
                                        <Route path={pathmenu.editstockadjusment + '/:id'} component={waitFor(editStockAdjusment)} />

                                        <Route path={pathmenu.menupackinglist} component={waitFor(menuPackingList)} />
                                        <Route path={pathmenu.addpackinglist} component={waitFor(addPackingList)} />
                                        <Route path={pathmenu.detailpackinglist + '/:id'} component={waitFor(detailPackingList)} />
                                        <Route path={pathmenu.editpackinglist + '/:id'} component={waitFor(editPackingList)} />
                                        <Route path={pathmenu.printpdfpackinglist + '/:id'} component={waitFor(printPdfPackingList)} />

                                        <Route path={pathmenu.menuinvoice} component={waitFor(menuInvoice)} />
                                        <Route path={pathmenu.addinvoice} component={waitFor(addInvoice)} />
                                        <Route path={pathmenu.detailinvoice + '/:id'} component={waitFor(detailInvoice)} />
                                        <Route path={pathmenu.editinvoice + '/:id'} component={waitFor(editInvoice)} />
                                        <Route path={pathmenu.printpdfinvoice + '/:id'} component={waitFor(printInvoice)} />
                                        
                                        <Route path={pathmenu.menuReportStockUdangHidupMati} component={waitFor(reportStockUdangMati)} />
                                        <Route path={pathmenu.menuReportRekapBarangMasuk} component={waitFor(reportRekapBarangMasuk)} />

                                        <Route path={pathmenu.menupelunasanhutang} component={waitFor(menuPelunasanHutang)} />
                                        <Route path={pathmenu.detailhutangpr+ '/:id'} component={waitFor(detailHutangPR)} />
                                        <Route path={pathmenu.detailpelunasanhutang+ '/:id'} component={waitFor(detailpelunasanhutang)} />
                                        <Route path={pathmenu.detailhutangcargo+ '/:id'} component={waitFor(detailHutangCargo)} />

                                        <Route path={pathmenu.menucargo} component={waitFor(menuCargo)} />
                                        <Route path={pathmenu.addcargo} component={waitFor(addCargo)} />
                                        <Route path={pathmenu.detailcargo+ '/:id'} component={waitFor(detailCargo)} />
                                        <Route path={pathmenu.editcargo+ '/:id'} component={waitFor(editCargo)} />
                                        
                                        <Route path={pathmenu.menupelunasanpiutang} component={waitFor(menuPelunasanPiutang)} />
                                        <Route path={pathmenu.bayarpelunasanpiutang+ '/:id'} component={waitFor(bayarPelunasanPiutang)} />
                                        <Route path={pathmenu.detailpelunasanpiutang+ '/:id'} component={waitFor(detailPelunasanPiutang)} />
                                        <Route path={pathmenu.editpelunasanpiutang+ '/:id'} component={waitFor(editPelunasanPiutang)} />

                                        <Route path={pathmenu.menuReportStatusTagihanCargo} component={waitFor(reportStatusTagihanCargo)} />
                                        <Route path={pathmenu.menuReportHutang} component={waitFor(reportHutang)} />
                                        <Route path={pathmenu.menuReportPiutang} component={waitFor(reportPiutang)} />
                                        <Route path={pathmenu.menuReportPenjualan} component={waitFor(reportPenjualan)} />
                                        <Route path={pathmenu.menuReportPelunasanPiutang} component={waitFor(reportPelunasanPiutang)} />
                                        <Route path={pathmenu.menuReportKartuDeposit} component={waitFor(reportKartuDeposit)} />
                                        <Route path={pathmenu.menuReportKartuPinjaman} component={waitFor(reportKartuPinjaman)} />
                                        <Route path={pathmenu.menuReportKartuStock} component={waitFor(reportKartuStock)} />

                                        <Route path={pathmenu.menukomisi} component={waitFor(menuKomisi)} />
                                        <Route path={pathmenu.bayarkomisi+ '/:id'} component={waitFor(bayarKomisi)} />
                                        <Route path={pathmenu.detailkomisi+ '/:id'} component={waitFor(detailKomisi)} />
                                        <Route path={pathmenu.editbayarkomisi+ '/:id'} component={waitFor(editbayarKomisi)} />
                                        <Route path={pathmenu.printkomisi+ '/:id'} component={waitFor(printNotaKomisi)} />
                                        <Route path={pathmenu.menuReportKomisi} component={waitFor(reportKomisi)} />
                                        <Route path={pathmenu.printdraftpurchasereceive+ '/:id'} component={waitFor(printDraftPr)} />
                                        <Route path={pathmenu.printstockadjusmentstockmati+ '/:id'} component={waitFor(printStockAdjusmentUdangMati)} />

                                        <Route path={pathmenu.menuPinjaman} component={waitFor(menuPinjaman)} />
                                        <Route path={pathmenu.addpinjaman} component={waitFor(addPinjaman)} />
                                        <Route path={pathmenu.detailpinjaman+ '/:id'} component={waitFor(detailPinjaman)} />
                                        <Route path={pathmenu.editpinjaman+ '/:id'} component={waitFor(editPinjaman)} />

                                        <Route path={pathmenu.cancelpackinglist+ '/:id'} component={waitFor(cancelPackingList)} />
                                        <Route path={pathmenu.menucancelpackinglist} component={waitFor(menuCancelPackingList)} />
                                        <Route path={pathmenu.detailcancelpackinglist+ '/:id'} component={waitFor(detailCancelPackingList)} />
                                        <Route path={pathmenu.editcancelpackinglist+ '/:id'} component={waitFor(editCancelPackingList)} />
                                        <Route path={pathmenu.printpdfcancelpackinglist+ '/:id'} component={waitFor(printPdfCancelPackingList)} />
                                        
                                        <Route path={pathmenu.menuReportCancelPackingList} component={waitFor(reportCancelPackingList)} />
                                        <Route path={pathmenu.integrasiSaldo} component={waitFor(integrasiSaldo)} />
                                        
                                        <Route exact path={pathmenu.unauthorized} component={waitFor(unauthorized)} />

                                        {/*Dashboard*/}
                                        {/* <Route path="/dashboardv1" component={waitFor(DashboardV1)}/>
                                <Route path="/dashboardv2" component={waitFor(DashboardV2)}/>
                                <Route path="/dashboardv3" component={waitFor(DashboardV3)}/> */}

                                        {/*Widgets*/}
                                        {/* <Route path="/widgets" component={waitFor(Widgets)}/> */}
                                        {/*Elements*/}
                                        {/* <Route path="/buttons" component={waitFor(Buttons)}/>
                                <Route path="/notifications" component={waitFor(Notifications)}/>
                                <Route path="/sweetalert" component={waitFor(SweetAlert)}/>
                                <Route path="/carousel" component={waitFor(BsCarousel)}/>
                                <Route path="/spinners" component={waitFor(Spinner)}/>
                                <Route path="/dropdown" component={waitFor(DropdownAnimation)}/>
                                <Route path="/nestable" component={waitFor(Nestable)}/>
                                <Route path="/sortable" component={waitFor(Sortable)}/>
                                <Route path="/cards" component={waitFor(Cards)}/>
                                <Route path="/grid" component={waitFor(Grid)}/>
                                <Route path="/grid-masonry" component={waitFor(GridMasonry)}/>
                                <Route path="/typography" component={waitFor(Typography)}/>
                                <Route path="/icons-font" component={waitFor(FontIcons)}/>
                                <Route path="/icons-weather" component={waitFor(WeatherIcons)}/>
                                <Route path="/colors" component={waitFor(Colors)}/> */}

                                        {/*Forms*/}
                                        {/* <Route path="/form-standard" component={waitFor(FormStandard)}/>
                                <Route path="/form-extended" component={waitFor(FormExtended)}/>
                                <Route path="/form-validation" component={waitFor(FormValidation)}/>
                                <Route path="/form-wizard" component={waitFor(FormWizard)}/>
                                <Route path="/form-upload" component={waitFor(FormUpload)}/>
                                <Route path="/form-cropper" component={waitFor(FormCropper)}/> */}

                                        {/*Charts*/}
                                        {/* <Route path="/chart-flot" component={waitFor(ChartFlot)}/>
                                <Route path="/chart-radial" component={waitFor(ChartRadial)}/>
                                <Route path="/chart-chartjs" component={waitFor(ChartChartJS)}/>
                                <Route path="/chart-morris" component={waitFor(ChartMorris)}/>
                                <Route path="/chart-chartist" component={waitFor(ChartChartist)}/> */}

                                        {/*Table*/}
                                        {/* <Route path="/table-standard" component={waitFor(TableStandard)}/>
                                <Route path="/table-extended" component={waitFor(TableExtended)}/>
                                <Route path="/table-datatable" component={waitFor(Datatable)}/>
                                <Route path="/table-datagrid" component={waitFor(DataGrid)}/> */}

                                        {/*Maps*/}
                                        {/* <Route path="/map-google" component={waitFor(MapsGoogle)}/>
                                <Route path="/map-vector" component={waitFor(MapsVector)}/> */}

                                        {/*Extras*/}
                                        {/* <Route path="/mailbox" component={waitFor(Mailbox)}/>
                                <Route path="/timeline" component={waitFor(Timeline)}/>
                                <Route path="/calendar" component={waitFor(Calendar)}/>
                                <Route path="/invoice" component={waitFor(Invoice)}/>
                                <Route path="/search" component={waitFor(Search)}/>
                                <Route path="/todo" component={waitFor(Todo)}/>
                                <Route path="/profile" component={waitFor(Profile)}/>
                                <Route path="/ecommerce-orders" component={waitFor(EcommerceOrder)}/>
                                <Route path="/ecommerce-order-view" component={waitFor(EcommerceOrderView)}/>
                                <Route path="/ecommerce-products" component={waitFor(EcommerceProduct)}/>
                                <Route path="/ecommerce-product-view" component={waitFor(EcommerceProductView)}/>
                                <Route path="/ecommerce-checkout" component={waitFor(EcommerceCheckout)}/>
                                <Route path="/blog-list" component={waitFor(BlogList)}/>
                                <Route path="/blog-post" component={waitFor(BlogPost)}/>
                                <Route path="/blog-articles" component={waitFor(BlogArticle)}/>
                                <Route path="/blog-article-view" component={waitFor(BlogArticleView)}/>
                                <Route path="/bug-tracker" component={waitFor(BugTracker)}/>
                                <Route path="/contact-details" component={waitFor(ContactDetails)}/>
                                <Route path="/contacts" component={waitFor(Contacts)}/>
                                <Route path="/faq" component={waitFor(Faq)}/>
                                <Route path="/file-manager" component={waitFor(FileManager)}/>
                                <Route path="/followers" component={waitFor(Followers)}/>
                                <Route path="/help-center" component={waitFor(HelpCenter)}/>
                                <Route path="/plans" component={waitFor(Plans)}/>
                                <Route path="/project-details" component={waitFor(ProjectDetails)}/>
                                <Route path="/projects" component={waitFor(Projects)}/>
                                <Route path="/settings" component={waitFor(Settings)}/>
                                <Route path="/social-board" component={waitFor(SocialBoard)}/>
                                <Route path="/team-viewer" component={waitFor(TeamViewer)}/>
                                <Route path="/vote-links" component={waitFor(VoteLinks)}/>

                                <Route path="/forum" component={waitFor(ForumHome)}/> */}

                                        <Route exact path="/logout" component={waitFor(Logout)} />
                                        <Route exact path="/login" component={waitFor(LoginBizz)} />
                                        <Redirect to="/login" />
                                    </Switch>
                                </Suspense>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </Base>
            )
        }

    } else {
        return (
            <BasePage>
                <Suspense fallback={<PageLoader />}>
                    <Switch>
                        <Route path={pathmenu.unauthorized} component={waitFor(unauthorized)} />
                        <Route path={'/notfound'} component={waitFor(NotFound)} />
                        <Route exact path={["/login", "/"]} component={waitFor(LoginBizz)} />
                        <Redirect from='*' to="/login" />
                    </Switch>
                </Suspense>
            </BasePage>
        );
    }

}

// export default withRouter(Routes);
export default withRouter(withTranslation('translations')(Routes));
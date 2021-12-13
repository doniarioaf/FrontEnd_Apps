import React, { Suspense, lazy ,useEffect} from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import {withTranslation}                     from 'react-i18next';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* loader component for Suspense*/
import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
import * as pathmenu           from './containers/shared/pathMenu';

import {useSelector, useDispatch} from 'react-redux';
import {checkUser,authSuccess}           from './store/actions';
import {put, call}         from 'redux-saga/effects';
import {useHistory}                 from 'react-router-dom';
import * as key from './containers/shared/constantKey';
import {deleteSessionAndLocalStorage} from './containers/shared/globalFunc';
// import BaseHorizontal from './components/Layout/BaseHorizontal';

/* Used to render a lazy component with react-router */
const waitFor = Tag => props => <Tag {...props}/>;

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

const menuCustomerType = lazy(() => import('./containers/Customer/CustomerType'));
const addCustomerType = lazy(() => import('./containers/Customer/CustomerType/addFormCustomerType'));
const editCustomerType = lazy(() => import('./containers/Customer/CustomerType/editFormCustomerType'));

const menuCustomer = lazy(() => import('./containers/Customer/Customers'));
const detailCustomer = lazy(() => import('./containers/Customer/Customers/detail'));
const addFormCustomer = lazy(() => import('./containers/Customer/Customers/addFormCustomer'));
const editFormCustomer = lazy(() => import('./containers/Customer/Customers/editFormCustomer'));

const menuUserMobile = lazy(() => import('./containers/Admin/UserMobile'));
const addUserMobile = lazy(() => import('./containers/Admin/UserMobile/addFormUserMobile'));
const editUserMobile = lazy(() => import('./containers/Admin/UserMobile/editFormUserMobileForm'));
const detailUserMobile = lazy(() => import('./containers/Admin/UserMobile/detail'));

const menuProductType = lazy(() => import('./containers/Admin/Product/ProductType'));
const addProductType = lazy(() => import('./containers/Admin/Product/ProductType/addFormProductType'));
const editProductType = lazy(() => import('./containers/Admin/Product/ProductType/editFormProductType'));

const menuProduct = lazy(() => import('./containers/Admin/Product/Products'));
const addProduct = lazy(() => import('./containers/Admin/Product/Products/addFormProduct'));
const detailProduct = lazy(() => import('./containers/Admin/Product/Products/detail'));
const editProduct = lazy(() => import('./containers/Admin/Product/Products/editFormProduct'));

const menuInfo = lazy(() => import('./containers/Mobile/Info'));
const addInfo = lazy(() => import('./containers/Mobile/Info/addFormInfo'));
const detailInfo = lazy(() => import('./containers/Mobile/Info/detail'));
const editInfo = lazy(() => import('./containers/Mobile/Info/editFormInfo'));

const menuCallPlan = lazy(() => import('./containers/Mobile/callplan'));
const addCallPlan = lazy(() => import('./containers/Mobile/callplan/addFormCallPlan'));
const detailCallPlan = lazy(() => import('./containers/Mobile/callplan/detail'));
const editCallPlan = lazy(() => import('./containers/Mobile/callplan/editFormCallPlan'));

const reportMonitoring = lazy(() => import('./containers/Report/Mobile/reportMobileMonitoring'));

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
    '/loginapps'
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
        if(sessionuser == null || sessionuser == undefined){
            flagout = true;
        }
        if (localStorage.getItem(key.token) === null || localStorage.getItem(key.token) === undefined || localStorage.getItem(key.token) == '') {
            flagout = true;
        }
        if(flagout){
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
    

    if(isAuthenticated){
    // if(typeaction == 'login'){
    //     let obj = new Object();
    //     obj.username = username;
    //     obj.permissions = permissions;
    //     obj.typeaction = 'check';
    //     dispatch(authSuccess(obj));
    // }
    if(listofPages.indexOf(location.pathname) > -1) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader/>}>
                    <Switch location={location}>
                        {/* <Route path="/login" component={waitFor(Login)}/> */}
                        <Route path="/login" component={waitFor(LoginBizz)}/>
                        {/* <Route path="/loginapps" component={waitFor(LoginBizz)}/> */}
                        <Route path="/register" component={waitFor(Register)}/>
                        <Route path="/recover" component={waitFor(Recover)}/>
                        <Route path="/lock" component={waitFor(Lock)}/>
                        <Route path="/notfound" component={waitFor(NotFound)}/>
                        <Route path="/error500" component={waitFor(Error500)}/>
                        <Route path="/maintenance" component={waitFor(Maintenance)}/>
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
                        <Suspense fallback={<PageLoader/>}>
                            <Switch location={location}>
                            <Route path="/home" component={waitFor(Home)}/>
                            <Route path={pathmenu.menuBranch} component={waitFor(menuBranch)}/>
                            <Route path={pathmenu.addBranch} component={waitFor(addBranch)}/>
                            <Route path={pathmenu.detailBranch+'/:id'} component={waitFor(detailBranch)}/>
                            <Route path={pathmenu.editBranch+'/:id'} component={waitFor(editBranch)}/>

                            <Route path={pathmenu.menucompany} component={waitFor(menuCompany)}/>
                            <Route path={pathmenu.addcompany} component={waitFor(addFormCompany)}/>
                            <Route path={pathmenu.editcompany+'/:id'} component={waitFor(editFormCompany)}/>
                            <Route path={pathmenu.detailcompany+'/:id'} component={waitFor(detailCompany)}/>

                            <Route path={pathmenu.menuRole} component={waitFor(menuRole)}/>
                            <Route path={pathmenu.addrole} component={waitFor(addFormRole)}/>
                            <Route path={pathmenu.detailrole+'/:id'} component={waitFor(detailRole)}/>
                            <Route path={pathmenu.editrole+'/:id'} component={waitFor(editFormRole)}/>

                            <Route path={pathmenu.menuInternalUser} component={waitFor(menuInternalUser)}/>
                            <Route path={pathmenu.addinternaluser} component={waitFor(addInternalUser)}/>
                            <Route path={pathmenu.detailinternaluser+'/:id'} component={waitFor(detailInternalUser)}/>
                            <Route path={pathmenu.editinternaluser+'/:id'} component={waitFor(editInternalUser)}/>

                            <Route path={pathmenu.menucustomertype} component={waitFor(menuCustomerType)}/>
                            <Route path={pathmenu.addcustomertype} component={waitFor(addCustomerType)}/>
                            <Route path={pathmenu.editcustomertype+'/:id'} component={waitFor(editCustomerType)}/>

                            <Route path={pathmenu.menucustomers} component={waitFor(menuCustomer)}/>
                            <Route path={pathmenu.detailcustomers+'/:id'} component={waitFor(detailCustomer)}/>
                            <Route path={pathmenu.addcustomers} component={waitFor(addFormCustomer)}/>
                            <Route path={pathmenu.editcustomers+'/:id'} component={waitFor(editFormCustomer)}/>

                            <Route path={pathmenu.menuusermobile} component={waitFor(menuUserMobile)}/>
                            <Route path={pathmenu.addusermobile} component={waitFor(addUserMobile)}/>
                            <Route path={pathmenu.editusermobile+'/:id'} component={waitFor(editUserMobile)}/>
                            <Route path={pathmenu.detailusermobile+'/:id'} component={waitFor(detailUserMobile)}/>

                            <Route path={pathmenu.menuproducttype} component={waitFor(menuProductType)}/>
                            <Route path={pathmenu.addproducttype} component={waitFor(addProductType)}/>
                            <Route path={pathmenu.editproducttype+'/:id'} component={waitFor(editProductType)}/>

                            <Route path={pathmenu.menuproduct} component={waitFor(menuProduct)}/>
                            <Route path={pathmenu.addproduct} component={waitFor(addProduct)}/>
                            <Route path={pathmenu.detailproduct+'/:id'} component={waitFor(detailProduct)}/>
                            <Route path={pathmenu.editproduct+'/:id'} component={waitFor(editProduct)}/>

                            <Route path={pathmenu.menuinfo} component={waitFor(menuInfo)}/>
                            <Route path={pathmenu.addinfo} component={waitFor(addInfo)}/>
                            <Route path={pathmenu.detailinfo+'/:id'} component={waitFor(detailInfo)}/>
                            <Route path={pathmenu.editinfo+'/:id'} component={waitFor(editInfo)}/>

                            <Route path={pathmenu.menucallplan} component={waitFor(menuCallPlan)}/>
                            <Route path={pathmenu.addcallplan} component={waitFor(addCallPlan)}/>
                            <Route path={pathmenu.detailcallplan+'/:id'} component={waitFor(detailCallPlan)}/>
                            <Route path={pathmenu.editcallplan+'/:id'} component={waitFor(editCallPlan)}/>
                            <Route path={pathmenu.reportmonitoring} component={waitFor(reportMonitoring)}/>
                            <Route exact path={pathmenu.unauthorized} component={waitFor(unauthorized)}/>
                            
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

                                <Redirect to="/login"/>
                            </Switch>
                        </Suspense>
                    </div>
                </CSSTransition>
              </TransitionGroup>
            </Base>
        )
    }

}else{
    return (
        <BasePage>
            <Suspense fallback={<PageLoader/>}>
                <Switch>
                    <Route path={'/notfound'} component={waitFor(NotFound)}/>
                    <Route exact path={["/login", "/"]} component={waitFor(LoginBizz)}/>
                    <Redirect from='*' to="/login"/>
                </Switch>
            </Suspense>
        </BasePage>
    );
}

}

// export default withRouter(Routes);
export default withRouter(withTranslation('translations')(Routes));
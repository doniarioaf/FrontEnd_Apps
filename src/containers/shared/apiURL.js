export const baseApiURL = 
    // 'http://localhost:8081/manggala/v1'; //Manggala
    // 'http://localhost:8080/manggala/v1'; //Irsan
    // 'http://localhost:8189/manggala/v1'; //Doni
    'http://localhost:8080/v1';
    // 'http://147.139.139.25:80/sinarmediasakti/v1';
export const loginURL = `${baseApiURL}/login`;
export const checkAuthURL = `${baseApiURL}/checkuser`;
export const baseBranchURL = param => `${baseApiURL}/branch${param}`;
export const baseCompanyURL = param => `${baseApiURL}/company${param}`;
export const baseRoleURL = param => `${baseApiURL}/role${param}`;
export const baseUserAppsURL = param => `${baseApiURL}/userapps${param}`;
export const baseCustomerTypeURL = param => `${baseApiURL}/customertype${param}`;
export const baseCustomerURL = param => `${baseApiURL}/customer${param}`;
export const baseUserMobileURL = param => `${baseApiURL}/usermobile${param}`;
export const baseCallPlanURL = param => `${baseApiURL}/callplan${param}`;
export const baseProductTypeURL = param => `${baseApiURL}/producttype${param}`;
export const baseProductURL = param => `${baseApiURL}/product${param}`;
export const baseInfoURL = param => `${baseApiURL}/info${param}`;
export const baseReportURL = param => `${baseApiURL}/report${param}`;
export const baseProjectURL = param => `${baseApiURL}/project${param}`;
export const baseBankAccountURL = param => `${baseApiURL}/bankaccount${param}`;
export const baseCustomerManggalaURL = param => `${baseApiURL}/customermanggala${param}`;
export const baseAddressURL = param => `${baseApiURL}/address${param}`;
export const baseEmployeeManggalaURL = param => `${baseApiURL}/employeemanggala${param}`;
export const baseVendorCategoryURL = param => `${baseApiURL}/vendorcategory${param}`;
export const baseVendorURL = param => `${baseApiURL}/vendor${param}`;
export const baseWorkOrderTypeURL = param => `${baseApiURL}/workordertype${param}`;
export const basePartaiURL = param => `${baseApiURL}/partai${param}`;
export const basePortURL = param => `${baseApiURL}/port${param}`;
export const baseParameterManggalaURL = param => `${baseApiURL}/parametermanggala${param}`;
export const baseWarehouseURL = param => `${baseApiURL}/warehouse${param}`;
export const baseInvoiceTypeURL = param => `${baseApiURL}/invoicetype${param}`;
export const basePriceListURL = param => `${baseApiURL}/pricelist${param}`;
export const basePaymentTypeURL = param => `${baseApiURL}/paymenttype${param}`;
export const baseWorkOrderURL = param => `${baseApiURL}/workorder${param}`;
export const baseSuratJalanURL = param => `${baseApiURL}/suratjalan${param}`;
export const basePenerimaanKasBankURL = param => `${baseApiURL}/penerimaankasbank${param}`;
export const basePengeluaranKasBankURL = param => `${baseApiURL}/pengeluarankasbank${param}`;
export const baseInvoiceURL = param => `${baseApiURL}/invoice${param}`;
export const baseAssetURL = param => `${baseApiURL}/asset${param}`;
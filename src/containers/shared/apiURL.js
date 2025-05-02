export const baseApiURL = 
    // 'http://localhost:8080/manggala/v1'; //Manggala
    // 'http://localhost:8080/sumberberliansamudra/v1'; //Irsan
    // 'http://localhost:8189/sumberberliansamudra/v1'; //Doni
    // 'http://localhost:8080/v1';
    'http://203.100.57.94:8080/sumberberliansamudra/v1'; //server
export const loginURL = `${baseApiURL}/login`;
export const preloginURL = `${baseApiURL}/prelogin`;
export const checkAuthURL = `${baseApiURL}/checkuser`;
export const baseBranchURL = param => `${baseApiURL}/branch${param}`;
export const baseCompanyURL = param => `${baseApiURL}/company${param}`;
export const baseRoleURL = param => `${baseApiURL}/role${param}`;
export const baseUserAppsURL = param => `${baseApiURL}/userapps${param}`;
export const baseUserMobileURL = param => `${baseApiURL}/usermobile${param}`;
export const baseAddressURL = param => `${baseApiURL}/address${param}`;
export const baseParameterClientURL = param => `${baseApiURL}/parameterclient${param}`;
export const baseCustomerURL = param => `${baseApiURL}/customer${param}`;
export const baseProductURL = param => `${baseApiURL}/product${param}`;
export const baseVendorURL = param => `${baseApiURL}/vendor${param}`;
export const baseInventoriURL = param => `${baseApiURL}/inventori${param}`;
export const baseCategoryProductURL = param => `${baseApiURL}/categoryproduct${param}`;
export const baseMappingStockURL = param => `${baseApiURL}/mappingstock${param}`;
export const basePriceListURL = param => `${baseApiURL}/pricelist${param}`;
export const basePurchaseReceiveURL = param => `${baseApiURL}/purchasereceive${param}`;
export const baseDepositURL = param => `${baseApiURL}/deposit${param}`;
export const baseAreaURL = param => `${baseApiURL}/area${param}`;
export const baseDraftPurchaseReceiveURL = param => `${baseApiURL}/draftpurchasereceive${param}`;
export const baseStockAdjusmentURL = param => `${baseApiURL}/stockadjusment${param}`;
export const basePackingListURL = param => `${baseApiURL}/packinglist${param}`;
export const baseInvoiceURL = param => `${baseApiURL}/invoice${param}`;
export const baseReportURL = param => `${baseApiURL}/report${param}`;
export const basePelunasanHutangURL = param => `${baseApiURL}/pelusanhutang${param}`;
export const baseCargoURL = param => `${baseApiURL}/cargo${param}`;
export const basePelunasanPiutangURL = param => `${baseApiURL}/pelunasanpiutang${param}`;
export const baseKomisiURL = param => `${baseApiURL}/komisi${param}`;
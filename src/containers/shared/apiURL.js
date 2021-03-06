export const baseApiURL = 
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
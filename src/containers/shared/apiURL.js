export const baseApiURL = 
    // 'http://localhost:8080/manggala/v1'; //Manggala
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
export const baseUserMobileURL = param => `${baseApiURL}/usermobile${param}`;
export const baseAddressURL = param => `${baseApiURL}/address${param}`;
import * as key from '../../containers/shared/constantKey';

export const deleteSessionAndLocalStorage = () =>{
    localStorage.removeItem(key.token);
    localStorage.removeItem(key.permissions);
    sessionStorage.removeItem(key.sessionuser);
};

export const mappingMessageError = (error) =>{
    let arrMsg = [];
    if(error.data){
        let val = error.data;
        if(val.messagecode == 'data.validation'){
            for(let i=0; i < val.validations.length; i++){
                let valid = val.validations[i];
                arrMsg.push(valid.messageCode);
            }
        }
    }
    return arrMsg
}

export const listTypeReport = () => {
    var tempOutPut = [];
    
    // tempOutPut.push({"value":"HTML","label":"Normal Format","typeapi":"text/html"});
    tempOutPut.push({"value":"XLSX","label":"Excel Format","typeapi":"application/vnd.ms-excel"});
    // tempOutPut.push({"value":"XLS","label":"Excel 97-2003 Format","typeapi":"application/vnd.ms-excel"});
    tempOutPut.push({"value":"PDF","label":"PDF Format","typeapi":"application/pdf"});

    return tempOutPut;
}
import React from 'react';
import PropTypes from 'prop-types';
import {Trans}      from 'react-i18next';
import {historylink}     from '../../containers/shared/constantKey';

const setLinkPath = (props) => {
    if(props.removehistorylink){
        localStorage.removeItem(historylink);
    }
    // const history = useHistory();
    let value = localStorage.getItem(historylink);
    let listpath = [];
    let list = [];
    localStorage.removeItem(historylink);
    let isContinue = true;
    if(value != null && value != undefined){
        if(value !== ''){
            value = JSON.parse(value);
            list = value;
            if(value.length > 0){
                // listpath.push(<br/>);
                
                // let check = value.filter(output => output.name == props.label ?props.label:'');
                let lastname = value[value.length - 1].name;
                let currentMenu = props.label ?props.label:'';
                isContinue = lastname == currentMenu ? false:true;
                    if(isContinue){
                        list = [];
                    }
                    for(let i=0; i < value.length; i++){
                        let parse = value[i];
                        if(isContinue){
                            if(currentMenu == parse.name){
                                break;
                            }else{
                                list.push(parse);
                                listpath.push(<span onClick={() => props.history ? props.history.push(parse.path):''}  style={{fontSize:'smaller',fontWeight:'bold',cursor:'pointer'}}><Trans i18nKey={parse.name}>{parse.defaultname}</Trans></span> )
                                listpath.push(<span style={{fontSize:'smaller',fontWeight:'bold'}}>{' > '}</span> )
                            }
                        }else{
                            if(i == value.length - 1){
                                listpath.push(<span style={{fontSize:'smaller',fontWeight:'bold'}}><Trans i18nKey={parse.name}>{parse.defaultname}</Trans></span> )
                            }else{
                                listpath.push(<span onClick={() => props.history ? props.history.push(parse.path):''} style={{fontSize:'smaller',fontWeight:'bold',cursor:'pointer'}}><Trans i18nKey={parse.name}>{parse.defaultname}</Trans></span> )
                                listpath.push(<span style={{fontSize:'smaller',fontWeight:'bold'}}>{' > '}</span> )
                            }
                        }

                        
                    }
            }
        }
    }
    if(isContinue){
        listpath.push(<span style={{fontSize:'smaller',fontWeight:'bold'}}><Trans i18nKey={props.label ?props.label:''}>{props.labeldefault?props.labeldefault:''}</Trans></span> );
        list.push({name:props.label ?props.label:'',defaultname:props.labeldefault ?props.labeldefault:'',path:props.link?props.link:''});
    }
    localStorage.setItem(historylink,JSON.stringify(list));
    
    return listpath;
}

const ContentHeading = props =>(
    <div className="content-heading" style={{display:'block'}}>
        <span><Trans i18nKey={props.label ?props.label:''}>{props.labeldefault?props.labeldefault:''}</Trans></span>
        {
            props.content ? 
            (props.content) :''
        }
        <div style={{marginLeft:'20px'}}>
        {
            (setLinkPath(props))
            
        }
        </div>
    </div>
)

ContentHeading.propTypes = {
    /** add element with 'unwrap' class to expand content area */
    unwrap: PropTypes.bool
}
ContentHeading.defaultProps = {
    unwrap: false
}

export default ContentHeading;
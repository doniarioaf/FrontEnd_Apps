import React from 'react';
import ContentWrapper from '../../../components/Layout/ContentWrapper';
import { useTranslation}      from 'react-i18next';
import '../../CSS/sizeimage.css';
import img from '../../shared/image/authorized.webp';
import {useHistory}                 from 'react-router-dom';

export default function UnauthorizedIndex() {
    const [t, i18n] = useTranslation('translations');
    const history = useHistory();
    return (
        <ContentWrapper>
            <div className="text-center mb-6">
            <img className="sizegembok"  src= {img}
                            alt="Logo Tenant"/>
            </div>
            {/* <h3 onClick={() => history.goBack()} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {i18n.t('common.BACK')}
            </h3> */}
            <div className="abs-center wd-xl" style={{width:'100%'}}>
            <div className="text-center mb-6">
            {/* <p className="lead m-2">{i18n.t('label_NOT_OPEN_THIS_PAGE')}</p> */}
                <div className="text-lg mb-3">{i18n.t('label_NOT_OPEN_THIS_PAGE')}</div>
                <div className="text-md mb-3">{i18n.t('label_AUTHORIZED')}</div>
                {/* <p className="lead m-0">{i18n.t('label_AUTHORIZED')}</p> */}
            </div>
            <ul className="list-inline text-center text-sm mb-4">
            <li className="list-inline-item">
                    <p className="lead m-0" onClick={() => history.push('/home')}>{i18n.t('label_BACK')}</p>
                    {/* <Link to={'/home'} className="text-muted">{text_3()}</Link> */}
                </li>
            </ul>
            </div>
        </ContentWrapper>
    )
}
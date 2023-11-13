import React from 'react';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import ContentHeading from '../../components/Layout/ContentHeading';
import { Loading } from '../../components/Common/Loading';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

const MainSubmit = props => {
    const history = useHistory();
    const link = props.link ? props.link : '';
    const labelheaderlang = props.labelheaderlang ? props.labelheaderlang : 'Page Menu';
    const labelheaderdefault = props.labelheaderdefault ? props.labelheaderdefault : 'Page Menu';
    const content = props.content ? props.content : '';

    function funcDef() {

    }
    return (
        <div>
            <ContentWrapper>
                <ContentHeading history={history} link={link} label={labelheaderlang} labeldefault={labelheaderdefault} />
                {content}
            </ContentWrapper>
            {props.loading && <Loading />}

            <div className="row justify-content-center">
                <Button
                    onClick={() => props.onClickCancel ? props.onClickCancel() : history.goBack()}
                >
                    {'Cancel'}
                </Button>
                {
                    props.submitHandler ?
                        (
                            <Button
                                style={{ marginLeft: "1%" }}
                                onClick={() => props.submitHandler ? props.submitHandler() : funcDef()}
                            >
                                {'Submit'}
                            </Button>
                        )
                        :
                        <Button
                            style={{ marginLeft: "1%" }}
                            type='submit'
                        >
                            {'Submit'}
                        </Button>
                }
            </div>

        </div>
    )
}

export default MainSubmit;
import React, {Component} from 'react';
import {DropdownList}      from 'react-widgets';
import "react-widgets/dist/css/react-widgets.css";
import {Container, Card, CardBody}  from 'reactstrap';
import {Trans, useTranslation,withTranslation}      from 'react-i18next';
// import Grid                         from './grid';
import ContentWrapper               from '../../../components/Layout/ContentWrapper';
// import {useDispatch}   from 'react-redux';
import Swal                         from 'sweetalert2';
import * as actions                 from '../../../store/actions';
import { reloadToHomeNotAuthorize } from '../../shared/globalFunc';
import { MenuMonitoringMaps } from '../../shared/permissionMenu';
import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import ParameterMaps from './paramaterMaps';
import { Loading } from '../../../components/Common/Loading';

const GOOGLE_MAPS_JS_API_KEY='AIzaSyA8-XM3CcTcdgDTp-ktzPzr0ALnQAO8JCE';

const mapStyles = {
    width: '100%',
    height: '400px',
  };
  
class MonitoringMapsIdx extends Component {
    
    constructor(props) {
        reloadToHomeNotAuthorize(MenuMonitoringMaps,'READ');
        super(props);
        this.state = {
            maps:{zoom: 13},
            // stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
            //     {latitude: 47.359423, longitude: -122.021071},
            //     {latitude: 47.2052192687988, longitude: -121.988426208496},
            //     {latitude: 47.6307081, longitude: -122.1434325},
            //     {latitude: 47.3084488, longitude: -122.2140121},
            //     {latitude: 47.5524695, longitude: -122.0425407}],
            datamaps:[
                // {
                //     latitude:"47.359423",longitude:"-122.021071",checkintime:"2021-11-09 22:07:44.384",
                //     custlatitude:"47.2052192687988",custlongitude:"-121.988426208496",custnama:"Fulan A",custtypenama:"KeyAccount"
                // },
                // {
                //     latitude:"47.6307081",longitude:"-122.1434325",checkintime:"2021-11-09 22:04:44.384",
                //     custlatitude:"47.3084488",custlongitude:"-122.2140121",custnama:"Fulan B",custtypenama:"KeyAccount"
                // }
            ],
            selecteddata :null,
            showInfoWindow:true,
            activeMarker:null,
            iscust:false,
            loading:false   
        }
    
        // this.onMapClicked = this.onMapClicked.bind(this);
        this.handleMapMount = this.handleMapMount.bind(this);
    }

    // "data": [
    //     {
    //         "latitude": "-11323",
    //         "longitude": "11323",
    //         "checkintime": "2021-11-09 22:07:44.384",
    //         "custlatitude": "012092921312",
    //         "custlongitude": "-012092921312",
    //         "custnama": "Fulan A",
    //         "custtypenama": "KeyAccount"
    //     }
    // ]

    handleMapMount(mapProps, map) {
        this.map = map;
    
        //log map bounds
        // console.log(this.map.getBounds());
    }

    displayMarkers = () => {
        return this.state.datamaps.map((store, index) => {
            let count = index + 1;
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
                }}
                label= { {color: '#000000', fontWeight: 'bold', fontSize: '16px', text: new String(count).toString(),textAlign: "center"} }
                icon={{
                    ////https://sites.google.com/site/gmapsdevelopment/
                    url: 'http://maps.google.com/mapfiles/ms/icons/green.png',
                    scaledSize:  new this.props.google.maps.Size(40,40)
                }}
                onClick={(props, marker) => {
                    this.setState({selecteddata: store,activeMarker:marker,iscust:false});
                  }}
         />
        })
      }

      displaySetMarkersCust = () => {
        return this.state.datamaps.map((store, index) => {
            let count = index + 1;
            return <Marker key={index} id={index} position={{
                lat: store.custlatitude,
                lng: store.custlongitude
                }}
                icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/red.png',
                    scaledSize:  new this.props.google.maps.Size(40,40)
                }}
                label= { {color: '#000000', fontWeight: 'bold', fontSize: '16px', text: new String(count).toString(),textAlign: "center"} }
                onClick={(props, marker) => {
                    this.setState({selecteddata: store,activeMarker:marker,iscust:true});
                  }}    
                />
        })
      }

      handleGetDataMaps = (data) => {
        if(data.data){
            this.setState({datamaps: data.data,loading:false});
        }
      }

      handleLoading = (data) => {
        this.setState({loading: data});
      }

      
    
    render() {

        if (!this.props.loaded) {
            return <div>Loading...</div>
        }

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Maps</div>
                </div>
                {/* <div className="row mt-2"> */}

                <ParameterMaps
                handleGetDataMaps={this.handleGetDataMaps}
                handleLoading={this.handleLoading}
                />
                {
                    this.state.datamaps.length > 0?
                    <Map 
                    google={this.props.google}
                    zoom={10}
                    style={mapStyles}
                    initialCenter={{ lat: this.state.datamaps[0].custlatitude, lng: this.state.datamaps[0].custlongitude}}
                    >
                        {this.displayMarkers()}
                        {this.displaySetMarkersCust()}
                        {this.state.selecteddata != null? (
                            <InfoWindow
                                visible={this.state.showInfoWindow}
                                marker={this.state.activeMarker}
                                onCloseClick={() => {
                                    this.setState({selecteddata: null,activeMarker:null,iscust:false});
                                }}
                            >
                                <div>
                                {this.state.iscust? this.state.selecteddata.custnama+"("+this.state.selecteddata.custtypenama+")":this.state.selecteddata.checkintime}
                                </div>
                            </InfoWindow>
                            ) : null}
                    </Map>:''
                }
                
                {/* </div> */}
                {this.state.loading && <Loading/>}
            </ContentWrapper>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (GOOGLE_MAPS_JS_API_KEY),
})(MonitoringMapsIdx);

// const mapDispatchToProps = dispatch => {
//     return {
//         apiKey: (key) => ,
//         initGetMaps: (param, successHandler, errorHandler) => dispatch(actions.getMonitoringData(param, successHandler, errorHandler)),
        
//     }
// };

// export default compose(connect(null, mapDispatchToProps), withTranslation('translations'))(MonitoringMapsIdx);
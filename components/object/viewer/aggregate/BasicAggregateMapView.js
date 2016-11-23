import React from 'react';
import Wkt from 'wicket/wicket';
import LeafletMapView from '../common/LeafletMapView';

class BasicAggregateMapView extends React.Component {

    render() {
        let self = this;
        let val, outputDIV, coordinates, long, lat, data, coordinatesArr=[], shapesArr=[], focusPoint;
        let zoomLevel = 8;
        if(this.props.config && this.props.config.zoomLevel){
            zoomLevel = this.props.config.zoomLevel;
        }
        this.props.spec.instances.forEach((node, index)=> {
            if(!node){
                return undefined; // stop processing this iteration
            }
            if (node.value.indexOf('POLYGON') !== -1 || node.value.indexOf('Polygon') !== -1 || node.value.indexOf('MULTIPOLYGON') !== -1 || node.value.indexOf('MultiPolygon') !== -1 || node.value.indexOf('LineString') !== -1 || node.value.indexOf('MultiLineString') !== -1) {
                let wkt = new Wkt.Wkt();
                wkt.read(node.value);

                if(wkt.components && wkt.components.length && wkt.components[0].length){
                    zoomLevel = 8;
                    if(this.props.zoomLevel){
                        zoomLevel = this.props.zoomLevel;
                    }
                    try {
                        if(!focusPoint){
                            focusPoint = {lat: parseFloat(wkt.components[0][0].y), lng: parseFloat(wkt.components[0][0].x)}
                        }
                        if(!focusPoint.lat || focusPoint.lat==='NaN' || !focusPoint.lng || focusPoint.lng==='NaN'){
                            focusPoint = {lat: parseFloat(wkt.components[0][1].y), lng: parseFloat(wkt.components[0][1].x)};
                        }
                        shapesArr.push(wkt.toJson());
                    }
                    catch(err) {
                        console.log(err.message);
                    }
                }
            }else{
                val = node.value.replace('POINT(', '').replace(')', '');
                coordinates = val.split(' ');
                long = parseFloat(coordinates[0]);
                lat = parseFloat(coordinates[1]);
                if((self.props.config && self.props.config.swapLongLat) || self.props.swapLongLat){
                    long = parseFloat(coordinates[1]);
                    lat = parseFloat(coordinates[0]);
                }
                coordinatesArr.push({position: {lat: lat, lng: long}, key: node.value});
            }

        });
        let center;
        if(coordinatesArr.length){
            center = {lat: coordinatesArr[0].position.lat, lng: coordinatesArr[0].position.lng};
        }else{
            //for polygons
            center = focusPoint;
            zoomLevel = 8;
            if(this.props.zoomLevel){
                zoomLevel = this.props.zoomLevel;
            }
        }
        return (
            <div className="ui" ref="basicAggregateMapView">
                <LeafletMapView key="bamv" markers={coordinatesArr} geometry={shapesArr} zoomLevel={zoomLevel} center={center}/>
            </div>
        );
    }
}

export default BasicAggregateMapView;

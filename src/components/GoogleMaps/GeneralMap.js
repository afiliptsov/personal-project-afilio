import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems } from "../../ducks/itemReducer";
import {Map,InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const { REACT_APP_GOOGLE_KEY } = process.env;




class GeneralMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "default"
    };
  }

  componentDidMount() {
    this.props.getItems();
    console.log(this.props.getItems());
  }

  render() {
    const style = {
      width: "100%",
      height: "100%"
    };
    const containerStyle = {
      margin: "auto",
      position: "relative",
      width: "80%",
      height: "30vh"
    };

    let markerMap = this.props.items.items.map((items, i) => {
        console.log(items.item_lat);
      return (
         <Marker key={i}
          name="Dolores park"
          onClick={this.onMarkerClick}
          title={'The marker`s title will appear as a tooltip.The marker`s title will appear as a tooltip.'}
          position={{ lat: items.item_lat, lng:items.item_lng }} 
          />
    
        
        )
    });


    let infoMap = this.props.items.items.map((items, i) => {
        console.log(items.item_lat);
      return (
         <InfoWindow key={i}
          position={{ lat: items.item_lat, lng:items.item_lng }}   visible={true}
          >


                      <div>
              <p>{items.item_title}</p>
            </div>

          </InfoWindow>
    
        
        )
    });

   
    {console.log(markerMap)}
    return (
    <div>
          <Map
      containerStyle={this.props.containerStyle}
        google={this.props.google}
        style={this.props.style}
        zoom={8}
        initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
      >

        {markerMap}
        {infoMap}
        </Map>
      </div>
      )
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getItems }
)(GoogleApiWrapper({
  apiKey: REACT_APP_GOOGLE_KEY
})(GeneralMap));


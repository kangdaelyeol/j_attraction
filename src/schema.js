import { getNewTrip } from "./factory.js";

export class Trip {
  constructor() {
    this.title = "";
    this.date = "";
    this.description = "";
    this.budget = "";
    this.picture  = [];
    this.days = [new DateInfo()];  // Date[]
    this.category = "";
    this.season = "";
  }
}

export class DateInfo {
  constructor(day){
    this.markers = []; // Marker[]
    this.time = "";
    this.description = "";
  }
}

export class Marker {
  constructor(marker) {
    this.id = Date.now();
    this.marker = marker;
    this.name = marker.title;
    this.description = "";
    this.picture = [];
    this.time = "";
    this.cost = "";
  }
}





// ************* for save in DB


export class DBModel {
  createTripInDB = async (trip, owner, pictures) => {
    const newTrip = getNewTrip(trip);
    newTrip.owner = owner;
    newTrip.picture = [...pictures];
    newTrip.id = "T" + Date.now();
    newTrip.createdAt = new Date().toISOString();
    newTrip.likes = 0;
    newTrip.comments = [];


    //convert Marker to position
    newTrip.days.forEach((day, d_index) => {
      day.markers.forEach((marker, m_index) => {       
        const markerPosition = marker.marker.getPosition();
        const lat = markerPosition.lat();
        const lng = markerPosition.lng(); 
        newTrip.days[d_index].markers[m_index].onAppear = "";
        newTrip.days[d_index].markers[m_index].onDelete = "";
        newTrip.days[d_index].markers[m_index].marker = {lat, lng};
      })
    });
    console.log(newTrip);

    // save newTrip
  }

  getTripById = async (id) => {
    // find Trip info from db

    // convert info
    // createdAt {relative, absolute}
  }
}
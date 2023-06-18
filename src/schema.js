import { getNewTrip } from "./factory.js";
import { FirestoreService } from "./service.js";

const fireStore = new FirestoreService();

export class Trip {
  constructor() {
    this.title = "";
    this.date = "";
    this.description = "";
    this.budget = "";
    this.picture  = [];
    this.days = [new DateInfo()];  // Date[]
    this.category = "";
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
  createTripInDB = async (trip, owner, pictures, info) => {
    const newTrip = getNewTrip(trip, info);
    newTrip.owner = owner;
    newTrip.picture = [...pictures];
    newTrip.id = "T" + Date.now();
    newTrip.createdAt = new Date().toISOString();
    newTrip.likes = 0;
    newTrip.comments = [];

    //convert days format(DateInfo) to object

    //convert Marker to position
    newTrip.days.forEach((day, d_index) => {
      newTrip.days[d_index] = {...day};
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
   const result = await fireStore.createTrip(newTrip);
   console.log(result);
   return result;
  }

  getTripById = async (id) => {
    // find Trip info from db

    // convert info
    // createdAt {relative, absolute}
  }
}


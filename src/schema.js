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


export class TripModel {
  constructor(trip, owner, pictures) {
    this.trip = trip;
    this.pictures = pictures
    this.owner = owner;
  }

  getModelForDB = () => {

  }
}
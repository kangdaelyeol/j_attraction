export class Trip {
  constructor() {
    this.title = "";
    this.date = "";
    this.description = "";
    this.budget = "";
    this.picture  = [];
    this.days = [new Date()];  // Date[]
    this.category = "";
    this.season = "";
  }
}

export class Date {
  constructor(day){
    this.markers = []; // Marker[]
    this.time = "";
    this.description = "";
  }
}

export class Marker {
  constructor(marker, name = "") {
    this.marker = marker;
    this.name = name | "";
    this.description = "";
    this.picture = [];
    this.time = "";
    this.cost = "";
  }
}
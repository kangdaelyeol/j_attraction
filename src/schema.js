export class Trip {
  constructor() {
    this.title = "";
    this.date = "";
    this.description = "";
    this.budget = "";
    this.picture  = [];
    this.days = [new Date()];
    this.category = "";
    this.season = "";
  }
}

export class Date {
  constructor(day){
    this.markers = [];
    this.time = "";
    this.description = "";
  }
}

export class Target {
  constructor(name = "") {
    this.name = name | "";
    this.description = "";
    this.picture = [];
    this.time = "";
    this.cost = "";
  }
}
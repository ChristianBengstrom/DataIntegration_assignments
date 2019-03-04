'use strict';

 let GeoObj = {
   init: function (id, city, lat, lon, country) {
       this.id = id;
       this.city = city;
       this.lat = lat;
       this.lon = lon;
       this.country = country;
   },
   toRadians(degrees){
     var pi = Math.PI;
     return degrees * (pi/180);
   },

   calcDistance(lat2, lon2) {
     let lat1 = this.lat;
     let lon1 = this.lon;

     // let lat2 = 13.45529;
     // let lon2 = 43.94704;

     var R = 6371e3; // metres
     var φ1 = this.toRadians(lat1);
     var φ2 = this.toRadians(lat2);
     var Δφ = this.toRadians((lat2-lat1));
     var Δλ = this.toRadians((lon2-lon1));

     var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
             Math.cos(φ1) * Math.cos(φ2) *
             Math.sin(Δλ/2) * Math.sin(Δλ/2);
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

     var d = R * c;
     return d;
   }
};

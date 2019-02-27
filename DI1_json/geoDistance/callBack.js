'use strict'

let getJSONFile = function(e) {
    let ajax = Object.create(Ajax);
    ajax.init();
    ajax.getFile('source.json');
}

/*
 * Callback function
 * for the above AJaX
 */
let callBack = function(txt) {
    let myJson = JSON.parse(txt);

    var body = document.getElementsByTagName("body")[0];
    let obj = [];

    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");

    for (var i = 0; i < myJson.length; i++) { //  rows
      obj[i] = Object.create(GeoObj);
      obj[i].init(myJson[i].id, myJson[i].city, myJson[i].lat, myJson[i].lon, myJson[i].country);

      for (var c = 0; c < myJson.length; c++) { // cells
        console.log('from: ' + obj[i].city + ' - ' + myJson[c].city + ' = ' + (Math.round(obj[i].calcDistance(myJson[c].lat, myJson[c].lon))/1000) + 'km');
      }



      }
    //   function generate_table() {
    //   // get the reference for the body
    //   var body = document.getElementsByTagName("body")[0];
    //
    //   // creates a <table> element and a <tbody> element
    //   var tbl = document.createElement("table");
    //   var tblBody = document.createElement("tbody");
    //
    //   // creating all cells
    //   for (var i = 0; i < 2; i++) {
    //     // creates a table row
    //     var row = document.createElement("tr");
    //
    //     for (var j = 0; j < 2; j++) {
    //       // Create a <td> element and a text node, make the text
    //       // node the contents of the <td>, and put the <td> at
    //       // the end of the table row
    //       var cell = document.createElement("td");
    //       var cellText = document.createTextNode("cell in row "+i+", column "+j);
    //       cell.appendChild(cellText);
    //       row.appendChild(cell);
    //     }
    //
    //     // add the row to the end of the table body
    //     tblBody.appendChild(row);
    //   }
    //
    //   // put the <tbody> in the <table>
    //   tbl.appendChild(tblBody);
    //   // appends <table> into <body>
    //   body.appendChild(tbl);
    //   // sets the border attribute of tbl to 2;
    //   tbl.setAttribute("border", "2");
    // }
    // generate_table();
}

/*
 *  Assign handlers (functions) to the buttons
 */
let showStarter = function () {
    getJSONFile();
}

window.addEventListener('load', showStarter);       // kick off JS

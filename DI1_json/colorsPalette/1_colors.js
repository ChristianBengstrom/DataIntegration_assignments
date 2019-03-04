'use strict'
let getJSONFile = function(e) {
    let ajax = Object.create(Ajax);
    ajax.init();
    ajax.getFile('1_colorsIn.json');
    console.log(ajax);
}

/*
 * readystatechange 'load' event handler
 * aka callback function
 * for the above AJaX
 */
let callBack = function(txt) {
    let myJson = JSON.parse(txt);

    var palet = $('colorPalette');
    for (var i = 0; i < myJson.colors.length; i++) {

      let aColor = document.createElement('div');
      aColor.setAttribute('style', 'background-color: ' + myJson.colors[i].code.hex);

      var t = document.createTextNode(myJson.colors[i].code.hex);

      aColor.appendChild(t);
      palet.appendChild(aColor);
    }
}

/*
 *  Assign handlers (functions) to the buttons
 */
let showStarter = function () {
    getJSONFile();

    var palet = $('colorPalette');
    let changer = $('colorChanger');
    palet.addEventListener('click', function(e) {
      console.log(e.target.innerText);
      changer.style.color = e.target.innerText;
    });
}

window.addEventListener('load', showStarter);       // kick off JS

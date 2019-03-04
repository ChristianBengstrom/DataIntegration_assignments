'use strict'

let pullCountries = false;
try {
    pullCountries = new XMLHttpRequest();
} catch(err) {
    window.alert(err.message + " Get yourself a browser ;)");
}
try {
    pullCountries.addEventListener('load', function(ev) {

      // it was a load event, ie successful return from server
      // this.respObj = ev.target.responseText;
      // callBack(this.respObj);
    });
    pullCountries.open("GET", './pullCountries.php');
    pullCountries.send("");
    // console.log(pullCountries);
} catch(err) {
    alert(err.message + 'WTF');
}

let pullDataFromDB = (countryCode) => {
  let pullContent = false;
  try {
      pullContent = new XMLHttpRequest();
  } catch(err) {
      window.alert(err.message + " Get yourself a browser ;)");
  }
  try {
      pullContent.addEventListener('load', function(ev) {

        // it was a load event, ie successful return from server
        // this.respObj = ev.target.responseText;
        // callBack(this.respObj);
      });
      let q = './pullDataFromDB.php?code="'+ countryCode +'"';
      pullContent.open("GET", q);
      pullContent.send("");
  } catch(err) {
      alert(err.message + 'WTF');
  }

  let getJSONFile = function(e) {
      let ajax = Object.create(Ajax);
      ajax.init();
      ajax.getFile('./public/content.json');
      // console.log(ajax);
  }
  setTimeout(function () {
    getJSONFile();
  }, 50);
};

let makeOpt = () => {
  let jsonObjOne = JSON.parse(pullCountries.responseText);
  let select = $('countrySelect');

  select.innerHTML = '<option value="">Choose Country</option>';
  for (var i = 0; i < jsonObjOne.length; i++) {
    select.innerHTML += '<option value='+ jsonObjOne[i].id +'>'+ jsonObjOne[i].countryName +'</option>';
  }
};

let callBack = function(txt) {
    /* ajax load event
     * create a table in the DOM
     * and loop the received JSON
     * into the table as rows
     */
    console.log(txt);
    let jsonObj = JSON.parse(txt);

    let mainSpace = $('verylatest');
    mainSpace.innerHTML = "";

    let h1 = document.createElement('h1');
      let h1Node = document.createTextNode(jsonObj[1].countryName);
      h1.appendChild(h1Node);

    let countryFacts = document.createElement('ul');
      let li1 = document.createElement('li');
        let li1Node = document.createTextNode('Population: ' + jsonObj[1].countryPopulation);
        countryFacts.appendChild(li1);
        li1.appendChild(li1Node);
      let li2 = document.createElement('li');
        let li2Node = document.createTextNode('Head Of State: ' +jsonObj[1].headofstate);
        countryFacts.appendChild(li2);
        li2.appendChild(li2Node);
      let li3 = document.createElement('li');
        let li3Node = document.createTextNode('Density Of Population: ' + (Math.trunc(jsonObj[1].countryPopulation / jsonObj[1].surfacearea)) + ' citizens per km2');
        countryFacts.appendChild(li3);
        li3.appendChild(li3Node);

    let lang;
    let langArr = [];
    for (lang of jsonObj) {
        let found = false;
        let i;
        for (i = 0; i < langArr.length; i++) {
            if (lang.language === langArr[i]) {
                found = true;
                console.log('found');
            }
        }
        if (!found) {
          if (lang.isofficial === 'T') {
            langArr.push(lang.language);
          }
        }
    }
    console.log(langArr);
    let langH3 = document.createElement('h3');
      let langH3Node = document.createTextNode('Official language/s: ');
      langH3.appendChild(langH3Node);
    let langs = document.createElement('ul');
      for (var i = 0; i < langArr.length; i++) {
        let lli = document.createElement('li');
          let lliNode = document.createTextNode(langArr[i]);
          langs.appendChild(lli);
          lli.appendChild(lliNode);
      }
    let capitalH3 = document.createElement('h3');
      let capitalH3Node = document.createTextNode('The capital is: ' + jsonObj[jsonObj.length-1].name);
      capitalH3.appendChild(capitalH3Node);
    let capitalP = document.createElement('p');
      let capitalPNode = document.createTextNode('with a population of: ' + jsonObj[jsonObj.length-1].population);
      capitalP.appendChild(capitalPNode);

    let tab = document.createElement('table');

    for (let i = 0; i < jsonObj.length; i++) {
        let r = document.createElement('tr');

        let c1 = document.createElement('td');
        let t = document.createTextNode(jsonObj[i].id);
        c1.appendChild(t);
        r.appendChild(c1);

        let c2 = document.createElement('td');
        t = document.createTextNode(jsonObj[i].countryName);
        c2.appendChild(t);
        r.appendChild(c2);

        let c3 = document.createElement('td');
        t = document.createTextNode(jsonObj[i].cityName);
        c3.appendChild(t);
        r.appendChild(c3);

        let c4 = document.createElement('td');
        t = document.createTextNode(jsonObj[i].language);
        c4.appendChild(t);
        r.appendChild(c4);

        tab.appendChild(r);

        // Capital city
        // Population of capital city
        // All official languages
    }
    mainSpace.appendChild(h1);
    mainSpace.appendChild(countryFacts);
    mainSpace.appendChild(langH3);
    mainSpace.appendChild(langs);
    mainSpace.appendChild(capitalH3);
    mainSpace.appendChild(capitalP);
    // mainSpace.appendChild(tab);
}

/*
 *  Assign handlers (functions) to the buttons
 */
let showStarter = function () {
    makeOpt();
    $('countrySelect').addEventListener('change', function(e) {
      pullDataFromDB(e.target.value);
    });
}

window.addEventListener('load', showStarter);       // kick off JS

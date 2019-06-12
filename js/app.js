'use strict';
//my first object 'firstandpike' with the property of mincust, maxcust, and avgCookiesale and each property has a value

var salesData = document.getElementById('saledata');
var firstAndPike = {
  locationName: '1st And Pike',
  minCust: 23,//the min. number of customers per hr.
  maxCust: 65,//the max. number of customers per hr.
  avgCookieSale: 6.3,// the average number of cookies purchased per customer
  storeCookies: [],

  makeRandomFirstAndPike: function (){
    var minimum = Math.floor(this.minCust);
    var maximum = Math.floor(this.maxCust);

    var numberCustomer = Math.random() * (maximum - minimum +1) + minimum;
    var cookiesPerHour = Math.round(numberCustomer * this.avgCookieSale);
    return cookiesPerHour;
  }
};

firstAndPike.eachHour = function(){
  for (var i = 0; i < 15; i++){
    this.storeCookies.push(this.makeRandomFirstAndPike());
  }
};
console.log(firstAndPike.storeCookies);


firstAndPike.mySaleData = function(){
  this.eachHour();
  var openHour = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm']


  var liEl = document.createElement('li');
  var h2 = document.createElement('h2');
  h2.textContent= this.locationName;
  liEl.appendChild(h2);
  var ulEl = document.createElement('ul');



  var total = 0;

  for (var i=0; i < this.storeCookies.length; i++){
    var liElHour = document.createElement('li');
    liElHour.textContent= openHour[i] + ': ' + this.storeCookies[i] + ' cookies';

    ulEl.appendChild(liElHour);
    total = total + this.storeCookies[i];

  }

  var totalLi = document.createElement('li');
  totalLi.textContent= 'Total ' + ': ' + total + ' cookies';
  ulEl.appendChild(totalLi);
  liEl.appendChild(ulEl);
  salesData.appendChild(liEl);


};

firstAndPike.mySaleData();

//Location seaTacAirport//////////////////

var seaTacAirport = {
  locationName: 'Sea Tac Airport',
  minCust: 23,//the min. number of customers per hr.
  maxCust: 65,//the max. number of customers per hr.
  avgCookieSale: 6.3,// the average number of cookies purchased per customer
  storeCookies: [],

  makeRandomSeaTacAirport: function (){
    var minimum = Math.floor(this.minCust);
    var maximum = Math.floor(this.maxCust);

    var numberCustomer = Math.random() * (maximum - minimum +1) + minimum;
    var cookiesPerHour = Math.round(numberCustomer * this.avgCookieSale);
    return cookiesPerHour;
  }
};

seaTacAirport.eachHour = function(){
  for (var i = 0; i < 15; i++){
    this.storeCookies.push(this.makeRandomSeaTacAirport());
  }
};
console.log(seaTacAirport.storeCookies);


seaTacAirport.mySaleData = function(){
  this.eachHour();
  var openHour = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];


  var liEl = document.createElement('li');
  var h2 = document.createElement('h2');
  h2.textContent= this.locationName;
  liEl.appendChild(h2);
  var ulEl = document.createElement('ul');



  var total = 0;

  for (var i=0; i < this.storeCookies.length; i++){
    var liElHour = document.createElement('li');
    liElHour.textContent= openHour[i] + ': ' + this.storeCookies[i] + ' cookies';

    ulEl.appendChild(liElHour);
    total = total + this.storeCookies[i];

  }

  var totalLi = document.createElement('li');
  totalLi.textContent= 'Total ' + ': ' + total + ' cookies';
  ulEl.appendChild(totalLi);
  liEl.appendChild(ulEl);
  salesData.appendChild(liEl);


};

seaTacAirport.mySaleData();

























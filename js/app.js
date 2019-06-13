'use strict';

var tableForStore = document.getElementById('table-for-store');
var shop = [];
var openHour = ['6:00am','7:00am','8:00am','9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm','7:00pm','8:00pm'];


// creating my constructor
var SalmonCookieShop = function(location, minCust, maxCust, avgCookiesPerCust, avgCookiesPerHour = []){
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookiesPerCust = avgCookiesPerCust;
  this.avgCookiesPerHour = avgCookiesPerHour;
};
  

// creating my objects for each shop
shop.push(new SalmonCookieShop('1st and pike', 23, 65, 6.3));
shop.push(new SalmonCookieShop('SeaTac Airport', 3, 24, 1.2));
shop.push(new SalmonCookieShop('Seattle Center', 11, 38, 3.7));
shop.push(new SalmonCookieShop('Capitol Hill', 20, 38, 2.3));
shop.push(new SalmonCookieShop('Alki', 2, 16, 4.6));


//creating salmoncookis shop object method
//to find number of customers per hour
SalmonCookieShop.prototype.numberCustomerPerHour = function(){
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
};
//to find number of cookies per hour
SalmonCookieShop.prototype.cookiesPerHour = function(){
  var customer = this.numberCustomerPerHour();
  var cookies = this.avgCookiesPerCust * customer;
  return Math.ceil(cookies);
};
//to find total number of cookies per hour
SalmonCookieShop.prototype.totalCookiesPerHour = function(){
  var total = 0;
  for(var i = 0; i < openHour.length; i++){
    var totalcookHour = this.cookiesPerHour();
    this.avgCookiesPerHour.push(totalcookHour);
    total += totalcookHour;
  }
  this.total = total;
};

// make a table
function makeHeader(){
  var theadEl = document.createElement('thread');
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = '';
  trEl.appendChild(thEl);
  for(var i = 0; i < openHour.length; i++){
    //var thEl = document.createElement('th');
    thEl.textContent = openHour[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  theadEl.appendChild(trEl);
  trEl.appendChild(thEl);
  tableForStore.appendChild(theadEl);
}

// Add hourly sales to the table for each stores/shopes
SalmonCookieShop.prototype.addRaw = function(){
  if(this.avgCookiesPerHour.length === 0){
    this.cookiesPerHour();
  }

  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);

  for (var j = 0; j < this.avgCookiesPerHour.length; j++){
    tdEl = document.createElement('td');
    tdEl.textContent = this.avgCookiesPerHour[j];
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = this.total;
  trEl.appendChild(tdEl);
  tableForStore.appendChild(trEl);
};

function totalPerLocation(){
  var totalsInLocation = 0;
  for (var i =0; i < shop.length; i++){
    totalsInLocation += shop[i].total;
  }
  return totalsInLocation;
}

//add total to EACH ROW
function makeTotalInRow(){
  var tfootEl = document.createElement('tfoot');
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Total';
  trEl.appendChild(tdEl);

  for(var i = 0; i < openHour.length; i++){
    tdEl = document.createElement('td');
    var totalPerHour = 0;
    for (var j = 0; j < shop.length; j++){
      totalPerHour += shop[j].avgCookiesPerHour[i];
    }
    tdEl.textContent = totalPerHour;
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = totalPerLocation();
  trEl.appendChild(tdEl);
  tfootEl.appendChild(trEl);
  tableForStore.appendChild(tfootEl);
}

//populate the page
function makePage(){
  makeHeader();
  for(var i = 0; i <shop.length; i++){
    shop[i].addRaw();
  }
  makeTotalInRow();
}

makePage();
var form = document.getElementById('shop form');
var handleFormSubmit = function(formSubmitEvent){
  formSubmitEvent.preventDefault();
  var locationNameForm = formSubmitEvent.target['locationName'].value;
  var minCustForm = formSubmitEvent.target['minCust'].value;
  var maxCustForm = formSubmitEvent.target['maxCust'].value;
  var avgCookieForm = formSubmitEvent.target['avgCookies'].value;
  var newShop = new SalmonCookieShop(locationNameForm,minCustForm,maxCustForm,avgCookieForm);
  shop.push(newShop);
  console.log(shop);
};


form.addEventListener('submit', handleFormSubmit);










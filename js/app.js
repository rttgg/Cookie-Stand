'use strict';
//declare global variables
var storeTable = document.getElementById('store-table');
var storeArr = [];
var totals = [];
var trEl = document.createElement('tr');
var tdEl = document.createElement('td');
var hours = ['6:00am','7:00am','8:00am','9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm', '7:00pm','8:00pm'];

//define object class, This is my store constructor. I will be using this to build my stores
var SalmonCookieShop = function(location,minCust,maxCust,avgCookies, cookiesSoldPerHour = []){
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.cookiesSoldPerHour = cookiesSoldPerHour;
};


storeArr.push(new SalmonCookieShop('1st and Pike',23,65,6.3));
storeArr.push(new SalmonCookieShop('SeaTac Airport',3,24,1.2));
storeArr.push(new SalmonCookieShop('Seattle Center',11,38,3.7));
storeArr.push(new SalmonCookieShop('Capitol Hill',20,38,2.3));
storeArr.push(new SalmonCookieShop('Alki',2,16,4.6));


SalmonCookieShop.prototype.customersPerHour = function(){
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
};
//calculate total daily sales
SalmonCookieShop.prototype.calculatecookiesSoldPerHour= function(){
  var customers = this.customersPerHour();
  var cookies = this.avgCookies * customers;
  return Math.ceil(cookies);
};

SalmonCookieShop.prototype.calculateTotalCookiesPerHour = function(){
  var total = 0;
  for(var i = 0; i < hours.length; i++){
    var totalInHour = this.calculatecookiesSoldPerHour();
    this.cookiesSoldPerHour.push(totalInHour);
    total += totalInHour;
  }
  this.total = total;
};


function makeHeader(){
  var theadEl = document.createElement('thead');
  var thEl = document.createElement('th');
  trEl = document.createElement('tr');
  thEl = document.createElement('th');
  thEl.textContent = '';
  trEl.appendChild(thEl);
  for(var i = 0; i < hours.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Daily Location Total';
  theadEl.appendChild(trEl);
  trEl.appendChild(thEl);
  storeTable.appendChild(theadEl);
}

//ADD EACH STORE'S HOURs SALES TO THE TABLE
SalmonCookieShop.prototype.addRow = function(){
  if(this.cookiesSoldPerHour.length === 0){
    this.calculateTotalCookiesPerHour();
  }

  trEl = document.createElement('tr');
  tdEl = document.createElement('td');
  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);

  for (var j = 0; j < this.cookiesSoldPerHour.length; j++){
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesSoldPerHour[j];
    trEl.appendChild(tdEl);
  }
  tdEl = document.createElement('td');
  tdEl.textContent = this.total;
  trEl.appendChild(tdEl);

  storeTable.appendChild(trEl);
};


function sumOfDailyLocationTotals(){
  var allTotals = 0;
  for(var i = 0; i < storeArr.length; i++){
    allTotals += storeArr[i].total;
  }
  console.log(allTotals);
  return allTotals;
}

// this function to add additional store and be able to added up with the rest of the store
function clearTotals(){
  for(var i = 0; i < hours.length; i++){
    totals[i] = 0;
  }
}

function calcTotals(){
  clearTotals();
  for(var i = 0; i < hours.length; i++){
    for(var j = 0; j < storeArr.length; j++){
      totals[i] += storeArr[j].cookiesSoldPerHour[i];
    }
  }
}



//Add Totals row
function makeTotalsRow(){
  var tfootEl = document.createElement('tfoot');
  trEl = document.createElement('tr');
  trEl.id = 'totalRow';
  tdEl = document.createElement('td');
  tdEl.textContent = 'Totals';
  trEl.appendChild(tdEl);

  calcTotals();
  for(var i = 0; i < totals.length; i++){
    tdEl = document.createElement('td');
    console.log(totals[i]);
    tdEl.textContent = totals[i];
    trEl.appendChild(tdEl);
  }

  tdEl = document.createElement('td');
  tdEl.textContent = sumOfDailyLocationTotals();
  trEl.appendChild(tdEl);
  tfootEl.appendChild(trEl);
  storeTable.appendChild(tfootEl);
}

//populate the page
function makePage(){
  makeHeader();
  for(var i = 0; i < storeArr.length; i++){
    storeArr[i].addRow();
  }
  makeTotalsRow();
}

makePage();

//MAKING FORM
var form = document.getElementById('add-store-form');
var handleAddStoreForm = function(e){
  e.preventDefault();
  var formLocation = e.target.location.value;
  var formMinCust = e.target.minCust.value;
  var formMaxCust = e.target.maxCust.value;
  var formAvgCookies = e.target.avgCookies.value;
  var newSalmonCookiesShop = new SalmonCookieShop(formLocation, formMinCust, formMaxCust, formAvgCookies);
  storeArr.push(newSalmonCookiesShop);
  newSalmonCookiesShop.addRow();
  var totalRow = document.getElementById('totalRow');
  if(totalRow){
    totalRow.remove();
    makeTotalsRow();
  }
};


form.addEventListener('submit', handleAddStoreForm);

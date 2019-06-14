
'use strict';
// I will build objects using the min customers, max customer and average cookie sales.
//This will be done using the locations as variables

//Global Var
var storeNameTBEl;
var thEl;
var thElTotal;
var tdEl;
var addImageURL;
var masterImageURL;
// var addInformationURL;

//Image DOM manipulation
masterImageURL = document.getElementById('masterImage');
addImageURL = document.createElement('img');
addImageURL.src = '/salmon.png';
masterImageURL.appendChild(addImageURL);
// addInformationURL = document.createElement('1st and Pike');
// addInformationURL.src =

var openAt6am = function(i){
  var cookiesPerHour = [];
  if(i === 12){
    cookiesPerHour[i] = i +'pm';
    console.log(cookiesPerHour[i]);
  }
  cookiesPerHour[i] = i +'am';
  console.log(cookiesPerHour[i]);
  return cookiesPerHour;
};


//This is my store constructor. I will be using this to build my stores
var SalmonCookieShop = function(locationName,minCust,maxCust,avgCookies, cookiesSoldArr){
  this.locationName = locationName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.cooikesSoldArr = cookiesSoldArr;
};

//Using the constructor to create stores and pushing them to an array
//I will be using this arry make my code more DRY
var firstAndPike = new SalmonCookieShop('1st and Pike',23,65,6.3,[]);
var seaTac = new SalmonCookieShop('SeaTac Airport',3,24,1.2,[]);
var seattleCenter = new SalmonCookieShop('Seattle Center',11,38,3.7,[]);
var capitolHill = new SalmonCookieShop('Capitol Hill',20,38,2.3,[]);
var alki = new SalmonCookieShop('Alki',2,16,4.6,[]);

var shopArray = [];

shopArray.push(firstAndPike);
shopArray.push(seaTac);
shopArray.push(seattleCenter);
shopArray.push(capitolHill);
shopArray.push(alki);

//These are the functions that the store objects will be using
//This is the function to add the random number of cutomers and average cookies bought
SalmonCookieShop.prototype.randomCookiesSales = function(randomCustomer,cooikesSoldArr,avgCookies){
  var totalCookies = 0;
  var cookiesPerHour;
  cooikesSoldArr = [];
  var calcSales = 0;
  for(var i = 6; i < 12; i++){
    calcSales= this.randomCustomer()* avgCookies;
    cooikesSoldArr.push(Math.floor(calcSales));
    totalCookies = totalCookies + calcSales;
    openAt6am(i);
    cookiesPerHour = openAt6am(i);
    if(cookiesPerHour=== i + 'am'){
      cookiesPerHour.push(Math.floor(calcSales));
    }
  }
  console.log(cookiesPerHour);
  for(var j = 0; j <=8;j++){
    calcSales = randomCustomer * avgCookies;
    if(j !== 0){
      calcSales= this.randomCustomer()* avgCookies;
      cooikesSoldArr.push(Math.floor(calcSales));
      totalCookies = totalCookies + calcSales;
    }
    else{
      j = 12;
      calcSales= this.randomCustomer()* avgCookies;
      cooikesSoldArr.push(+Math.floor(calcSales));
      totalCookies = totalCookies + calcSales;
      j = 0;
    }
  }
  return [cooikesSoldArr,totalCookies];
};

//The function will used to add all the tags and elements to the DOM
//td element will be created and will add the location
//next we can add text to the td and the stores will be in.
SalmonCookieShop.prototype.addingToDOM = function(cooikesSoldArr, shopName){
  tdEl = document.createElement('td');
  tdEl.textContent = shopName;


  //The for loop will display the store name information on the page .
  storeNameTBEl = document.getElementById(shopName);
  storeNameTBEl.appendChild(tdEl);
  for(var i = 0; i < 14; i++ ){
    thEl = document.createElement('th');
    thEl.textContent = cooikesSoldArr[0][i];
    storeNameTBEl.appendChild(thEl);
  }

  //This will add the total at the bottom and append it TBEL
  thElTotal = document.createElement('td');
  thElTotal.textContent = Math.floor(cooikesSoldArr[1]);
  storeNameTBEl.appendChild(thElTotal);
};

//This function will add the random number of customers
SalmonCookieShop.prototype.randomCustomer = function (){
  return Math.floor(Math.random()* (this.maxCust-this.minCust))+ this.minCust;};

//This function will perform the main store functions
SalmonCookieShop.prototype.addRaw = function(SalmonCookieShop,locationName){
  var customer = SalmonCookieShop.randomCustomer();
  var arrayOfCookiesSales = SalmonCookieShop.randomCookiesSales(customer,SalmonCookieShop.cooikesSoldArr,SalmonCookieShop.avgCookies);
  SalmonCookieShop.addingToDOM(arrayOfCookiesSales,locationName);
  return(arrayOfCookiesSales);
};

//This is the function to add the time and the daily total to the page using DOM manipulation.
var putTheTime = function(){
  storeNameTBEl = document.getElementById('table head');
  thEl = document.createElement('th');
  thEl.textContent = ' Location';
  storeNameTBEl.appendChild(thEl);
  for(var i = 6; i < 12; i++){
    thEl = document.createElement('th');
    thEl.textContent = i + ':00 am';
    storeNameTBEl.appendChild(thEl);
  }
  for(var j = 0;j < 8; j++){
    if(j !== 0){
      thEl = document.createElement('th');
      thEl.textContent = j + ':00 pm';
      storeNameTBEl.appendChild(thEl);
    }
    else{
      thEl = document.createElement('th');
      thEl.textContent = 12 + ':00 pm';
      storeNameTBEl.appendChild(thEl);
    }
  }
  if(j === 8){
    thEl = document.createElement('th');
    thEl.textContent = 'Daily Location Total';
    storeNameTBEl.appendChild(thEl);
  }
};

//this will be considered the master function to perfrom most of what needs to happen
var doAllFunction = function(SalmonCookieShop){
  SalmonCookieShop.addRaw(SalmonCookieShop, SalmonCookieShop.locationName);
};

var callingDoAllFunction = function(shopArray){
  for (var i = 0; i < shopArray.length; i++){
    doAllFunction(shopArray[i]);

  }
};


//making form
var form = document.getElementById('shop form');
var handleFormSubmit = function(formSubmitEvent){
  formSubmitEvent.preventDefault();
  var locationNameForm = formSubmitEvent.target['locationName'].value;
  var minCustForm = formSubmitEvent.target['minCust'].value;
  var maxCustForm = formSubmitEvent.target['maxCust'].value;
  var avgCookieForm = formSubmitEvent.target['avgCookies'].value;
  var newShop = new SalmonCookieShop(locationNameForm,minCustForm,maxCustForm,avgCookieForm);
  shopArray.push(newShop);
  console.log(shopArray);
};

putTheTime();
callingDoAllFunction(shopArray);
form.addEventListener('submit', handleFormSubmit);





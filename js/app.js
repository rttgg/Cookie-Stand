// First, create a separate JS object literal (no constructor functions... yet) for each shop location that does the following:

// Stores the min/max hourly customers, and the average cookies per customer, in object properties

// Uses a method of that object to generate a random number of customers per hour. Objects/Math/random

// Calculate and store the simulated amounts of cookies purchased for each hour at each location using average cookies purchased and the random number of customers generated

// Store the results for each location in a separate array... perhaps as a property of the object representing that location

// Display the values of each array as unordered lists in the browser

// Calculating the sum of these hourly totals; your output for each location should look like this: 
// Location	Min / Cust	Max / Cust	Avg Cookie / Sale
// 1st and Pike	23	65	6.3
// SeaTac Airport	3	24	1.2
// Seattle Center	11	38	3.7
// Capitol Hill	20	38	2.3
// Alki	2	16	4.6

'use strict';
//my first object 'firstandpike' with the property of mincust, maxcust, and avgCookiesale and each property has a value 
var firstAndPike = {
    locationName: '1st And Pike',
    minCust: 23,//the min. number of customers per hr.
    maxCust: 65,//the max. number of customers per hr.
    avgCookieSale: 6.3,// the average number of cookies purchased per customer
    //need the average customer per hr (23+65)/2
    //how many cookies sold per hr = (the average customer per hour * the average cookies purchased per customer)
    
    makeRandomFirstAndPike: function (){
        var minimum = Math.floor(this.minCust);
        var maximum = Math.floor(this.maxCust);
        var averageCookieSale = Math.random(this.avgCookieSale);
       // var avgCookie = Math.random() * (maximum - minimum +1) + minimum;
        var average = (minimum + maximum) / 2;
        var cookiesPerHour = Math.floor(average * averageCookieSale);
             console.log(cookiesPerHour);
    }

};
   
//console.log(firstAndPike.cookiesPerDay);




var seaTacAirport = {
    minCust: 3,
    maxCust: '24',
    avgCookieSale: '1.2',
    makeRandomSeaTacAirport: function (){
        return Math.floor(Math.random() * Math.floor(3))
    }
}
    console.log(seaTacAirport.minCust);

var seattleCenter = {
    minCust: '11',
    maxCust: '38',
    avgCookieSale: '3.7',
    makeRandomSeattleCenter: function (){
        return Math.floor(Math.random() * Math.floor(11))
    }
}
    console.log(seattleCenter.minCust);
var capitolHill = {
    minCust: '20',
    maxCust: '38',
    avgCookieSale: '2.3',
    makeRandomCapitolHill: function (){
        return Math.floor(Math.random() * Math.floor(20))
    }
}
     console.log(capitolHill.minCust);
var alki = {
    minCust: '2',
    maxCust: '16',
    avgCookieSale: '4.6',
    makeRandomSeattleCenter: function (){
        return Math.floor(Math.random() * Math.floor(2))
    }
}
    console.log(alki.minCust);
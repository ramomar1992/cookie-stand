'use strict';

function ShopBranch(name, minCus, maxCus, avgCookie) {
    this.branchLocation = name;
    this.minCustomers = minCus;
    this.maxCustomers = maxCus;
    this.avgCookies = avgCookie;
    this.hoursPerDay = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

}

ShopBranch.prototype.getRandomNum = function () {
    return Math.round(Math.random() * (this.maxCustomers- this.minCustomers)) + this.minCustomers;
}

ShopBranch.prototype.generateCookiesPerHour = function () {
    let ret = [];
    for (let i = 0; i < this.hoursPerDay.length; i++) {
        ret.push(Math.floor(this.getRandomNum() * this.avgCookies));
    }
    this.cookiesPerHour = ret;
}
    

ShopBranch.prototype.calcTotalCookies = function () {
    let sum = 0;
    for (let i = 0; i < this.cookiesPerHour.length; i++){
        sum += this.cookiesPerHour[i];
    }
    this.totalCookies = sum;
}


let seattle = new ShopBranch('Seattle', 23, 65, 6.5);
let tokyo = new ShopBranch('Tokyo', 3, 24, 1.2);
let dubai = new ShopBranch('Dubai', 11, 38, 3.7);
let paris = new ShopBranch('Paris', 20, 35, 2.3);
let lima = new ShopBranch('Lima', 2, 16, 4.6);

// console.log(generateCoockisPerHour(tokyo));
// addcookiesPerHoutProperty(tokyo, generateCoockisPerHour(tokyo));
// console.log(tokyo);
// addcookiesPerHoutProperty(tokyo, generateCoockisPerHour(tokyo));
// console.log(tokyo.cookiesPerHour[1]);

let branchesLocation = [seattle, dubai, tokyo, paris, lima];
for (let i = 0; i < branchesLocation.length; i++){
    branchesLocation[i].generateCookiesPerHour();
    branchesLocation[i].calcTotalCookies();
    // console.log(branchesLocation[i]);
    let parent = document.querySelector('body');
    let headEl = document.createElement('h2');
    headEl.appendChild(document.createTextNode(`Branch Location: ${branchesLocation[i].name}`));
    parent.appendChild(headEl);
    let listEl = document.createElement('ul');
    // console.log(parent);
    parent.appendChild(listEl);
    // console.log(branchesLocation[i].hoursPerDay);
    for (let j = 0; j < branchesLocation[i].hoursPerDay.length; j++) {
        let listItem = document.createElement("li"); // Create a <li> node
        console.log(branchesLocation[i]);
        let listItemText = document.createTextNode(`${branchesLocation[i].hoursPerDay[j]}: ${branchesLocation[i].cookiesPerHour[j]} cookies.`); // Create a text node
        listItem.appendChild(listItemText); // Append the text to <li>
        listEl.appendChild(listItem);
    }
    listEl.appendChild(document.createElement('li').appendChild(document.createTextNode(`Total: ${branchesLocation[i].totalCookies} cookies.`)));
}
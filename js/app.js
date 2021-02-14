'use strict'

function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function generateCoockisPerHour(obj) {
    let ret = [];
    for (let i = 0; i < obj.hourPerDay.length; i++){
        ret.push(obj.getCoockiesNum());
    }    
    return ret;
}
function addCoockiesPerHoutProperty(obj, list) {
    obj.coockiesPerHour = list;
}

function calcTotalCookies(obj) {
    let sum = 0;
    for (let i = 0; i < obj.coockiesPerHour.length; i++){
        sum += obj.coockiesPerHour[i];
    }
    return sum;
}
function addTotalCoockiesProperty(obj, sum) {
    obj.totalCookies = sum;    
}

let seattle = {
    name: 'Seattle',
    minCustomer: 23,
    maxCustomer: 65,
    avgCoockies: 6.5,
    hourPerDay: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],

    getCoockiesNum: function () {
        return Math.floor(getRandomNum(this.minCustomer, this.maxCustomer) * this.avgCoockies);
    }
}

let tokyo = {
    name: 'Tokyo',
    minCustomer: 3,
    maxCustomer: 24,
    avgCoockies: 1.2,
    hourPerDay: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],

    getCoockiesNum: function () {
        return Math.floor(getRandomNum(this.minCustomer, this.maxCustomer) * this.avgCoockies);
    }
}

let dubai = {
    name: 'Dubai',
    minCustomer: 11,
    maxCustomer: 38,
    avgCoockies: 3.7,
    hourPerDay: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],

    getCoockiesNum: function () {
        return Math.floor(getRandomNum(this.minCustomer, this.maxCustomer) * this.avgCoockies);
    }
}

let paris = {
    name: 'Paris',
    minCustomer: 20,
    maxCustomer: 35,
    avgCoockies: 2.3,
    hourPerDay: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],

    getCoockiesNum: function () {
        return Math.floor(getRandomNum(this.minCustomer, this.maxCustomer) * this.avgCoockies);
    }
    
}
let lima = {
    name: 'Lima',
    minCustomer: 2,
    maxCustomer: 16,
    avgCoockies: 4.6,
    hourPerDay: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],

    getCoockiesNum: function () {
        return Math.floor(getRandomNum(this.minCustomer, this.maxCustomer) * this.avgCoockies);
    }
}

// console.log(generateCoockisPerHour(tokyo));
// addCoockiesPerHoutProperty(tokyo, generateCoockisPerHour(tokyo));
// console.log(tokyo);
// addCoockiesPerHoutProperty(tokyo, generateCoockisPerHour(tokyo));
// console.log(tokyo.coockiesPerHour[1]);

let branchesLocation = [seattle, dubai, tokyo, paris, lima];
for (let i = 0; i < branchesLocation.length; i++){
    addCoockiesPerHoutProperty(branchesLocation[i], generateCoockisPerHour(branchesLocation[i]));
    addTotalCoockiesProperty(branchesLocation[i], calcTotalCookies(branchesLocation[i]));
    console.log(branchesLocation[i]);
    let parent = document.querySelector('body');
    let headEl = document.createElement('h2');
    headEl.appendChild(document.createTextNode(`Branch Location: ${branchesLocation[i].name}`));
    parent.appendChild(headEl);
    let listEl = document.createElement('ul');
    // console.log(parent);
    parent.appendChild(listEl);
    for (let j = 0; j < branchesLocation[i].hourPerDay.length; j++){
        let listItem = document.createElement("li"); // Create a <li> node
        let listItemText = document.createTextNode(`${branchesLocation[i].hourPerDay[j]}: ${branchesLocation[i].coockiesPerHour[j]} coockies.`); // Create a text node
        listItem.appendChild(listItemText); // Append the text to <li>
        listEl.appendChild(listItem);
    }
    listEl.appendChild(document.createElement('li').appendChild(document.createTextNode(`Total: ${branchesLocation[i].totalCookies} coockies.`)));
}
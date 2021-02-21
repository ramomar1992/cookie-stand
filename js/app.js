'use strict';
let branchesLocation = [];
let visitorCurve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
let hoursPerDay = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm','8pm'];

function ShopBranch(name, minCus, maxCus, avgCookie) {
    this.branchLocation = name;
    this.minCustomers = minCus;
    this.maxCustomers = maxCus;
    this.avgCookies = avgCookie;
    branchesLocation.push(this);
    this.customersPerHour = [];
    this.employeesPerHour = [];
}

ShopBranch.prototype.generateCustomerNumber = function (num) {
    let res = Math.round((num * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers);
    this.customersPerHour.push(res);
    return res;
}

ShopBranch.prototype.generateCookiesPerHour = function () {
    let ret = [];
    for (let i = 0; i < hoursPerDay.length; i++) {
        ret.push(Math.floor(this.generateCustomerNumber(visitorCurve[i]) * this.avgCookies));
    }
    this.cookiesPerHour = ret;
}


ShopBranch.prototype.calcTotalCookies = function () {
    let sum = 0;
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
        sum += this.cookiesPerHour[i];
    }
    this.totalCookies = sum;
}

ShopBranch.prototype.render = function (parentTableBody) {
    let tableRow = document.createElement('tr');
    let tableRowHead = document.createElement('th');
    tableRowHead.setAttribute('scope', "row");
    let textElem = document.createTextNode(`${this.branchLocation}`);
    tableRowHead.appendChild(textElem);
    tableRow.appendChild(tableRowHead);

    for (let i = 0; i < this.cookiesPerHour.length; i++) {
        let tableData = document.createElement('td');
        textElem = document.createTextNode(`${this.cookiesPerHour[i]}`);
        tableData.appendChild(textElem);
        tableRow.appendChild(tableData);
    }
    let tableData = document.createElement('td');
    textElem = document.createTextNode(`${this.totalCookies}`);
    tableData.appendChild(textElem);
    tableRow.appendChild(tableData);
    parentTableBody.appendChild(tableRow);
}
ShopBranch.prototype.renderEmployee = function (parentTableBody) {
    let tableRow = document.createElement('tr');
    let tableRowHead = document.createElement('th');
    tableRowHead.setAttribute('scope', "row");
    let textElem = document.createTextNode(`${this.branchLocation}`);
    tableRowHead.appendChild(textElem);
    tableRow.appendChild(tableRowHead);
    let empTotal = 0;
    for (let i = 0; i < hoursPerDay.length; i++) {
        
        let tableData = document.createElement('td');
        let empNum = 2;
        if (Math.ceil( this.customersPerHour[i] / 20 )>2) {
            empNum = Math.ceil(this.customersPerHour[i] / 20 );
        }
        this.employeesPerHour.push(empNum);
        textElem = document.createTextNode(`${this.customersPerHour[i]} customers need ${empNum} employees`);
        tableData.appendChild(textElem);
        tableRow.appendChild(tableData);
        empTotal += empNum;
    }
    let tableData = document.createElement('td');
    textElem = document.createTextNode(`${empTotal}`);
    tableData.appendChild(textElem);
    tableRow.appendChild(tableData);
    parentTableBody.appendChild(tableRow);
}

function createTableHead(param, parentSec) {
    let parent = document.getElementById(parentSec);
    let table = document.createElement('table');
    table.className = param;
    let tableHead = document.createElement('thead');
    let tableHeadRow = document.createElement('tr')
    let tableHeader = document.createElement('th');
    let tableText = document.createTextNode(`Hours`);
    tableHeader.appendChild(tableText);
    tableHeadRow.appendChild(tableHeader);
    for (let i = 0; i < hoursPerDay.length; i++) {
        tableHeader = document.createElement('th');
        tableText = document.createTextNode(`${hoursPerDay[i]}`);
        tableHeader.appendChild(tableText);
        tableHeadRow.appendChild(tableHeader);
    }
    tableHeader = document.createElement('th');
    tableText = document.createTextNode(param);
    tableHeader.appendChild(tableText);
    tableHeadRow.appendChild(tableHeader);
    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);
    parent.appendChild(table);
    return table;
}

function createTableFoot(parentTable ,str, type) {
    let tableFoot = document.createElement('tfoot');
    let tableFootRow = document.createElement('tr')
    let tableHeader = document.createElement('th');
    let tableText = document.createTextNode(`${str}`);
    tableHeader.appendChild(tableText);
    tableFootRow.appendChild(tableHeader);
    let allBranchTotalEachHour = [];
    let some=0;
    for (let i = 0; i < hoursPerDay.length; i++) {
        let totalPerHour = 0;
        for (let j = 0; j < branchesLocation.length; j++) {
            if (type == 'emp') {
                totalPerHour += branchesLocation[j].employeesPerHour[i];
            } else if(type == 'sales'){
                
                totalPerHour += branchesLocation[j].cookiesPerHour[i];
            }
        }
        allBranchTotalEachHour.push(totalPerHour);
    }
    for (let i = 0; i < hoursPerDay.length; i++) {
        tableHeader = document.createElement('th');
        tableText = document.createTextNode(`${allBranchTotalEachHour[i]}`);
        tableHeader.appendChild(tableText);
        tableFootRow.appendChild(tableHeader);
    }
    let totalPerDay = 0;
    for (let i = 0; i < allBranchTotalEachHour.length; i++) {
        totalPerDay += allBranchTotalEachHour[i];
    }
    tableHeader = document.createElement('th');
    tableText = document.createTextNode(`${totalPerDay}`);
    tableHeader.appendChild(tableText);
    tableFootRow.appendChild(tableHeader);
    tableFoot.appendChild(tableFootRow);
    parentTable.appendChild(tableFoot);
    
}
let seattle = new ShopBranch('Seattle', 23, 65, 6.5);
let tokyo = new ShopBranch('Tokyo', 3, 24, 1.2);
let dubai = new ShopBranch('Dubai', 11, 38, 3.7);
let paris = new ShopBranch('Paris', 20, 35, 2.3);
let lima = new ShopBranch('Lima', 2, 16, 4.6);


let tableParent = createTableHead('Day Total', 'shopsTable');
let parentTableBody = tableParent.appendChild(document.createElement('tbody'));
for (let i = 0; i < branchesLocation.length; i++) {
    branchesLocation[i].generateCookiesPerHour();
    branchesLocation[i].calcTotalCookies();
    branchesLocation[i].render(parentTableBody);
}
createTableFoot(tableParent, 'Total/Day', 'sales');


let parent = document.getElementById('shopsTable');
let breakLine = document.createElement('hr');
let empHeading = document.createElement('h2')
parent.appendChild(breakLine);
parent.appendChild(empHeading);
empHeading.textContent = 'Employee Table'
let tableSections = document.createElement('section');
parent.appendChild(tableSections);
tableSections.id = 'tableSections';

let parentSection = createTableHead('Employee Total','tableSections');
for (let i = 0; i < branchesLocation.length; i++){
    branchesLocation[i].renderEmployee(parentSection);
}
createTableFoot(parentSection,'Totals','emp');

let newShop = document.getElementById('addShop');
console.log(newShop);
newShop.addEventListener('submit',submitter);
function submitter(e) {
    e.preventDefault();
    let elName = e.target.locationName.value;
    let elMin = Number (e.target.minCus.value);
    let elMax =Number (e.target.maxCus.value);
    let elAvg = parseFloat (e.target.avgCookies.value);
    let newBranch = new ShopBranch(elName, elMin, elMax, elAvg);
    tableParent.deleteTFoot();
    newBranch.generateCookiesPerHour();
    newBranch.calcTotalCookies();
    newBranch.render(parentTableBody);
    createTableFoot(tableParent,'Total/Day','sales');
    
    parentSection.deleteTFoot();
    newBranch.renderEmployee(parentSection);
    createTableFoot(parentSection,'Totals','emp');
    document.getElementById('reset').click();
}






// for (let i = 0; i < branchesLocation.length; i++){
//     branchesLocation[i].generateCookiesPerHour();
//     branchesLocation[i].calcTotalCookies();
//     let parent = document.querySelector('body');
//     let headEl = document.createElement('h2');
//     headEl.appendChild(document.createTextNode(`Branch Location: ${branchesLocation[i].branchLocation}`));
//     parent.appendChild(headEl);
//     let listEl = document.createElement('ul');   
//     parent.appendChild(listEl);
//     for (let j = 0; j < branchesLocation[i].hoursPerDay.length; j++) {
//         let listItem = document.createElement("li"); // Create a <li> node
//         let listItemText = document.createTextNode(`${branchesLocation[i].hoursPerDay[j]}: ${branchesLocation[i].cookiesPerHour[j]} cookies.`); // Create a text node
//         listItem.appendChild(listItemText); // Append the text to <li>
//         listEl.appendChild(listItem);
//     }
//     listEl.appendChild(document.createElement('li').appendChild(document.createTextNode(`Total: ${branchesLocation[i].totalCookies} cookies.`)));
// }
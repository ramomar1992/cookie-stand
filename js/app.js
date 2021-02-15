'use strict';

function ShopBranch(name, minCus, maxCus, avgCookie) {
    this.branchLocation = name;
    this.minCustomers = minCus;
    this.maxCustomers = maxCus;
    this.avgCookies = avgCookie;
    this.hoursPerDay = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

}

ShopBranch.prototype.getRandomNum = function () {
    return Math.round(Math.random() * (this.maxCustomers - this.minCustomers)) + this.minCustomers;
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

function createTableHead(branch) {
    let parent = document.querySelector('body');
    let table = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableHeadRow = document.createElement('tr')
    let tableHeader = document.createElement('th');
    let tableText = document.createTextNode(`Hours`);
    tableHeader.appendChild(tableText);
    tableHeadRow.appendChild(tableHeader);
    for (let i = 0; i < branch.hoursPerDay.length; i++) {
        tableHeader = document.createElement('th');
        tableText = document.createTextNode(`${branch.hoursPerDay[i]}`);
        tableHeader.appendChild(tableText);
        tableHeadRow.appendChild(tableHeader);
    }
    tableHeader = document.createElement('th');
    tableText = document.createTextNode('Total Per Day');
    tableHeader.appendChild(tableText);
    tableHeadRow.appendChild(tableHeader);
    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);
    parent.appendChild(table);
    return table;
}

function createTableFoot(parentTable, branch) {
    let tableFoot = document.createElement('tfoot');
    let tableFootRow = document.createElement('tr')
    let tableHeader = document.createElement('th');
    let tableText = document.createTextNode(`Total Per Hour`);
    tableHeader.appendChild(tableText);
    tableFootRow.appendChild(tableHeader);
    let allBranchTotalEachHour = [];
    for (let i = 0; i < branch.hoursPerDay.length; i++) {
        let totalPerHour = 0;
        for (let j = 0; j < branchesLocation.length; j++) {
            totalPerHour += branchesLocation[j].cookiesPerHour[i];
        }
        allBranchTotalEachHour.push(totalPerHour);
    }
    for (let i = 0; i < branch.hoursPerDay.length; i++) {
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

let branchesLocation = [seattle, dubai, tokyo, paris, lima];
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
let tableParent = createTableHead(seattle);
let parentTableBody = tableParent.appendChild(document.createElement('tbody'));
for (let i = 0; i < branchesLocation.length; i++) {
    branchesLocation[i].generateCookiesPerHour();
    branchesLocation[i].calcTotalCookies();
    branchesLocation[i].render(parentTableBody);
}
createTableFoot(tableParent, seattle);
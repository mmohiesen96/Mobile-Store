'use strict';

let mobileUsers = [];
let table = document.getElementById('table');
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function Mobile(user, type) {
    this.user = user;
    this.type = type;
    this.price = random(100, 500);
    if (this.price > 200) {
        this.condition = 'New';
    }
    else {
        this.condition = 'Used';
    }
    mobileUsers.push(this);
    updateStorage();
}
Mobile.prototype.render = function () {
    let mobileRow = document.createElement('tr');
    table.appendChild(mobileRow);

    let nameData = document.createElement('td');
    mobileRow.appendChild(nameData);
    nameData.textContent = this.user;

    let typeData = document.createElement('td');
    mobileRow.appendChild(typeData);
    typeData.textContent = this.type;

    let priceData = document.createElement('td');
    mobileRow.appendChild(priceData);
    priceData.textContent = this.price;

    let conditionData = document.createElement('td');
    mobileRow.appendChild(conditionData);
    conditionData.textContent = this.condition;

};

let buyForm = document.getElementById('form');
buyForm.addEventListener('submit', newUser);

function newUser(event) {
    event.preventDefault();

    let newUser = new Mobile(event.target.name.value, event.target.type.value);
    newUser.render();

}

function updateStorage() {
    localStorage.setItem('Buyer', JSON.stringify(mobileUsers));
}

function getUsers() {
    let stringBuyers = localStorage.getItem('Buyer');
    let objBuyer = JSON.parse(stringBuyers);
    if (objBuyer) {
        for (let i = 0; i < objBuyer.length; i++) {
            new Mobile(objBuyer[i].user, objBuyer[i].type);
        }
    }
}
getUsers();

for (let i = 0; i < mobileUsers.length; i++) {
    mobileUsers[i].render();
}


let clearButton = document.getElementById('clear');
clearButton.addEventListener('click', resetTable);

function resetTable(event) {
    event.preventDefault();
    table.textContent = '';
    localStorage.clear();
}

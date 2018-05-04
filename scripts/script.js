class Item {
    constructor(price, place, name, integer) {
        this.price = price;
        this.place = place;
        this.name = name;
        this.integer = integer;
        this.weight = 0;
    }
}

class Bill {
    constructor(name, price, weight, integer) {
        this.name = name;
        this.price = price;
        this.weight = weight;
        this.sum = this.countPrice(integer);
    }

    countPrice(integer) {
        const fromGrInKg = 0.001;
        if (integer == true) {
            return (this.price * this.weight);
        }
        else {
            return (this.price * fromGrInKg * this.weight).toFixed(2);
        }
    }
}

var billSum = [];

var itemsArr = [new Item(10, "baking department", "Wheat bread", true),
    new Item(12, "baking department", "Rye bread", true),
    new Item(18, "milk department", "Milk", true),
    new Item(22, "milk department", "Butter", true),
    new Item(16, "milk department", "Yoghurt", true),
    new Item(3, "milk department", "Eggs", true),
    new Item(120, "milk department", "Cheese", false),
    new Item(140, "meat department", "Ham", false),
    new Item(100, "meat department", "Sausages", false),
    new Item(100, "meat department", "Chicken", false),
    new Item(13, "department spices", "Sugar", false),
    new Item(7, "department spices", "Salt", true),
    new Item(26, "vegetable department", "Cucumbers", false),
    new Item(35, "vegetable department", "Tomatoes", false),
    new Item(8, "vegetable department", "Potatoes", false),
    new Item(55, "vegetable department", "Broccoli", false),
    new Item(20, "fruit department", "Apples", false),
    new Item(39, "fruit department", "Oranges", false),
    new Item(45, "fruit department", "Mandarins", false),
    new Item(43, "fruit department", "Bananas", false)
];


var weightInput = document.querySelectorAll('.weight-btn');
var onlyOneBill = false;

for (var i = 0; i < weightInput.length; i++) {
    weightInput[i].onclick = function () {
        var weightValue = this.previousElementSibling.value;
        if (weightValue == '' || weightValue == 0) {
            return;
        }
        else if (onlyOneBill == true) {
            alert('You have a bill, please reload the page.');
            return;
        }
        document.querySelector('table').style.display = 'table';

        var itemDiv = this.parentElement.parentElement;
        var itemName = itemDiv.getAttribute('data-attr');
        for (var i = 0; i < itemsArr.length; i++) {
            if (itemName == itemsArr[i].name) {
                billSum.push(new Bill(itemsArr[i].name, itemsArr[i].price, weightValue, itemsArr[i].integer));

                var table = document.querySelector('tbody');
                var column = document.createElement('tr');
                column.innerHTML = `<th scope="row"">${rowNumber + 1}</th>`;
                column.innerHTML += `<td>${billSum[rowNumber].name}</td>`;
                column.innerHTML += `<td>${billSum[rowNumber].price}</td>`;
                column.innerHTML += `<td>${billSum[rowNumber].weight}</td>`;
                column.innerHTML += `<td>${billSum[rowNumber].sum}$</td>`;
                table.appendChild(column);
                rowNumber++;
            }
        }
    }
}

document.querySelector('#remove-item').onclick = function () {
    if (onlyOneBill == true) {
        alert('You have a bill, please reload the page.');
        return;
    }

    if (billSum.length != 0) {
        billSum.pop();
        var table = document.querySelector('tbody');
        table.removeChild(table.lastChild);
        if (billSum.length == 0) {
            document.querySelector('table').style.display = 'none';
        }
        rowNumber--;
    }
}

var rowNumber = 0;

document.querySelector('#form-bill').onclick = function () {
    if (onlyOneBill == true) {
        alert('You have a bill, please reload the page.');
        return;
    }

    var finalSum = 0;
    for (var i = 0; i < billSum.length; i++) {
        finalSum += (+billSum[i].sum);
    }
    var table = document.querySelector('tbody');
    var column = document.createElement('tr');
    column.innerHTML = `<th scope="row">Final sum</th>`
    column.innerHTML += `<td></td>`;
    column.innerHTML += `<td></td>`;
    column.innerHTML += `<td></td>`;
    column.innerHTML += `<td>${finalSum.toFixed(2)}$</td>`;
    table.appendChild(column);

    onlyOneBill = true;
}
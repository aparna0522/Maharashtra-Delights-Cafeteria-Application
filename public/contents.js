const menuBook = document.getElementById('book-container');
let pageContainer = null;
let page_side = -1;
let numPages = 0;
var result = null;
var subtotal = null;
var payment_value = null;
var stripe_script = null;
var billMap = new Map();
var typeCounter = new Map();
var AppetizerCategory = null;
var DrinksCategory = null;
var AppetizerCategory = null;
var AppetizerCategory = null;
var AppetizerCategory = null;

$(document).ready(function () {
    subtotal = document.querySelector('#subtotal');
    payment_value = document.querySelector('#payment-value');
    stripe_script = document.querySelector('#stripe-script');
    AppetizerCategory = document.querySelector('#AppetizerCategory');
    DrinksCategory = document.querySelector('#DrinksCategory');
    LunchCategory = document.querySelector('#LunchCategory');
    SnacksCategory = document.querySelector('#SnacksCategory');
    DinnerCategory = document.querySelector('#DinnerCategory');
    DessertsCategory = document.querySelector('#DessertsCategory');
});

function createPage() {
    let page = document.createElement('div');
    page.classList.add('right');
    let front_fig = document.createElement('figure');
    front_fig.classList.add('front');

    let back_fig = document.createElement('figure');
    back_fig.classList.add('back');

    page.appendChild(front_fig);
    page.appendChild(back_fig);
    menuBook.prepend(page);

    return [front_fig, back_fig];
}

async function turnPages(times) {
    // Define the total number of iterations in the loop
    const totalIterations = times; // Change this to the desired number of iterations

    // Define a function to simulate the task with a promise
    function simulateTask() {
        return new Promise(resolve => {
            setTimeout(() => {
                turnRight();
                resolve();
            }, 500);
        });
    }

    for (let i = 4; i < totalIterations; i++) {
        await simulateTask();
    }
}

fetch('/data')
    .then(response => response.json())
    .then(data => {
        pageContainer = createPage();
        let current_page = pageContainer[page_side];

        let tableView;

        const totalData = data.length;
        console.log(totalData)
        console.log(data)
        let curCategory = '';
        for (let i = 0; i < totalData; i++) {
            if (curCategory != data[i]['category']) {
                curCategory = data[i]['category'];
                if (page_side == 1) {
                    pageContainer = createPage();
                    page_side = 0;
                } else if (page_side == 0) {
                    page_side = 1;
                } else {
                    page_side = 0;
                }

                if (data[i]['category'] == "Appetizers") {
                    console.log(page_side)
                    let times = menuBook.children.length
                    console.log(times)
                    if (page_side == 0)
                        times -= 1;
                    console.log("Appetizers", times)
                    AppetizerCategory.addEventListener("click", function () { turnPages(times) });
                } else if (data[i]['category'] == "Drinks") {
                    console.log(page_side)
                    let times = menuBook.children.length
                    console.log(times)
                    if (page_side == 0)
                        times -= 1;
                    console.log("Drinks", times)
                    DrinksCategory.addEventListener("click", function () { turnPages(times) })
                } else if (data[i]['category'] == "Lunch") {
                    let times = menuBook.children.length
                    if (page_side == 0)
                        times -= 1;
                    console.log("Lunch", times)
                    LunchCategory.addEventListener("click", function () { turnPages(times) })
                }
                else if (data[i]['category'] == "Snacks") {
                    let times = menuBook.children.length
                    if (page_side == 0)
                        times -= 1;
                    console.log("Snacks", times)
                    SnacksCategory.addEventListener("click", function () { turnPages(times) })
                } else if (data[i]['category'] == "Dinner") {
                    let times = menuBook.children.length
                    if (page_side == 0)
                        times -= 1;
                    console.log("Dinner", times)
                    DinnerCategory.addEventListener("click", function () { turnPages(times) })
                } else if (data[i]['category'] == "Desserts") {
                    let times = menuBook.children.length
                    if (page_side == 0)
                        times -= 1;
                    console.log("Dinner", times)
                    DessertsCategory.addEventListener("click", function () { turnPages(times) })
                } else {
                    console.log("Sorry Category not found ", data[i]['category'])
                }

                current_page = pageContainer[page_side];
                const category = document.createElement('div');
                category.classList.add('categoryStyling');
                category.innerHTML = data[i]["category"];
                current_page.appendChild(category);
                tableView = document.createElement('table');
                tableView.classList.add('menuTable');
                current_page.appendChild(tableView);
            }

            const row = document.createElement('tr');
            const itemName = document.createElement('td');

            const nameDiv = document.createElement('div');
            nameDiv.classList.add('nameDiv');
            const description = document.createElement('div');
            description.classList.add('description');

            nameDiv.innerHTML = data[i]["name"];
            itemName.appendChild(nameDiv);

            if (data[i]["description"]) {
                description.innerHTML = data[i]["description"];
                itemName.appendChild(description);
            }

            const price = document.createElement('td');
            price.innerHTML = "$" + data[i]["price"].toFixed(2);

            const quantityContainer = document.createElement('td');
            const quantity = document.createElement('input');
            quantity.placeholder = "Quantity"
            quantity.classList.add('quantity');
            quantity.type = "number"
            quantity.name = "quantity";
            quantity.min = 0;
            quantity.max = 500;

            quantity.addEventListener('input', function () {
                console.log(quantity.max);
                if (parseFloat(quantity.value) > parseFloat(quantity.max))
                    quantity.value = quantity.max;

                result = document.querySelector('#billing');

                console.log(i);
                console.log("Item Price for", data[i]["name"], "is", data[i]["price"], " * ", quantity.value);
                console.log(quantity.value, data[i]["name"]);

                let totalAmount = data[i]["price"] * quantity.value;
                console.log(quantity.value);
                billMap.set(data[i]["name"], [quantity.value, totalAmount]);

                if (quantity.value == 0 || quantity.value == '') {
                    billMap.delete(data[i]["name"]);
                }
                console.log(billMap);
                billUpdate();
            });

            quantityContainer.appendChild(quantity);
            row.appendChild(itemName);
            row.appendChild(price);
            row.appendChild(quantityContainer);

            tableView.appendChild(row);

            if (checkOverflow(current_page)) {
                tableView.removeChild(row);
                if (page_side == 1) {
                    pageContainer = createPage();
                    page_side = 0;
                } else {
                    page_side = 1;
                }
                current_page = pageContainer[page_side];
                tableView = document.createElement('table');
                tableView.classList.add('menuTable');
                current_page.appendChild(tableView);
                tableView.appendChild(row);
            }
        }

        if (page_side == 1)
            createPage()[1].id = 'back-cover';
        else
            pageContainer[1].id = 'back-cover';

        setTotalPages();
    }).catch(error => {
        console.error('Error fetching JSON:', error);
    });


function checkOverflow(el) {
    var curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === "visible")
        el.style.overflow = "hidden";

    var isOverflowing = el.clientWidth < el.scrollWidth
        || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
}

function billUpdate() {
    result.innerHTML = "";
    var subtotalSum = 0;
    if (billMap.size > 0)
        document.querySelector('#payment-bill').classList.add("active");
    else
        document.querySelector('#payment-bill').classList.remove("active");

    for (const [key, value] of billMap.entries()) {

        var row = document.createElement('tr');

        var nameDiv = document.createElement('td');
        nameDiv.classList.add('description');
        nameDiv.style.width = '60%';
        nameDiv.style.padding = '12px 0px 12px 30px';
        nameDiv.innerHTML = key;

        var requestedQuantity = document.createElement('td');
        requestedQuantity.style.width = '10%';
        requestedQuantity.style.padding = '12px 0';
        requestedQuantity.style.textAlign = 'center';
        requestedQuantity.style.fontSize = '16px';
        requestedQuantity.innerHTML = value[0];

        var total = document.createElement('td');
        total.style.width = '30%';
        total.style.padding = '12px 0';
        total.style.textAlign = 'center';
        total.style.fontSize = '16px';
        total.innerHTML = "$" + (value[1].toFixed(2));
        subtotalSum += value[1];
        row.append(nameDiv);
        row.append(requestedQuantity);
        row.append(total);

        result.append(row);
    }
    if (subtotal) {
        subtotal.innerHTML = "$" + (subtotalSum.toFixed(2));
        payment_value.value = subtotalSum.toFixed(2) * 100;
    }
}

let expenses = [];

const nameInput = document.getElementById("expenseName");
const amountInput = document.getElementById("expenseAmount");
const categoryInput = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenses");
const totalDisplay = document.getElementById("total");
const filter = document.getElementById("filter");

addBtn.addEventListener("click", function () {
    let name = nameInput.value.trim();
    let amount = Number(amountInput.value);
    let category = categoryInput.value;

    if (name === "" || amountInput.value.trim() === "" || category === "") {
        alert("Please fill all the fields.");
        return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    let expense = {
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    nameInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";

    displayExpenses();
});

function displayExpenses() {
    expenseList.innerHTML = "";

    let selectedCategory = filter.value;

    let filteredExpenses = expenses.filter(function (expense) {
        return selectedCategory === "All" ||
               expense.category === selectedCategory;
    });

    if (filteredExpenses.length === 0) {
        expenseList.innerHTML =
            '<p class="empty">No expenses found.</p>';
    }

    filteredExpenses.forEach(function (expense) {
        let index = expenses.indexOf(expense);

        let item = document.createElement("div");
        item.className = "expense-item";

        let details = document.createElement("div");

        let title = document.createElement("h3");
        title.textContent = expense.name;

        let info = document.createElement("p");
        info.textContent = expense.category;

        let price = document.createElement("h3");
        price.textContent = "₹" + expense.amount.toFixed(2);

        details.appendChild(title);
        details.appendChild(info);
        details.appendChild(price);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            expenses.splice(index, 1);
            displayExpenses();
        });

        item.appendChild(details);
        item.appendChild(deleteBtn);

        expenseList.appendChild(item);
    });

    updateTotal();
}

function updateTotal() {
    let total = expenses.reduce(function (sum, expense) {
        return sum + expense.amount;
    }, 0);

    totalDisplay.textContent = "₹" + total.toFixed(2);
}

filter.addEventListener("change", displayExpenses);

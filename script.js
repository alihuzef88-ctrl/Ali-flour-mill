console.log("script loaded");

// Save entry
function saveEntry() {

    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let kg = Number(document.getElementById("kg").value) || 0;
    let rate = Number(document.getElementById("rate").value) || 0;

    let total = kg * rate;

    let paid = Number(document.getElementById("paid").value) || 0;
    let balance = total - paid;

    // check empty fields
    if(name === "" || date === ""){
        alert("Please fill Name and Date");
        return;
    }

    let entry = {
        name: name,
        date: date,
        kg: kg,
        rate: rate,
        total: total,
        paid: paid,
        balance: balance
    };

    let data = JSON.parse(localStorage.getItem("flourData")) || [];

    data.push(entry);

    localStorage.setItem("flourData", JSON.stringify(data));

    alert("Entry Saved Successfully ✔️");

    clearForm();

    showData();
}

// Show data list
function showData() {

    let data = JSON.parse(localStorage.getItem("flourData")) || [];

    let list = document.getElementById("list");

    if (!list) return;

    list.innerHTML = "";

    data.forEach((item, index) => {

        list.innerHTML += `
        <div class="card">
            <h3>${item.name}</h3>
            <p>Date: ${item.date}</p>
            <p>KG: ${item.kg}</p>
            <p>Rate: ₹${item.rate}</p>
            <p>Total: ₹${item.total}</p>
            <p>Paid: ₹${item.paid}</p>
            <p>Balance: ₹${item.balance}</p>

            <button onclick="deleteEntry(${index})">Delete</button>
        </div>
        `;
    });
}

// Delete entry
function deleteEntry(index) {

    let data = JSON.parse(localStorage.getItem("flourData")) || [];

    data.splice(index, 1);

    localStorage.setItem("flourData", JSON.stringify(data));

    showData();
}

// Auto calculate total
function calculateTotal() {

    let kg = Number(document.getElementById("kg").value) || 0;
    let rate = Number(document.getElementById("rate").value) || 0;

    let total = kg * rate;

    let totalField = document.getElementById("total");
    if(totalField) totalField.value = total;
}

// Auto calculate balance
function calculateBalance() {

    let total = Number(document.getElementById("total").value) || 0;
    let paid = Number(document.getElementById("paid").value) || 0;

    let balance = total - paid;

    let balanceField = document.getElementById("balance");
    if(balanceField) balanceField.value = balance;
}

// clear form
function clearForm(){

    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("kg").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("total").value = "";
    document.getElementById("paid").value = "";
    document.getElementById("balance").value = "";
}

// load on page
window.onload = function(){
    showData();
};

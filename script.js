// Ali Flour Mill Billing Software v3.0

let customers = JSON.parse(localStorage.getItem("customers")) || [];

// Dashboard Load
window.onload = function () {
    showDashboard();
};

// Dashboard
function showDashboard() {

    let list = document.getElementById("customerList");
    if (!list) return;

    list.innerHTML = "";

    let totalCustomers = customers.length;
    let totalKg = 0;
    let totalSales = 0;
    let totalBalance = 0;

    customers.forEach((customer) => {

        customer.records.forEach(record => {
            totalKg += Number(record.kg) || 0;
            totalSales += Number(record.total) || 0;
            totalBalance += Number(record.balance) || 0;
        });

        list.innerHTML += `
        <div class="card">
            <h3>${customer.name}</h3>
            <p>Total Entries : ${customer.records.length}</p>
        </div>
        `;
    });

    document.getElementById("totalCustomers").innerText = totalCustomers;
    document.getElementById("totalKg").innerText = totalKg + " KG";
    document.getElementById("totalSales").innerText = "₹" + totalSales;
    document.getElementById("totalBalance").innerText = "₹" + totalBalance;
}

// Search
function searchCustomer() {

    let text = document.getElementById("search").value.toLowerCase();

    let cards = document.querySelectorAll("#customerList .card");

    cards.forEach(card => {

        let name = card.querySelector("h3").innerText.toLowerCase();

        if (name.includes(text)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}
            

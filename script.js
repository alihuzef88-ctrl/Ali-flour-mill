let customers = JSON.parse(localStorage.getItem("customers")) || [];

// SAVE CUSTOMER ENTRY
function saveEntry() {

    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let kg = Number(document.getElementById("kg").value) || 0;
    let rate = Number(document.getElementById("rate").value) || 0;
    let total = kg * rate;
    let paid = Number(document.getElementById("paid").value) || 0;
    let balance = total - paid;

    let entry = {
        date: date,
        kg: kg,
        rate: rate,
        total: total,
        paid: paid,
        balance: balance
    };

    // check customer exist or not
    let customer = customers.find(c => c.name === name);

    if(!customer){
        customer = {
            name: name,
            records: []
        };
        customers.push(customer);
    }

    customer.records.push(entry);

    localStorage.setItem("customers", JSON.stringify(customers));

    alert("Saved Successfully ✔️");

    clearForm();
    showCustomers();
}

// SHOW ALL CUSTOMERS
function showCustomers() {

    let list = document.getElementById("list");
    if(!list) return;

    list.innerHTML = "";

    customers.forEach((c, index) => {

        let totalKg = 0;
        let totalAmount = 0;

        c.records.forEach(r => {
            totalKg += r.kg;
            totalAmount += r.total;
        });

        list.innerHTML += `
        <div class="card">
            <h2>${c.name}</h2>
            <p>Total KG: ${totalKg}</p>
            <p>Total Amount: ₹${totalAmount}</p>

            <button class="btn" onclick="viewCustomer(${index})">View Details</button>
        </div>
        `;
    });
}

// VIEW SINGLE CUSTOMER LEDGER
function viewCustomer(index){

    let customer = customers[index];

    let list = document.getElementById("list");

    list.innerHTML = `
        <h2>${customer.name} Ledger</h2>
        <button class="btn" onclick="showCustomers()">⬅ Back</button>
        <br><br>
    `;

    customer.records.forEach(r => {

        list.innerHTML += `
        <div class="card">
            <p>Date: ${r.date}</p>
            <p>KG: ${r.kg}</p>
            <p>Total: ₹${r.total}</p>
            <p>Paid: ₹${r.paid}</p>
            <p>Balance: ₹${r.balance}</p>
        </div>
        `;
    });
}

// DELETE CUSTOMER (optional)
function deleteCustomer(index){

    customers.splice(index,1);
    localStorage.setItem("customers", JSON.stringify(customers));
    showCustomers();
}

// CALCULATION
function calculateTotal(){
    let kg = Number(document.getElementById("kg").value) || 0;
    let rate = Number(document.getElementById("rate").value) || 0;
    document.getElementById("total").value = kg * rate;
}

function calculateBalance(){
    let total = Number(document.getElementById("total").value) || 0;
    let paid = Number(document.getElementById("paid").value) || 0;
    document.getElementById("balance").value = total - paid;
}

// CLEAR FORM
function clearForm(){
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("kg").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("total").value = "";
    document.getElementById("paid").value = "";
    document.getElementById("balance").value = "";
}

// LOAD
window.onload = showCustomers;

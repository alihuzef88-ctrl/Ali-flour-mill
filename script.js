let customers = JSON.parse(localStorage.getItem("customers")) || [];

/* ================= SAVE ENTRY ================= */
function saveEntry() {

    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let kg = Number(document.getElementById("kg").value) || 0;
    let rate = Number(document.getElementById("rate").value) || 0;

    let total = kg * rate;
    let paid = Number(document.getElementById("paid").value) || 0;
    let balance = total - paid;

    if(name === "" || date === ""){
        alert("Fill all fields");
        return;
    }

    let entry = { date, kg, rate, total, paid, balance };

    let customer = customers.find(c => c.name === name);

    if(!customer){
        customer = { name: name, records: [] };
        customers.push(customer);
    }

    customer.records.push(entry);

    localStorage.setItem("customers", JSON.stringify(customers));

    alert("Saved Successfully ✔️");

    clearForm();
    showCustomers();
}

/* ================= SHOW CUSTOMERS ================= */
function showCustomers(){

    let list = document.getElementById("list");
    if(!list) return;

    list.innerHTML = "";

    customers.forEach((c,i)=>{

        let kg = 0;
        let total = 0;

        c.records.forEach(r=>{
            kg += r.kg;
            total += r.total;
        });

        list.innerHTML += `
        <div class="card">
            <h3>${c.name}</h3>
            <p>Total KG: ${kg}</p>
            <p>Total ₹: ${total}</p>

            <button class="btn" onclick="viewCustomer(${i})">View</button>
        </div>
        `;
    });
}

/* ================= VIEW LEDGER ================= */
function viewCustomer(i){

    let c = customers[i];
    let list = document.getElementById("list");

    list.innerHTML = `
        <div class="card">
            <h2>${c.name} Ledger</h2>
            <button class="btn" onclick="showCustomers()">Back</button>
        </div>
    `;

    c.records.forEach(r=>{
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

/* ================= SEARCH ================= */
function searchCustomer(){

    let val = document.getElementById("search").value.toLowerCase();
    let list = document.getElementById("list");

    list.innerHTML = "";

    customers
    .filter(c => c.name.toLowerCase().includes(val))
    .forEach((c,i)=>{

        let kg = 0;
        let total = 0;

        c.records.forEach(r=>{
            kg += r.kg;
            total += r.total;
        });

        list.innerHTML += `
        <div class="card">
            <h3>${c.name}</h3>
            <p>KG: ${kg}</p>
            <p>Total: ₹${total}</p>
            <button class="btn" onclick="viewCustomer(${i})">Open</button>
        </div>
        `;
    });

    if(val === ""){
        showCustomers();
    }
}

/* ================= CALC ================= */
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

/* ================= CLEAR ================= */
function clearForm(){
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("kg").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("total").value = "";
    document.getElementById("paid").value = "";
    document.getElementById("balance").value = "";
}

/* ================= LOAD ================= */
window.onload = showCustomers;            

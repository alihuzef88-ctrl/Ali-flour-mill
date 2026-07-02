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
            function searchCustomer(){

    let text = document.getElementById("search").value.toLowerCase();

    let list = document.getElementById("list");

    list.innerHTML = "";

    customers
    .filter(c => c.name.toLowerCase().includes(text))
    .forEach((c,i)=>{

        let totalKg = 0;
        let totalAmount = 0;

        c.records.forEach(r=>{
            totalKg += r.kg;
            totalAmount += r.total;
        });

        list.innerHTML += `
        <div class="card">
            <h3>${c.name}</h3>

            <p>Total KG : ${totalKg}</p>

            <p>Total Amount : ₹${totalAmount}</p>

            <button class="btn"
            onclick="viewCustomer(${i})">
            View Ledger
            </button>

        </div>
        `;
    });

    if(text==""){
        showCustomers();
    }

}

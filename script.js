function calculateTotal() {
    let kg = parseFloat(document.getElementById("kg").value) || 0;
    let rate = parseFloat(document.getElementById("rate").value) || 0;

    let total = kg * rate;

    document.getElementById("total").value = total;
}

function calculateBalance() {
    let total = parseFloat(document.getElementById("total").value) || 0;
    let paid = parseFloat(document.getElementById("paid").value) || 0;

    document.getElementById("balance").value = total - paid;
}

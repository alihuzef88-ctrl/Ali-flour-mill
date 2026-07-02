button onclick="deleteEntry(${index})">Delete</button>
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

            

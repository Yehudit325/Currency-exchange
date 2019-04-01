/* Current implementation of code only shows 3 main currency exchanges:EUR, ILS, USD
    In order for more exchange rates to be shown, code needs to be written more dynamicly,
    always searching by object name */


// Function that enables enter keypress to reveal current rates
(function init(){
    document.addEventListener("keypress", function(event){
        var x = document.getElementById("amount").value;

        if(x.length !== 0 && event.code === "Enter"){
            showRates();
        }
    });
})();


var finalRates  = new Object;

function showRates() {
    var fromCurrency = document.getElementById("selected").value;
    var toCurrency = changeTo(fromCurrency);
    var url = 'https://api.exchangeratesapi.io/latest?base=' + fromCurrency +
                '&symbols=' + toCurrency[0] + ',' + toCurrency[1];
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {handle(data)});
}

// idea for more dynamic code: search for current from and return all the rest but from
function changeTo(from) {
    if (from === "USD") {
        return ["ILS", "EUR"];
    }else if (from === "ILS") {
        return ["USD", "EUR"];
    }else if (from === "EUR") {
        return ["ILS", "USD"];
    }
}

function handle(rates) {

    // Extract data from api into global object variable for ease of use
    finalRates[rates.base] = 1;
    finalRates[Object.keys(rates.rates)[0]] = Object.values(rates.rates)[0];
    finalRates[Object.keys(rates.rates)[1]] = Object.values(rates.rates)[1];

    fillTable("USD", 1);
    fillTable("ILS", 2);
    fillTable("EUR", 3);
}

// Fills table to be displayed in correct order
function fillTable(key, index) {
    var amount = document.getElementById("amount").value;
    var cell = document.getElementById("exchangeTable").rows[index].cells;
    var total = amount * finalRates[key];
    cell[1].innerHTML = total.toFixed(3);
}

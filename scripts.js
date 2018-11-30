
/*var request = new XMLHttpRequest();
request.open('GET', url, false);
request.send();
console.log(request.status);
console.log(request.statusText);
console.log(request);
console.log(request.response);
var data = JSON.parse(request.responseText);
console.log(data);*/
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
    var query = fromCurrency + '_' + toCurrency[0] + ',' +
        fromCurrency + '_' + toCurrency[1];
    var url = 'https://free.currencyconverterapi.com/api/v5/convert' +
        '?q=' + query + '&compact=ultra';
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
    var key = Object.keys(rates)[0].slice(0, 3);
    finalRates[key] = 1;

    orderRates(rates, 0);
    orderRates(rates, 1)

    fillTable("USD", 1);
    fillTable("ILS", 2);
    fillTable("EUR", 3);
}

function orderRates(rates, index) {
    var key = Object.keys(rates)[index].slice(4, 7);
    finalRates[key] = rates[Object.keys(rates)[index]];
}

function fillTable(key, index) {
    var amount = document.getElementById("amount").value;
    var x = document.getElementById("exchangeTable").rows[index].cells;
    var total = amount * finalRates[key];
    x[1].innerHTML = total.toFixed(3);
}



//Determine if a string is a palindrome
function palindrome(str) {
    var re = '.';
    var lowRegStr = str.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join(''); 
    return reverseStr === lowRegStr;
  }
   

// Returns an array of palidromes between numLow and numHigh
function palindromeArray(numLow, numHigh){
    var palindromeArray = [];
    let i = numLow;
    do {
        i+=.01;
        let n = i.toFixed(2);
        if (palindrome(n.toString())){
            palindromeArray.push(parseFloat(n));         
        }
    } while (i <= numHigh);
    return palindromeArray
}

var billAmount = document.getElementById("bill").value;
var tipPercentLow = document.getElementById("tipPercentLow").value;
var tipPercentHigh = document.getElementById("tipPercentHigh").value;


//Outputs all possible palindromic tips within the given parameters.
function findPalTips (billAmount, tipPercentLow, tipPercentHigh){
    tipArray = palindromeArray(billAmount*tipPercentLow*.01, billAmount*tipPercentHigh*.01);
    return tipArray;
};

//
function arrayTipsAndTotals(billAmount, tipArray){
    let i;
    var allTotalArray = [];
    for (i of tipArray){
        let total = Number(i)+ Number(billAmount)
        let n = total.toFixed(2)
        allTotalArray.push([i, n]);
    }
    return allTotalArray;
}

//Outputs an array of palindromic tips and their corresponding palendromic totals, if any exist.
function findPalTotals (billAmount, tipArray){
    let i;
    var palTotalArray = [];
    for (i of tipArray){
        let total = Number(billAmount) + Number(i);
        let n = total.toFixed(2)
        if (palindrome(n.toString())){
            palTotalArray.push([i, n]);
        }
    }
    return palTotalArray
}

//Use DOM maniuplation to print the resulting bill, tip, and total combinations.
function printResultsTable(billAmount, array){
    var table = document.getElementById("resultsTable");
    //Build the table head
    var thead = table.createTHead();
    let headRow = thead.insertRow();
    var head0 = headRow.insertCell(0);
    var head1 = headRow.insertCell(1);
    var head2 = headRow.insertCell(2);

    head0.innerHTML = "<b>Bill</b>";
    head1.innerHTML = "<b>Tip</b>";
    head2.innerHTML = "<b>Total</b>";


    //Print table results
    let i;
    for (i = 0; i < array.length; i++){
        var row = table.insertRow(i+1);

        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);

        cell0.innerHTML = "$" + billAmount;
        cell1.innerHTML = "$" + array[i][0];
        cell2.innerHTML = "$" + array[i][1];
    }
}

//Use DOM Manipulation to clear the table of old results
function clearTable(){
    var tableHeaderRowCount = 1;
    var table = document.getElementById('resultsTable');
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i <= rowCount; i++) {
        table.deleteRow(-1);
    }
}



//Event listener, main script calling all other scripts.
document.getElementById("submitButton").addEventListener('click', (e) => {

    clearTable();

    billAmount = document.getElementById("bill").value;
    tipPercentLow = document.getElementById("tipPercentLow").value;
    tipPercentHigh = document.getElementById("tipPercentHigh").value;

    tipArray = findPalTips (billAmount, tipPercentLow, tipPercentHigh)

    palTotalArray = findPalTotals(billAmount, tipArray);

    allTotalArray = arrayTipsAndTotals(billAmount, tipArray);

    if (palTotalArray && palTotalArray.length){
        document.getElementById("results").innerHTML = "Both tip and total can be palindromes!";
        printResultsTable(billAmount, palTotalArray)
    } else if (tipArray && tipArray.length){
        document.getElementById("results").innerHTML = "You can tip in palindrome.";
        printResultsTable(billAmount, allTotalArray)
    } else {
        document.getElementById("results").innerHTML = "Sorry, there are no palindromic tips available in that range.";
    }
}
);


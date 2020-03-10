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
        if (palindrome(total.toString())){
            palTotalArray.push([i, total]);
        }
    }
    return palTotalArray
}



//Event listener, main script calling all other scripts.
document.getElementById("submitButton").addEventListener('click', (e) => {
    billAmount = document.getElementById("bill").value;
    tipPercentLow = document.getElementById("tipPercentLow").value;
    tipPercentHigh = document.getElementById("tipPercentHigh").value;

    tipArray = findPalTips (billAmount, tipPercentLow, tipPercentHigh)

    palTotalArray = findPalTotals(billAmount, tipArray);

    allTotalArray = arrayTipsAndTotals(billAmount, tipArray);

    if (palTotalArray && palTotalArray.length){
        document.getElementById("results").innerHTML = "Both tip and total can be palindromes!";
    } else if (tipArray && tipArray.length){
        document.getElementById("results").innerHTML = "You can tip in palindrome!";
    } else {
        document.getElementById("results").innerHTML = "There are no palindromic tips available in that range.";
    }
}
);


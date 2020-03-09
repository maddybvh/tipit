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
            palindromeArray.push(n);            
        }
    } while (i <= numHigh); 
    return palindromeArray
}

var billAmount = document.getElementById("bill").value;
var tipPercentLow = document.getElementById("tipPercentLow").value;
var tipPercentHigh = document.getElementById("tipPercentHigh").value;
var tipArray = [];
var totalArray = [];



function findPalTips (billAmount, tipPercentLow, tipPercentHigh){
    tipArray = palindromeArray(billAmount*tipPercentLow*.01, billAmount*tipPercentHigh*.01);
    return tipArray;
};

//Outputs an array of palindromic tips and their corresponding palendromic totals, if any exist.
function findPalTotals (billAmount, tipArray){
    let i;
    var totalArray = [];
    for (i of tipArray){
        let total = Number(billAmount) + Number(i);
        console.log(total);
        if (palindrome(total.toString())){
            totalArray.push([i, total]);
        }
    }
    return totalArray
}

document.getElementById("submitButton").addEventListener('click', (e) => {
    billAmount = document.getElementById("bill").value;
    tipPercentLow = document.getElementById("tipPercentLow").value;
    tipPercentHigh = document.getElementById("tipPercentHigh").value;

    tipArray = findPalTips (billAmount, tipPercentLow, tipPercentHigh)
    console.log(tipArray);

    totalArray = findPalTotals(billAmount, tipArray);
    console.log(totalArray);

});


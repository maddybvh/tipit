//Determine if a string is a palindrome
function palindrome(str) {
  var re = '.';
  var lowRegStr = str.toLowerCase().replace(re, '');
  var reverseStr = lowRegStr
    .split('')
    .reverse()
    .join('');
  return reverseStr === lowRegStr;
}

// Returns an array of palindromes between numLow and numHigh
function palindromeArray(numLow, numHigh) {
  var palindromeArray = [];

  for (let i = numLow; i <= numHigh; i += 0.01) {
    let n = i.toFixed(2);
    if (palindrome(n.toString())) {
      palindromeArray.push(parseFloat(n));
    }
  }
  return palindromeArray;
}

var billAmount = document.getElementById('bill').value;
var tipPercentLow = document.getElementById('tipPercentLow').value;
var tipPercentHigh = document.getElementById('tipPercentHigh').value;

//Outputs all possible palindromic tips within the given parameters.
function findPalTips(billAmount, tipPercentLow, tipPercentHigh) {
  tipArray = palindromeArray(
    billAmount * tipPercentLow * 0.01,
    billAmount * tipPercentHigh * 0.01
  );
  return tipArray;
}

//
function arrayTipsAndTotals(billAmount, tipArray) {
  let i;
  var allTotalArray = [];
  for (i of tipArray) {
    let total = Number(i) + Number(billAmount);
    let n = total.toFixed(2);
    allTotalArray.push([i, n]);
  }
  return allTotalArray;
}

//Outputs an array of palindromic tips and their corresponding palindromic totals, if any exist.
function findPalTotals(billAmount, tipArray) {
  let i;
  var palTotalArray = [];
  for (i of tipArray) {
    let total = Number(billAmount) + Number(i);
    let n = total.toFixed(2);
    if (palindrome(n.toString())) {
      palTotalArray.push([i, n]);
    }
  }
  return palTotalArray;
}

//Use DOM manipulation to print the resulting bill, tip, and total combinations.
function printResultsTable(billAmount, array) {
  var table = document.getElementById('resultsTable');
  table.classList.remove('d-none');

  var tableBody = table.querySelector('tbody');

  //Print table results
  for (let i = 0; i < array.length; i++) {
    var row = tableBody.insertRow(i);

    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);

    cell0.innerHTML = '$' + billAmount;
    cell1.innerHTML = '$' + array[i][0];
    cell2.innerHTML = '$' + array[i][1];
  }
}

//Use DOM Manipulation to clear the table of old results
function clearTable() {
  var table = document.getElementById('resultsTable');
  var tableBody = table.querySelector('tbody');

  tableBody.innerHTML = '';
}

//Event listener, main script calling all other scripts.
document.getElementById('tip-form').addEventListener('submit', e => {
  e.preventDefault();
  clearTable();

  billAmount = document.getElementById('bill').value;
  tipPercentLow = document.getElementById('tipPercentLow').value;
  tipPercentHigh = document.getElementById('tipPercentHigh').value;

  tipArray = findPalTips(billAmount, tipPercentLow, tipPercentHigh);

  palTotalArray = findPalTotals(billAmount, tipArray);

  allTotalArray = arrayTipsAndTotals(billAmount, tipArray);

  if (palTotalArray && palTotalArray.length) {
    document.getElementById('results').innerHTML =
      'Both tip and total can be palindromes!';
    printResultsTable(billAmount, palTotalArray);
  } else if (tipArray && tipArray.length) {
    document.getElementById('results').innerHTML = 'You can tip in palindrome.';
    printResultsTable(billAmount, allTotalArray);
  } else {
    document.getElementById('results').innerHTML =
      'Sorry, there are no palindromic tips available in that range.';
  }
});

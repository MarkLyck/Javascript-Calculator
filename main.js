// TODO, when pressing enter after having pressed a number, it adds the number to the textfield,
// like the number was clicked again. The expected result is calc();

// TODO, check if they have an unclosed parenhesis and if they do display an alert box :D

// Memory should be an array of arrays

window.onload = function () {

  var expression = [];
  var number1 = '';
  var number2 = '';
  var op = '';
  var degreeType = "Deg";
  var EE = false;

  // Using KeyUp here instead of keypress, so it will catch backspace
  document.body.addEventListener('keyup', function(e) {
    var key = e.keyCode;
    // If the ENTER key is pressed
    if (key === 13) {
      e.preventDefault();
      calc();
    // If the BACKSPACE key is pressed
    } else if (key === 8) {
      e.preventDefault(); // Doesn't work
    //   input.value = input.value.substr(0, input.value.length - 1);
    //   calc();
    }
  });
  // TODO, remove this and replace with individual event listeners! BAD PRACTICE
  var buttons = document.getElementsByTagName('button'); // Select all buttons

  // Main parts
  var result = document.querySelector('#output');
  var input = document.querySelector('#input');

  // Special keys
  var clear = document.querySelector('#clear');
  clear.addEventListener('click', function(){
    input.value = '';
    result.innerHTML = 0;
    expression = [];
    numberCombiner = '';
    number1 = '';
    number2 = '';
    op = '';
    console.log("=================");
    console.log("CLEARED");
    console.log("=================");
  });
  var plusMinus = document.querySelector('#plus-minus');
  plusMinus.addEventListener('click', function(){
    // TODO, EXTRA feature Find out where the cursor is. and set the index to the cursor location
    expression = input.value.split("");
    // Create a loop to go back 1 index at a time, until it reaches something that's NaN
    expressionCounter = expression.length -1;
    while(expressionCounter >= -1) {
      if (isNaN(expression[expressionCounter])) {
        var newOp = '';
        if (expression[expressionCounter] === '+') {
          newOp = '-';
          expression.splice(expressionCounter, 1); //Remove the operator
          expression.splice(expressionCounter, 0, newOp); // add the minus.
        } else if (expression[expressionCounter] === '-') {
          newOp = '+';
          expression.splice(expressionCounter, 1); //Remove the operator
          expression.splice(expressionCounter, 0, newOp); // add the plus.
        } else if (expression[expressionCounter] === undefined) { // This runs if there's only 1 number
          newOp = '-';
          expression.unshift(newOp);
          input.value = expression.join('');
        }
        input.value = expression.join('');
        break; // When we find a NaN, we break out of the loop
      }
      expressionCounter--;
    }
    calc();
  });
  var percentage = document.querySelector('#percentage');
  percentage.addEventListener('click', function(){
    expression = input.value.split("");
    expressionCounter = expression.length -1;
    var fullNumber = '';
    while(!isNaN(expression[expressionCounter])) {
      // console.log(expression[expressionCounter]);
      fullNumber = expression[expressionCounter] + fullNumber;
      expression.splice(expressionCounter, 1); //Remove the Number
      expressionCounter--;
    }
    var percentCalculated = Number(fullNumber)/100;
    if (expression[expressionCounter] === undefined) {
      expression.unshift(percentCalculated);
      input.value = expression.join('');
    } else {
      expression.splice(expressionCounter + 1, 0, percentCalculated); // add the minus.
      input.value = expression.join('');
    }
    calc();
  });
  // Operators
  var plus = document.querySelector('#addition');
  plus.addEventListener('click', function(){input.value  += '+';});
  var minus = document.querySelector('#subtract');
  minus.addEventListener('click', function(){input.value  += '-';});
  var divide = document.querySelector('#divide');
  divide.addEventListener('click', function(){input.value  += '/';});
  var multiply = document.querySelector('#multiply');
  multiply.addEventListener('click', function(){input.value  += '*';});
  var equals = document.querySelector('#equals');
  equals.addEventListener('click', function(){calc();});

  // Numbers
  var numbers = document.querySelectorAll('.number');
  for (var index = 0; index < numbers.length; index += 1) {
    numbers[index].addEventListener("click", addValue.bind(null, index));
  }
  var decimal = document.querySelector('.decimal');
  decimal.addEventListener('click', function(){input.value  += '.';});

  function addValue(index) {
    input.value += numbers[index].innerText;
    calc();
  }

//   SSSSSSSSSSSSSSS         CCCCCCCCCCCCC  IIIIIIIIII  EEEEEEEEEEEEEEEEEEEEEE
// SS:::::::::::::::S     CCC::::::::::::C  I::::::::I  E::::::::::::::::::::E
// S:::::SSSSSS::::::S   CC:::::::::::::::C I::::::::I  E::::::::::::::::::::E
// S:::::S     SSSSSSS  C:::::CCCCCCCC::::C II::::::II  EE::::::EEEEEEEEE::::E
// S:::::S             C:::::C       CCCCCC   I::::I      E:::::E       EEEEEE
// S:::::S            C:::::C                 I::::I      E:::::E
// S::::SSSS         C:::::C                  I::::I      E::::::EEEEEEEEEE
//  SS::::::SSSSS    C:::::C                  I::::I      E:::::::::::::::E
//    SSS::::::::SS  C:::::C                  I::::I      E:::::::::::::::E
//       SSSSSS::::S C:::::C                  I::::I      E::::::EEEEEEEEEE
//            S:::::SC:::::C                  I::::I      E:::::E
//            S:::::S C:::::C       CCCCCC    I::::I      E:::::E       EEEEEE
// SSSSSSS     S:::::S  C:::::CCCCCCCC::::C II::::::II  EE::::::EEEEEEEE:::::E
// S::::::SSSSSS:::::S   CC:::::::::::::::C I::::::::I  E::::::::::::::::::::E
// S:::::::::::::::SS      CCC::::::::::::C I::::::::I  E::::::::::::::::::::E
// SSSSSSSSSSSSSSS           CCCCCCCCCCCCC  IIIIIIIIII  EEEEEEEEEEEEEEEEEEEEEE

  // Scientific Functions
  // <button id="parenthesis-1" type="button" name="button">(</button>
  var par1 = document.querySelector('#parenthesis-1');
  par1.addEventListener('click', function(){input.value  += '(';});
  par1.style.background = "lightgreen";
  // <button id="parenthesis-2" type="button" name="button">)</button>
  var par2 = document.querySelector('#parenthesis-2');
  par2.addEventListener('click', function(){input.value  += ')'; calc();});
  par2.style.background = "lightgreen";
  // <button id="mc" type="button" name="button">mc</button>
  // <button id="mPlus" type="button" name="button">m+</button>
  // <button id="mMinus-2" type="button" name="button">m-</button>
  // <button id="mr" type="button" name="button">mr</button>
  //
  // <button id="second" type="button" name="button">2nd</button>
  // <button id="X2" type="button" name="button">X2</button>
  var squared = document.querySelector('#squared');
  squared.addEventListener('click', function(){input.value  += '^2';});
  squared.style.background = "yellow";
  // <button id="X3" type="button" name="button">X3</button>
  var squared3 = document.querySelector('#squared-3');
  squared3.addEventListener('click', function(){input.value  += '^3';});
  squared3.style.background = "yellow";
  // <button id="Xy" type="button" name="button">Xy</button>
  var squaredy = document.querySelector('#squared-y');
  squaredy.addEventListener('click', function(){input.value  += '^';});
  squaredy.style.background = "yellow";
  // <button id="eX" type="button" name="button">eX</button>
  var eSquared = document.querySelector('#e-squared');
  eSquared.addEventListener('click', function(){input.value  += 'e^';});
  eSquared.style.background = "yellow";
  // <button id="tenX" type="button" name="button">10X</button>
  var tenSquared = document.querySelector('#ten-squared');
  tenSquared.addEventListener('click', function(){input.value  += '10^';});
  tenSquared.style.background = "yellow";

  // <button id="oneDividendX" type="button" name="button">1/X</button>
  var oneDivided = document.querySelector('#one-divided-x');
  oneDivided.addEventListener('click', function(){input.value  += '1/';});
  oneDivided.style.background = "yellow";
  // <button id="twoSquareRootX" type="button" name="button">2SQX</button>
  var twoSquareRoot = document.querySelector('#two-squareroot-x');
  twoSquareRoot.addEventListener('click', function(){input.value  += '2sqr(';});
  twoSquareRoot.style.background = "yellow";
  // <button id="threeSquareRootX" type="button" name="button">3SQX</button>
  var threeSquareRoot = document.querySelector('#three-squareroot-x');
  threeSquareRoot.addEventListener('click', function(){input.value  += '3sqr(';});
  threeSquareRoot.style.background = "yellow";
  // <button id="ySquareRootX" type="button" name="button">2SQX</button>
  var ySquareRoot = document.querySelector('#y-squareRoot-x');
  ySquareRoot.addEventListener('click', function(){input.value  += 'sqr(';});
  ySquareRoot.style.background = "yellow";
  // <button id="ln" type="button" name="button">ln</button>
  var ln = document.querySelector('#ln');
  ln.addEventListener('click', function(){input.value  += 'ln(';});
  ln.style.background = "yellow";
  // <button id="logTen" type="button" name="button">log10</button>
  var log = document.querySelector('#log-ten');
  log.addEventListener('click', function(){input.value  += 'log(';});
  log.style.background = "lightgreen";
  //
  // <button id="XEsclamation" type="button" name="button">X!</button>
  var factor = document.querySelector('#factor');
  factor.addEventListener('click', function(){input.value  += '!';});
  factor.style.background = "yellow";
  // <button id="sin" type="button" name="button">sin</button>
  var sin = document.querySelector('#sin');
  sin.addEventListener('click', function(){input.value  += 'sin(';});
  sin.style.background = "yellow";
  // <button id="cos" type="button" name="button">cos</button>
  var cos = document.querySelector('#cos');
  cos.addEventListener('click', function(){input.value  += 'cos(';});
  cos.style.background = "yellow";
  // <button id="tan" type="button" name="button">tan</button>
  var tan = document.querySelector('#tan');
  tan.addEventListener('click', function(){input.value  += 'tan(';});
  tan.style.background = "yellow";
  // <button id="e" type="button" name="button">e</button>
  var e = document.querySelector('#e');
  e.addEventListener('click', function(){input.value  += 'e'; calc();});
  e.style.background = "lightgreen";
  // <button id="EE" type="button" name="button">EE</button>
  var EEbutton = document.querySelector('#EE');
  EEbutton.addEventListener('click', function(){
    EEbutton = true;
  });
  EEbutton.style.background = "yellow";
  // <button id="rad" type="button" name="button">Rad</button>
  var rad = document.querySelector('#rad');
  rad.addEventListener('click', function(){
    degreeType = 'Rad';
    //TODO add something to show the user that they are using Rad instead of Deg
  });
  rad.style.background = "lightgreen";
  // <button id="sinh" type="button" name="button">sinh</button>
  var sinh = document.querySelector('#sinh');
  sinh.addEventListener('click', function(){input.value  += 'sinh(';});
  sinh.style.background = "yellow";
  // <button id="cosh" type="button" name="button">cosh</button>
  var cosh = document.querySelector('#cosh');
  cosh.addEventListener('click', function(){input.value  += 'cosh(';});
  cosh.style.background = "yellow";
  // <button id="tanh" type="button" name="button">tanh</button>
  var tanh = document.querySelector('#tanh');
  tanh.addEventListener('click', function(){input.value  += 'tan(';});
  tanh.style.background = "yellow";
  // <button id="pi" type="button" name="button">π</button>
  var pi = document.querySelector('#pi');
  pi.addEventListener('click', function(){input.value  += 'π'; calc();});
  pi.style.background = "lightgreen";
  // <button id="rand" type="button" name="button">Rand</button>
  var rand = document.querySelector('#rand');
  rand.addEventListener('click', function(){input.value  += 'rand';});
  rand.style.background = "yellow";

//   CCCCCCCCCCCCC                       AAA               LLLLLLLLLLL                     CCCCCCCCCCCCC
// CCC::::::::::::C                     A:::A              L:::::::::L                  CCC::::::::::::C
// CC:::::::::::::::C                  A:::::A             L:::::::::L                CC:::::::::::::::C
// C:::::CCCCCCCC::::C                A:::::::A            LL:::::::LL               C:::::CCCCCCCC::::C
// C:::::C       CCCCCC              A:::::::::A             L:::::L                C:::::C       CCCCCC
// C:::::C                          A:::::A:::::A            L:::::L               C:::::C
// C:::::C                        A:::::A A:::::A           L:::::L               C:::::C
// C:::::C                       A:::::A   A:::::A          L:::::L               C:::::C
// C:::::C                      A:::::A     A:::::A         L:::::L               C:::::C
// C:::::C                     A:::::AAAAAAAAA:::::A        L:::::L               C:::::C
// C:::::C                    A:::::::::::::::::::::A       L:::::L               C:::::C
// C:::::C       CCCCCC      A:::::AAAAAAAAAAAAA:::::A      L:::::L         LLLLLL C:::::C       CCCCCC
// C:::::CCCCCCCC::::C      A:::::A             A:::::A   LL:::::::LLLLLLLLL:::::L  C:::::CCCCCCCC::::C
// CC:::::::::::::::C      A:::::A               A:::::A  L::::::::::::::::::::::L   CC:::::::::::::::C
// CCC::::::::::::C       A:::::A                 A:::::A L::::::::::::::::::::::L     CCC::::::::::::C
//   CCCCCCCCCCCCC       AAAAAAA                   AAAAAAALLLLLLLLLLLLLLLLLLLLLLLL        CCCCCCCCCCCCC


  function calc() {
    if(input.value === '') { // If the input is empty, we just set the result to 0;
      result.innerHTML = 0;
    } else {
      // Here we take out input field and split every character into the expression array;
      expression = input.value.split("");

      var combinedExpression = combineArray(expression);

      // ----------------------------------
      //    ORDER OF OPERATION Functions
      // ----------------------------------
      // Calculate scientific things
      combinedExpression = scienceCalc(combinedExpression);
      // parenthesis
      combinedExpression = parenthesis(combinedExpression);
      // Calculate ^ and sqr
      // Calculate * & /
      combinedExpression = multiplyAndDivide(combinedExpression);
      // Calculate + and -
      var finalResult = plusAndMinus(combinedExpression);
      result.innerHTML = finalResult;
    }
  } // End calc



  function combineArray(arr) {
    var outputArray = [];
    var numberCombiner = '';
    arr.forEach(function (item, index, array) { // Here we are combining the individual numbers in our array.
        if (isNaN(item)) {
          // If it's a '.' We still need to add it to the numberCombiner
          if (item === '.') {
            numberCombiner = numberCombiner + item;
            if (index === 0) { // If the user types '.' as the first thing, we want to replace that with 0.
              numberCombiner = '0.';
            }
          } else if (item === 'π'){
            if (numberCombiner === '') {
              outputArray.push(Math.PI);
            } else {
              outputArray.push(Number(numberCombiner)*Math.PI);
              numberCombiner = '';
            }

          } else if (item === 'e') {
            if (numberCombiner === '') {
              outputArray.push(Math.E);
            } else {
              outputArray.push(Number(numberCombiner)*Math.E);
              numberCombiner = '';
            }
          } else {

            if (numberCombiner !== '') {
              outputArray.push(numberCombiner);
            }
            outputArray.push(item);
            numberCombiner = '';
          }
        } else { // Else we add them to the numberCombiner
          numberCombiner = numberCombiner + item;
          if (index === array.length - 1) { // If the last item is a number, we just want to push it.
            outputArray.push(numberCombiner);
            numberCombiner = '';
          }
        }
    });
    return outputArray;
  }



//   OOOOOOOOO          OOOOOOOOO             CCCCCCCCCCCCC
// OO:::::::::OO      OO:::::::::OO        CCC::::::::::::C
// OO:::::::::::::OO  OO:::::::::::::OO    CC:::::::::::::::C
// O:::::::OOO:::::::OO:::::::OOO:::::::O  C:::::CCCCCCCC::::C
// O::::::O   O::::::OO::::::O   O::::::O C:::::C       CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O:::::O     O:::::OO:::::O     O:::::OC:::::C        CCCCCC
// O::::::O   O::::::OO::::::O   O::::::O C:::::C       CCCCCC
// O:::::::OOO:::::::OO:::::::OOO:::::::O  C:::::CCCCCCCC::::C
// OO:::::::::::::OO  OO:::::::::::::OO    CC:::::::::::::::C
// OO:::::::::OO      OO:::::::::OO        CCC::::::::::::C
//   OOOOOOOOO          OOOOOOOOO             CCCCCCCCCCCCC


function scienceCalc(arr) {
  console.log('CE BEFORE: ' + arr);
  var arrAsString = arr.join('');
  while (arrAsString.indexOf("log(") >= 0) { // If the expression contains log
    console.log("=== LOG ===");
    var regExp = '(log)\(([^)]+)\)';
    var log = arrAsString.match(regExp)[2];
    var testArray = log.split('');
    var indexesToSplice = testArray.length;
    testArray.shift(); // Remove a leftover parenthesis at the beginning
    testArray = combineArray(testArray);
    testArray = parenthesis(testArray);
    testArray = multiplyAndDivide(testArray);
    var logResult = plusAndMinus(testArray);
    logResult = Math.log10(logResult);

    var logIndex = arr.indexOf('l');
    if (logIndex >= 0 && arr[logIndex+1] === 'o' && arr[logIndex+2] === 'g'){
      arr.splice(logIndex, indexesToSplice + 4);
      arr.splice(logIndex, 0, logResult);
    }
    arrAsString = arr.join(''); // Reset arrAsString
  }
  console.log('CE RETURN: ' + arr);
  return arr;
}

function parenthesis(arr) {
  var arrAsString = arr.join('');
  if (arr.indexOf("(") >= 0) { // If the expression contains a (
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(arrAsString); // This will throw an error if there's no ending parenthesis
    var testArray = matches[1].split("");
    testArray = combineArray(testArray);
    testArray = multiplyAndDivide(testArray);
    var parenthesisResult = plusAndMinus(testArray);
    if (testArray.indexOf("(") >= 0) { // If there are nested parenthesis
      console.log("ERROR: No support for nested parentheses yet.");
      // TODO allow nested parentheses
    } else {
      // Splice arr starting at the first '(' and ending at the first '('
      var indexesToSplice = arr.indexOf(")") - arr.indexOf("(");
      var insertAtIndex = arr.indexOf("(");
      arr.splice(insertAtIndex, indexesToSplice + 1);
      arr.splice(insertAtIndex, 0, parenthesisResult);
    }
  }
  return arr;
}

  function multiplyAndDivide(arr) {
    var oooResult = 0;
    // Multiplication and Dividends
    while (arr.indexOf('*') >= 0 || arr.indexOf('/') >= 0) {
      var multiplyIndex = arr.indexOf('*');
      var divideIndex = arr.indexOf('/');
      if (multiplyIndex > divideIndex) { // If multiply comes first
        oooResult = Number(arr[multiplyIndex-1]) * Number(arr[multiplyIndex+1]);
        arr.splice(multiplyIndex + 1, 1);
        arr.splice(multiplyIndex, 1);
        arr.splice(multiplyIndex - 1, 1);
        // console.log("CE before: " + combinedExpression);
        // Splice can't be used if the array is empty, so we need to test this.
        if (arr.length === 0) {
          arr.push(oooResult);
        } else if (multiplyIndex - 1 === 0) {
          arr.unshift(oooResult);
        } else {
          arr.splice(multiplyIndex - 1, 0, oooResult);
        }
      // console.log(combinedExpression);
      } else { // If divide comes first
        oooResult = Number(arr[divideIndex-1]) / Number(arr[divideIndex+1]);
        arr.splice(divideIndex + 1, 1);
        arr.splice(divideIndex, 1);
        arr.splice(divideIndex - 1, 1);
        // Splice can't be used if the array is empty, so we need to test this.
        if (arr.length === 0) {
          arr.push(oooResult);
        // Splice also can't be used for the first item in an array
        } else if (divideIndex - 1 === 0) {
          arr.unshift(oooResult);
        } else {
          arr.splice(divideIndex - 1, 0, oooResult);
        }
      }
    }
    return arr;
  }




  function plusAndMinus(arr) {
    // Reset values
    var number1 = '';
    var op = '';
    // Loop through array and calculate left to right.
    arr.forEach(function (item, index, array) {
      if (array.length === 1) {
        result.innerHTML = item;
      }
      if (index === 0) {
        number1 = item;
      } else if (isNaN(item)) {
        op = item;
      } else {
        number2 = item;
        // ----------------------------------
        //   LAST ADDITION AND SUBTRACTION
        // ----------------------------------
        if (op === '+') {
          console.log(Number(number1) + Number(number2));
          number1 = Number(number1) + Number(number2);
          result.innerHTML = number1;
        } else if (op === '-') {
          console.log(Number(number1) - Number(number2));
          number1 = Number(number1) - Number(number2);
          result.innerHTML = number1;
        } else {
          console.log("========================");
          console.log("ERROR: Unknown operator: " + op);
          console.log("========================");
        }
      }
    }); // End Loop
    return number1;
  }








}; // End window.onload

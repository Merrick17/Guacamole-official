export function isScientificNotation(num: number) {
  return num.toString().includes('e');
}

function extractTrailingZerosAndDigits(numberString) {
  let integerPart = '';
  let trailingZeros = '';
  let nonZeroDigits = '';

  const decimalIndex = numberString.indexOf('.');
  if (decimalIndex >= 0) {
    const digits = numberString.slice(decimalIndex + 1);
    digits.split('').forEach((digit) => {
      if (digit === '0' && !nonZeroDigits) {
        trailingZeros += digit;
      } else {
        nonZeroDigits += digit;
      }
    });
    integerPart = numberString.slice(0, decimalIndex);
  } else {
    nonZeroDigits = numberString;
  }

  return [integerPart, trailingZeros, nonZeroDigits];
}
function getSubscriptForNumber(number) {
  const subscriptMap = {
    '0': '\u2080',
    '1': '\u2081',
    '2': '\u2082',
    '3': '\u2083',
    '4': '\u2084',
    '5': '\u2085',
    '6': '\u2086',
    '7': '\u2087',
    '8': '\u2088',
    '9': '\u2089',
  };

  let subscriptString = '';
  for (let digit of String(number)) {
    subscriptString += subscriptMap[digit];
  }
  return subscriptString;
}
// export function convert(n) {
//   let str = '';
//   var sign = +n < 0 ? '-' : '',
//     toStr = n.toString();
//   if (!/e/i.test(toStr)) {
//     str = n;
//   }
//   var [lead, decimal, pow] = n
//     .toString()
//     .replace(/^-/, '')
//     .replace(/^([0-9]+)(e.*)/, '$1.$2')
//     .split(/e|\./);

//   // Handle the case when decimal is undefined
//   if (decimal === undefined) {
//     return `${sign}${lead}`;
//   }

//   str =
//     +pow < 0
//       ? sign +
//         '0.' +
//         '0'.repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) +
//         lead +
//         decimal
//       : sign +
//         lead +
//         (+pow >= decimal.length
//           ? decimal + '0'.repeat(Math.max(+pow - decimal.length || 0, 0))
//           : decimal.slice(0, +pow) + '.' + decimal.slice(+pow));

//   const [integerPart, trailingZeros, nonZeroDigits] =
//     extractTrailingZerosAndDigits(str);
//   // console.log('INT', integerPart); // Output: "123"
//   // console.log('TRAILING', trailingZeros); // Output: "0000000"
//   // console.log('ZERO', nonZeroDigits); // Output: "11586"
//   // console.log('SubSript', getSubscriptForNumber(trailingZeros.length));
//   return `${integerPart}.0${getSubscriptForNumber(
//     trailingZeros.length
//   )}${nonZeroDigits}`;
// }
export  function convert(n) {
  let str = '';
  var sign = +n < 0 ? '-' : '',
    toStr = n.toString();
  if (!/e/i.test(toStr)) {
    str = n;
  }
  var [lead, decimal, pow] = n
    .toString()
    .replace(/^-/, '')
    .replace(/^([0-9]+)(e.*)/, '$1.$2')
    .split(/e|\./);

  // Handle the case when decimal is undefined
  if (decimal === undefined) {
    return `${sign}${lead}`;
  }

  str =
    +pow < 0
      ? sign +
        '0.' +
        '0'.repeat(Math.max(Math.abs(pow) - 1 || 0, 0)) +
        lead +
        decimal
      : sign +
        lead +
        (+pow >= decimal.length
          ? decimal + '0'.repeat(Math.max(+pow - decimal.length || 0, 0))
          : decimal.slice(0, +pow) + '.' + decimal.slice(+pow));

  const [integerPart, trailingZeros, nonZeroDigits] =
    extractTrailingZerosAndDigits(str);

  if (trailingZeros.length === 0) {
    return `${integerPart}.${nonZeroDigits}`;
  } else {
    return `${integerPart}.0${getSubscriptForNumber(trailingZeros.length)}${nonZeroDigits}`;
  }
}
export function formatNumber(number) {
  // Remove the exponent from the number.
  var exponent = number.match(/e-(\d+)/)[1];
  number = number.slice(0, -exponent);

  // Multiply the number by 10 raised to the exponent.
  number *= Math.pow(10, exponent);

  // Convert the number to a string.
  var stringNumber = number.toString();

  // Pad the number with zeros to the left if it is less than 1.
  if (stringNumber.length < 7) {
    stringNumber = '0'.repeat(7 - stringNumber.length) + stringNumber;
  }

  // Replace the decimal point with a ₇.
  stringNumber = stringNumber.replace('.', '₇');

  // Return the formatted number.
  return stringNumber;
}

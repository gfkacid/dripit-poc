import _isNumber from "lodash/isNumber";
import _isString from "lodash/isString";

export const numberToStr = (number, decimalScale, minDecimalFraction) => {
  let formattedNumber = number;

  if (_isString(number) && number?.includes(",")) {
    formattedNumber = Number(number.replace(/[^\d\.\-]/g, ""));
  }

  formattedNumber = parseFloat(formattedNumber);

  return !isNaN(formattedNumber)
    ? formattedNumber.toLocaleString("en", {
        minimumFractionDigits:
          minDecimalFraction !== undefined ? minDecimalFraction : 0,
        maximumFractionDigits: decimalScale !== undefined ? decimalScale : 2,
      })
    : "-";
};

export const displayPrice = (price) => {
  return numberToStr(price / 100, 2, 2);
};

export const displayBlockchainAddress = (address) => {
  if(!address) return '';
  return address.toString().substring(0, 5) + '...' + address.substring(address.length - 4)
}

export const displaySocialNums = (num) => {
  let formatted = num;
  if(num >=1000){
    const split = (num/1000).toString().split('.')
    formatted = split[0] + (split[1] ? '.' + split[1][0]:'') + 'k'
  }
  return formatted.toString()
}

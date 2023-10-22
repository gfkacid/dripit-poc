import _isNumber from "lodash/isNumber";
import _isString from "lodash/isString";
import moment from "moment";

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
  if (!address) return "";
  return (
    address.toString().substring(0, 5) +
    "..." +
    address.substring(address.length - 4)
  );
};

export const displaySocialNums = (num) => {
  let formatted = num;
  if (num >= 1000) {
    const split = (num / 1000).toString().split(".");
    formatted = split[0] + (split[1] ? "." + split[1][0] : "") + "k";
  }
  return formatted.toString();
};

export const retryRevolveTaskStatus = (fn, ms, maxRetries) => {
  let retries = maxRetries;

  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch(() => {
        setTimeout(() => {
          console.log("Retrying...", retries);
          if (retries <= maxRetries && retries !== 0) {
            retries--;
            retryRevolveTaskStatus(fn, ms, retries).then(resolve);
          } else {
            reject("Failed to resolve status");
          }
        }, ms);
      });
  });
};

export const dropIsUpcoming = (drop) =>
  drop?.starts_at && moment(drop?.starts_at).isAfter(moment());

export const dropHasEnded = (drop) =>
  drop?.ends_at && moment(drop?.ends_at).isBefore(moment());

export const dropIsActive = (drop) =>
  drop?.starts_at &&
  drop?.ends_at &&
  moment().isAfter(drop?.starts_at) &&
  moment().isBefore(drop?.ends_at);

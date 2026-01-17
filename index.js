"use strict";

const numberChars = "0123456789";
const letterChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const specialChars = "~!@#$%^*()_+-=[]{}|;:,./<>?";

// 缓存常用字符集组合
const defaultChars = numberChars + letterChars; // 默认（数字+字母）
const fullChars = numberChars + letterChars + specialChars; // 完整（数字+字母+特殊）

const array = new Uint32Array(1);

/**
 * Get cryptographically secure random value in [0, max)
 * @param {Number} max - Upper bound (exclusive)
 * @returns {Number} Random value
 */
function getSecureRandom(max) {
  if (typeof crypto === "undefined" || !crypto.getRandomValues) {
    throw new Error("Cannot get secure random number");
  }

  // 计算最大可接受的值（能被max整除的最大值）
  const limit = Math.floor(0xffffffff / max) * max;

  let randomValue;
  do {
    crypto.getRandomValues(array);
    randomValue = array[0];
  } while (randomValue >= limit); // 拒绝采样，防止模偏差漏洞

  return randomValue % max;
}

/**
 * Generate random string
 * @param {Number} length
 * @param {Object} options
 */
function random(length, options) {
  let numbers;
  let letters;
  let specials;
  if (options && typeof options === "object") {
    if (Object.hasOwn(options, "numbers")) numbers = options.numbers;
    if (Object.hasOwn(options, "letters")) letters = options.letters;
    if (Object.hasOwn(options, "specials")) specials = options.specials;

    if (numbers === false && letters === false && specials === false) {
      throw new Error("Cannot generate random string with no characters");
    }
  }

  if (length <= 0) return "";

  length = parseInt(length || 8);

  if (length > 4096) {
    throw new Error("Cannot generate random string with length > 4096");
  }

  let chars = "";
  let result = "";

  if (options === true) {
    chars = fullChars;
  } else if (typeof options == "string") {
    chars = options;
  } else if (
    numbers === undefined &&
    letters === undefined &&
    specials === undefined
  ) {
    // 默认情况：使用缓存的默认字符集
    chars = defaultChars;
  } else {
    if (numbers !== false) {
      chars += typeof numbers == "string" ? numbers : numberChars;
    }

    if (letters !== false) {
      chars += typeof letters == "string" ? letters : letterChars;
    }

    if (specials) {
      chars += typeof specials == "string" ? specials : specialChars;
    }
  }

  let charsLength = chars.length;
  while (length > 0) {
    length--;
    result += chars[getSecureRandom(charsLength)];
  }
  return result;
}

module.exports = random.default = random;

"use strict";

var numbers = "0123456789";
var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var specials = "~!@#$%^*()_+-=[]{}|;:,./<>?";

// 缓存常用字符集组合
var defaultChars = numbers + letters; // 默认（数字+字母）
var fullChars = numbers + letters + specials; // 完整（数字+字母+特殊）

/**
 * Get cryptographically secure random value in [0, max)
 * @param {Number} max - Upper bound (exclusive)
 * @returns {Number} Random value
 */
function getSecureRandom(max) {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    var array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }

  try {
    var nodeCrypto = require("crypto");
    var bytes = nodeCrypto.randomBytes(4);
    var value =
      (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
    return value >>> 0 % max;
  } catch (e) {
    return Math.floor(Math.random() * max);
  }
}

/**
 * Generate random string
 * @param {Number} length
 * @param {Object} options
 */
function random(length, options) {
  length || (length = 8);
  options || (options = {});

  var chars = "";
  var result = "";

  if (options === true) {
    chars = fullChars;
  } else if (typeof options == "string") {
    chars = options;
  } else if (
    options.numbers === undefined &&
    options.letters === undefined &&
    options.specials === undefined
  ) {
    // 默认情况：使用缓存的默认字符集
    chars = defaultChars;
  } else {
    if (options.numbers !== false) {
      chars += typeof options.numbers == "string" ? options.numbers : numbers;
    }

    if (options.letters !== false) {
      chars += typeof options.letters == "string" ? options.letters : letters;
    }

    if (options.specials) {
      chars +=
        typeof options.specials == "string" ? options.specials : specials;
    }
  }

  var charsLength = chars.length;
  while (length > 0) {
    length--;
    result += chars[getSecureRandom(charsLength)];
  }
  return result;
}

module.exports = random.default = random;

"use strict";

var assert = require("assert");

var random = require("../index").default;

console.log(random());
console.log(random(16));
console.log(random(16, { numbers: false }));
console.log(random(16, { letters: false }));
console.log(random(16, { letters: "ABCDEFG" }));
console.log(random(16, { specials: true }));
console.log(random(16, { specials: true, numbers: false, letters: false }));
console.log(random(16, { specials: ":;", numbers: false, letters: false }));
console.log(random(16, true));

function run(fn, times) {
  while (times > 0) {
    fn();
    times--;
  }
}

describe("length", function () {
  describe("random()", function () {
    it("string length should be 8", function () {
      run(function () {
        var str = random();
        assert(str.length === 8);
      }, 10000);
    });
  });

  describe("random(10)", function () {
    it("string length should be 10", function () {
      run(function () {
        var str = random(10);
        assert(str.length === 10);
      }, 10000);
    });
  });
});

describe("number", function () {
  describe("random(16, {numbers: false})", function () {
    it("string should contains no numbers", function () {
      run(function () {
        var str = random(16, { numbers: false });
        assert(/^[a-z]{16}$/i.test(str));
      }, 10000);
    });
  });

  describe('random(4, {numbers: "0", letters: false})', function () {
    it('should return "0000"', function () {
      run(function () {
        var str = random(4, { numbers: "0", letters: false });
        assert(str === "0000");
      }, 10000);
    });
  });
});

describe("letter", function () {
  describe("random(16, {letters: false})", function () {
    it("string should contains no letters", function () {
      run(function () {
        var str = random(16, { letters: false });
        assert(/^\d{16}$/i.test(str));
      }, 10000);
    });
  });

  describe('random(4, {numbers: false, letters: "A"})', function () {
    it('should return "AAAA"', function () {
      run(function () {
        var str = random(4, { numbers: false, letters: "A" });
        assert(str === "AAAA");
      }, 10000);
    });
  });
});

describe("specials", function () {
  describe("random(32, {specials: true})", function () {
    it("string should contains specials", function () {
      run(function () {
        var str = random(32, { specials: true });
        assert(
          /^[\~\!\@\#\$\%\^\*\(\)\_\+\-\=\[\]\{\}\|\;\:\,\.\/\<\>\?a-z0-9]{32}$/i.test(
            str,
          ),
        );
        var reg = /[\~\!\@\#\$\%\^\*\(\)\_\+\-\=\[\]\{\}\|\;\:\,\.\/\<\>\?]/;
        assert(reg.test(str));
      }, 1000);
    });
  });

  describe('random(4, {numbers: false, letters: false, specials: "."})', function () {
    it('should return "...."', function () {
      run(function () {
        var str = random(4, { numbers: false, letters: false, specials: "." });
        assert(str === "....");
      }, 10000);
    });
  });

  describe("random(32, true)", function () {
    it("string should contains specials", function () {
      run(function () {
        var str = random(32, true);
        assert(
          /^[\~\!\@\#\$\%\^\*\(\)\_\+\-\=\[\]\{\}\|\;\:\,\.\/\<\>\?a-z0-9]{32}$/i.test(
            str,
          ),
        );
      }, 10000);
    });
  });
});

/*globals describe */

var assert = require("assert");
var test = require("./helpers").test;
var testError = require("./helpers").testError;

describe("simple", function() {
  test("empty", "", [[1, "", ""]]);
  test("simple", ".class { a: b c d; }", [[1, ".class { a: b c d; }", ""]]);
  test("simple2", ".class { a: b c d; }\n.two {}", [
    [1, ".class { a: b c d; }\n.two {}", ""]
  ]);
  test("escaped selector", ".u-m\\+ { a: b c d; }", [
    [1, ".u-m\\+ { a: b c d; }", ""]
  ]);
  test("escaped selector (2)", ".grid.\\-top { a: b c d; }", [
    [1, ".grid.\\-top { a: b c d; }", ""]
  ]);
  test("escaped selector (3)", ".u-m\\00002b { a: b c d; }", [
    [1, ".u-m\\00002b { a: b c d; }", ""]
  ]);
  test("escaped characters", '.class { content: \'"\\\\f10c"\'; }', [
    [1, '.class { content: \'"\\\\f10c"\'; }', ""]
  ]);
  test("escaped characters (2)", '.class { font-family: \'微软雅黑\'; }', [
    [1, '.class { font-family: \'微软雅黑\'; }', ""]
  ]);
  test("escaped characters (3)", '.class { content: \'\\e901\'; }', [
    [1, '.class { content: \'\\e901\'; }', ""]
  ]);
  test("escaped characters (uppercase)", '.class { content: "\\F10C" }', [
    [1, '.class { content: "\\F10C" }', ""]
  ]);
  test("escape characters (lowercase)", '.class { content: "\\f10C" }', [
    [1, '.class { content: "\\f10C" }', ""]
  ]);
  test("escape characters (two)", '.class { content: "\\F10C \\F10D" }', [
    [1, '.class { content: "\\F10C \\F10D" }', ""]
  ]);
  test("charset directive", '@charset "UTF-8";\n .class { a: b c d; }', [
    [1, '@charset "UTF-8";\n .class { a: b c d; }', ""]
  ]);
  test("custom variables", ":root {--foo: 1px;\n--bar: 2px;}", [
    [1, ":root {--foo: 1px;\n--bar: 2px;}", ""]
  ]);
  testError("error formatting", ".some {\n invalid css;\n}", function(err) {
    assert.equal(
      err.message,
      [
        "Unknown word (2:2)",
        "",
        "  1 | .some {",
        "> 2 |  invalid css;",
        "    |  ^",
        "  3 | }",
        ""
      ].join("\n")
    );
  });
});

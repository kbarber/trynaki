module("base functions", {
  setup: function() {
    // prepare something for all following tests
  },
  teardown: function() {
    // clean up after each test
  }
});

test("init()", function() {
  ok(!init(), "Passed!");
});

asyncTest("reset() with delay should not throw exception", function() {
  expect(1);

  setTimeout(function() {
    equal(reset(), true);
    start();
  }, 1000);
});

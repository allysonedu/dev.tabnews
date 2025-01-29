const calculadora = require("../models/calculadora");

test("somar 2 + 2 deveria retornanr 4", () => {
  const result = calculadora.somar(2, 2);
  expect(result).toBe(4);
});

test("somar 5 + 100 deveria retornanr 105", () => {
  const result = calculadora.somar(5, 100);
  expect(result).toBe(105);
});

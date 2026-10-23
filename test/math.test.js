import { test } from 'node:test';
import assert from 'node:assert/strict';
import { add } from '../src/math.js';
import * as math from '../src/math.js';

test('adds', () => {
  assert.equal(add(2, 3), 5);
});

test('subtracts', () => {
  assert.equal(math.subtract(5, 2), 3);
});

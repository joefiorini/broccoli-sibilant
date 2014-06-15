#!/usr/bin/env bash

run-test() {
  (cd test &&
    rm -rf expected actual &&
    mkdir expected &&
    sibilant test.sibilant > expected/test.js &&
    rm -rf actual && broccoli build actual)

  diff -B test/actual/test.js test/expected/test.js
  return $?
}

(run-test && echo "Passed") || echo "Failed"

#!/bin/sh
cat $(echo ${1:-input}) | xargs node fuel-calc.js

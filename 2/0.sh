#!/bin/sh
cat ${1:-input} | tr ',' '\n' | xargs node intcode.js

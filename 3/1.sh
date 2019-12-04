#!/bin/sh
cat ${1:-input} | xargs node manhattan.js

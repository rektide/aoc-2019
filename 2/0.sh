#!/bin/sh
cat ${1:-input} | xargs node 1.js

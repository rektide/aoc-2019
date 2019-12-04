#!/bin/sh
cat ${1:-input} | xargs node delay.js

#!/bin/sh
cat ${1:-input} | tr ',' '\n' | sed '2s/.*/12/' | sed '3s/.*/2/' | xargs node intcode.js | head -n1

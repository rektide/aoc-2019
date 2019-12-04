#!/bin/sh
cat ${1:-input} | tr ',' '\n' | xargs node gravity-assist.js

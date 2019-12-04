#!/bin/sh
cat $(echo ${1:-input}) | xargs node sum-mass.js

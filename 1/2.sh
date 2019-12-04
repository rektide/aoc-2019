#!/bin/sh
payload="$(./1.sh 2>/dev/null)"
node fuel-calc.js $payload

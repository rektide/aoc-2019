#!/bin/sh
cat ${1:-input} | tr '-' ' ' | xargs node pw.js

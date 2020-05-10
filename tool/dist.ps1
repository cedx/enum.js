#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

tool/build.ps1
node_modules/.bin/rollup --config=etc/rollup.js
node_modules/.bin/terser --config-file=etc/terser.json --output=build/enum.min.js build/enum.js

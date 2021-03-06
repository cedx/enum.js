# Installation

## Requirements
Before installing **Enums for JS**, you need to make sure you have [Node.js](https://nodejs.org)
and [npm](https://www.npmjs.com), the Node.js package manager, up and running.
		
You can verify if you're already good to go with the following commands:

``` shell
node --version
# v15.1.0

npm --version
# 7.0.8
```

!!! info
	If you plan to play with the package sources, you will also need
	[PowerShell](https://docs.microsoft.com/en-us/powershell) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material).

## Installing with npm package manager

### 1. Install it
From a command prompt, run:

``` shell
npm install @cedx/enum
```

### 2. Import it
Now in your [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) code, you can use:

``` js
import {Enum} from "@cedx/enum";
```

## Installing from a content delivery network
This library is also available as a ready-made bundle.
To install it, add this code snippet to the `<head>` of your HTML document:

``` html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@cedx/enum/build/enum.min.js"></script>

<!-- UNPKG -->
<script src="https://unpkg.com/@cedx/enum/build/enum.min.js"></script>
```

The `Enum` class from this library is exposed as a property on the `window` global object:

``` html
<script>
	// Optional: `Enum` is a global property.
	const {Enum} = window;
</script>
```

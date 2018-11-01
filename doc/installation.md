# Installation

## Requirements
Before installing **Enums for JS**, you need to make sure you have [Node.js](https://nodejs.org)
and [npm](https://www.npmjs.com), the Node.js package manager, up and running.

!!! warning
    Enums for JS requires Node.js >= **10.13.0**.
    
You can verify if you're already good to go with the following commands:

```shell
node --version
# v10.13.0

npm --version
# 6.4.1
```

!!! info
    If you plan to play with the package sources, you will also need
    [Gulp](https://gulpjs.com) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material).

## Installing with npm package manager

### 1. Install it
From a command prompt, run:

```shell
npm install @cedx/enum
```

### 2. Import it
Now in your [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or [TypeScript](https://www.typescriptlang.org) code, you can use:

```ts
import {Enum} from '@cedx/enum';
```

!!! info
    This library is packaged as [CommonJS modules](https://nodejs.org/api/modules.html).  
    To consume it in a browser, you must use a dedicated tool chain, like a build system coupled with a bundler.

### 3. Use it
See the [usage information](usage.md).

## Installing from a content delivery network
This library is also available as a ready-made bundle.
To install it, add this code snippet to the `<head>` of your HTML document:

```html
<!-- jsDelivr -->
<script src="https://cdn.jsdelivr.net/npm/@cedx/enum/build/enum.js"></script>

<!-- UNPKG -->
<script src="https://unpkg.com/@cedx/enum/build/enum.js"></script>
```

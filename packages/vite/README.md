<div align="center">
    <img alt="Zephra Logo" width="250" src="https://raw.githubusercontent.com/zephracss/.github/main/assets/logo-transparent.png" />
    <h1>ZephraCSS</h1>
</div>

<p align="center">An elegant atomic css engine for a more civilized age.</p>

<br/>
<br/>

## What is this?

This is the vite plugin for ZephraCSS. It is used to run Zephra in tandem with vite.

## Usage

```ts
import { defineConfig } from 'vite'

import zephra from '@zephracss/vite'

export default defineConfig({
    plugins: [
        zephra({
            // options
        })
        // or
        zephra(
            "path/to/zephra.config.ts"
        )
    ]
})
```
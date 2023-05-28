# Contributing to Zephra

First off, thanks for taking the time to contribute, it helps propel the project forward and is greatly appreciated!

- [Code of Conduct](#code-of-conduct)
- [Contributing](#contributing)
    - [Code Style](#code-style)
    - [Presets](#presets)
    - [Issues](#issues)

## Code of Conduct

This project and everyone participating in it is governed by the [GitHub Code of Conduct](https://docs.github.com/en/site-policy/github-terms/github-community-code-of-conduct). By participating, you are expected to uphold this code. Please report unacceptable behavior to a maintainer.

## Contributing

### Code Style

This project uses [Prettier](https://prettier.io/) to format code. Please make sure to run it before submitting a pull request.

#### Commit Messages

Commit messages should be in the present or imperative tense and should be descriptive. If you're unsure of how to write a commit message, please read [this](https://chris.beams.io/posts/git-commit/).

```

#### Import Sorting

One thing our linter can't do is sort imports. Blow is a guide on how you should ideally sort your imports.

```
1. External Libraries (chalk, fast-glob, etc.)

2. Internal Imports (./, ../, ../../, etc.)

3. Built-in Node.js Modules (path, crypto, etc.)
```

**All imports must be sorted by descending line length.**

e.g.

```ts
import fastGlob from 'fast-glob';
import chalk from 'chalk';

import { info, error } from '../logger';
import config from '../config';

import path from 'path';
import fs from 'fs';
```

### Presets

So you want to change the presets in this repository? Great! Here's a few things you should know before you get started.

1. Almost all pull requests that add a new preset **will be rejected**. This monorepo only holds official presets, built by the Zephra team. If you want to add your own preset, you can create your own repository and publish it to NPM with the name `zephra-preset-<name>`.

2. If you want to edit a preset, you must keep backwards compatibility. If you want to make breaking changes, you must first create a proposal issue and get it approved by a maintainer.

### Issues

If you find a bug or have a feature request, please open an issue. If you want to make a breaking change, please create a proposal issue (before submitting a pull request) and get it approved by a maintainer.

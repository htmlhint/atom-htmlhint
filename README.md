<h1 align="center">
  <br>
  Atom HTMLHint
  <br>
</h1>

<h4 align="center">HTMLHint reports for your <a href="http://atom.io">Atom</a> editor.</h4>

<p align="center">
  <a href="https://travis-ci.org/htmlhint/atom-htmlhint">
    <img src="https://img.shields.io/travis/htmlhint/atom-htmlhint.svg" alt="Travis Build Status">
  </a>
  <a href="https://codecov.io/gh/htmlhint/atom-htmlhint">
    <img src="https://codecov.io/gh/htmlhint/atom-htmlhint/branch/master/graph/badge.svg" alt="Codecov">
  </a>
  <a href="https://www.npmjs.com/package/atom-htmlhint">
    <img src="https://img.shields.io/npm/dm/atom-htmlhint.svg" alt="NPM count">
  </a>
  <img src="https://badgen.net/badge/license/MIT/green" alt="MIT Licence" />
  <a href="https://discord.gg/nJ6J9CP">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg" alt="Chat">
  </a>
  <a href="http://roadmap.htmlhint.io/roadmap">
    <img src="https://img.shields.io/badge/check-our%20roadmap-EE503E.svg" alt="Chat">
  </a>
</p>

<p align="center">
  <a href="#install">How To Use</a> • <a href="/CONTRIBUTING.md">Contributing</a> • <a href="http://roadmap.htmlhint.io/">Roadmap</a> • <a href="https://htmlhint.io">Website</a>
</p>

![preview](https://cloud.githubusercontent.com/assets/145288/5823816/20bdc9e6-a0e0-11e4-8e27-db74a172aac1.png)

## Table of Contents

[![Greenkeeper badge](https://badges.greenkeeper.io/htmlhint/atom-htmlhint.svg)](https://greenkeeper.io/)

- **[Features](#features)**
- **[Install](#install)**
- **[Usage](#usage)**

## Features

* Validate on keymap
* Validate on command
* Validate on save *(toggle in settings)*
* Validate on change *(toggle in settings)*
* Option to hide the error panel if no errors were found *(toggle in settings)*
* Option to use `fold mode` by default *(toggle in settings)*
* Supports .htmlhintrc config files *(project located file will overwrite the global file)*

## Install

You can install this plugin via the Packages manager in Atom itself or manually through the terminal

```bash
$ apm install htmlhint
```

## Usage

HTMLHint is by default validating on save (this can be changed in the package settings), you can also execute it by hitting `ctrl-alt-l`.

If you like you can even set it to validate while typing in the package settings.

## License

Project initially created by [@tcarlsen](https://github.com/tcarlsen) and transferred to the [HTMLHint](https://github.com/htmlhint) organization.

<a href="https://htmlhint.io"><img src="https://raw.githubusercontent.com/htmlhint/htmlhint/develop/src/img/htmlhint.png" alt="Logo HTMLHint" width="65"></a>

[MIT License](./LICENSE)

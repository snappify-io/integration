<a href="https://snappify.io/"><img src="https://github.com/snappify-io/integration/raw/main/assets/header.png"/></a>

<div align="center">
  <img src="https://badgen.net/npm/v/@snappify/integration" alt="Latest release" />
  <img src="https://badgen.net/bundlephobia/minzip/@snappify/integration" alt="minzipped size"/>
  <img src="https://github.com/snappify-io/integration/workflows/CI/badge.svg" alt="Build Status" />
</div>

<br />
<div align="center"><strong>The official library for integrating snappify into your webapp.</strong></div>
<div align="center">Interested? Just hit us up at <a href="mailto:info@snappify.io">info@snappify.io</a></div>
<br />
<div align="center">
  <a href="https://snappify.io/">Website</a> 
  <span> · </span>
  <a href="https://twitter.com/snappify_io">Twitter</a>
</div>

<br />
<div align="center">
  <sub>Made by <a href="https://twitter.com/dominiksumer">Dominik</a> & <a href="https://twitter.com/AnkiCodes">Anki</a> ✨</sub>
</div>
<br />

## Installation

#### With NPM

```sh
npm i @snappify/integration
```

#### With yarn

```sh
yarn add @snappify/integration
```

## Usage

> Be aware that we restrict the integration of snappify by platforms at the moment. Are you interested? Hit us up at info@snappify.io

```ts
import { openSnappify } from "@snappify/integration";

async function() {
  try {
    const blob = await openSnappify(
      { // pass the information of the user
        displayName: "Elon Musk",
        userName: "elonmusk",
        image:
          "https://pbs.twimg.com/profile_images/1364491704817098753/V22-Luf7_400x400.jpg",
      }
    );

    // do something with the blob, e.g. create an object url to show it in an img tag: URL.createObjectURL(blob);
  } catch (error) {
    // error handling
  }
}
```

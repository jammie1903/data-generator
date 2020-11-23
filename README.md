# Data Generator

This package is used to generate data based on a given schema.

data-generator is built on top of [chance.js](https://chancejs.com/), so any of the functions available there can be used ot help generate the data.

## Usage

### Basic Usage

```js
import { generate, chance } from '@jammie1903/data-generator'

const schema = {
  name: chance.name,
  dob: chance.birthday({ type: 'adult' }),
  gender: 'male',
  address: {
    address: chance.address,
    country: chance.country({ full: true })
  }
}


```

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

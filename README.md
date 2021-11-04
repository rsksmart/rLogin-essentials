<p align="middle">
  <img src="https://www.rifos.org/assets/img/logo.svg" alt="logo" height="100" >
</p>
<h3 align="middle"><code>@rsksmart/rlogin-essentials</code></h3>
<p align="middle">
  rLogin essentials for RIF apps
</p>

This package exports a factory method for rLogin **to use in the RIF apps**

```typescript
import { createRLogin } from '@rsksmart/rlogin-essentials'

export const rLogin = createRLogin()
```

This will create rLogin for RSK Testnet and Mainnet using all the integrated providers

If you are using it in other apps please set your Trezor bridge metadata

```typescript
const trezorOptions = {
  manifestEmail: 'your@email.org',
  manifestAppUrl: 'https://your.page.org'
}

export const rLogin = createRLogin(, trezorOptions)
```

**Utilities:**

For individual RSK network

```typescript
import { rskTestnetRpcUrl, rskMainnetRpcUrl } from '@rsksmart/rlogin-essentials'

const rLogin = createRLogin(rskTestnetRpcUrl)
const rLogin = createRLogin(rskMainnetRpcUrl)
```

For example, with Ethereum and RSK networks:

```typescript
import { rskRpcUrls } from '@rsksmart/rlogin-essentials'

const rpcUrls = Object.assing({}, {
  1: getEthereumUrl(1)!
}, rskRpcUrls)

export const rLogin = createRLogin(rpcUrls)
```

## Run for development

Install dependencies:

```
npm i
```

### Run unit tests

```
npm test
```

Coverage report with:

```
npm run test:coverage
```

### Run linter

```
npm run lint
```

Auto-fix:

```
npm run lint:fix
```

### Build for production

```
npm run build
```

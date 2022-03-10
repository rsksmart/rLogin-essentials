
import { createRLogin } from '../src'
import * as RLogin from '@rsksmart/rlogin'

jest.mock('@rsksmart/rlogin-dcent-provider', () => ({
  DCentProvider: () => ({})
}))

describe('createRLogin', () => {
  const rpcUrlsMock = jest.fn()
  const supportedChainsMock = jest.fn()
  const portisOptionMock = jest.fn()
  const trezorOptionMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    jest.spyOn(RLogin, 'default')
      // @ts-ignore - options and return value don't match
      .mockImplementation((opts) => {
        rpcUrlsMock(opts?.rpcUrls)
        supportedChainsMock(opts?.supportedChains)

        // options to test values:
        opts && opts.providerOptions && opts.providerOptions['custom-trezor'] &&
          trezorOptionMock(opts?.providerOptions['custom-trezor'].options)
        portisOptionMock(opts?.providerOptions?.portis?.options?.id)
      })
  })

  it('uses the defaults when no options sent', () => {
    createRLogin()

    expect(rpcUrlsMock).toBeCalledWith({
      30: 'https://public-node.rsk.co',
      31: 'https://public-node.testnet.rsk.co'
    })
    expect(supportedChainsMock).toBeCalledWith([30, 31])
    expect(portisOptionMock).toBeCalledWith('')
    expect(trezorOptionMock).toBeCalledWith({
      manifestEmail: 'info@iovlabs.org',
      manifestAppUrl: 'https://rifos.org'
    })
  })

  it('uses custom rpcUrls', () => {
    createRLogin({ 1: 'testUrl' })

    expect(rpcUrlsMock).toBeCalledWith({ 1: 'testUrl' })
    expect(supportedChainsMock).toBeCalledWith([1])
  })

  it('sets the Portis id', () => {
    createRLogin(undefined, { portis: '1234' })
    expect(portisOptionMock).toBeCalledWith('1234')
  })

  it('sets the Trezor options', () => {
    const options = {
      manifestAppUrl: 'url',
      manifestEmail: 'email'
    }

    createRLogin(undefined, { trezor: options })
    expect(trezorOptionMock).toBeCalledWith(options)
  })
})

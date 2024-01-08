const { getConfig } = require("../config/config")
const { verifyTypedData } = require("viem")

class Signer {
  constructor() {
    this.config = getConfig()
  }

  async signTypedMessage({ account, domain, types, primaryType, message }) {
    let signature = await this.config.walletClient.signTypedData({
      account,
      domain,
      types,
      primaryType,
      message,
    })

    return signature.hex
  }

  async checkTypedSignature({
    address,
    domain,
    types,
    primaryType,
    message,
    signature,
  }) {
    return await verifyTypedData({
      address,
      domain,
      types,
      primaryType,
      message,
      signature,
    })
  }
}

module.exports = Signer

const addresses = require("./../../contractAddresses.json")
const HelperAbi = require("./../../abis/Helper.json")
const { getConfig } = require("../config/config")

class Helper {

    constructor() {

        this.config = getConfig()

        if (addresses.Helper[this.config.publicClient.chain.id] === undefined) {
            throw new Error('MarketplaceViewer address not found for network id: ' + this.config.publicClient.chain.id)
        }
    }

    async view(functionName, args) {
        try {
            return await this.config.publicClient.readContract({
                address: addresses.Helper[this.config.publicClient.chain.id],
                abi: HelperAbi.abi,
                functionName: functionName,
                args: args
            })
        } catch (error) {
            throw error
        }
    }
    async execute(functionName, args, value = 0) {
      try {
          const { request } = await this.config.publicClient.simulateContract({
              address: addresses.Helper[this.config.publicClient.chain.id],
              abi: HelperAbi.abi,
              functionName: functionName,
              args: args,
              account: this.config.walletClient.account,
              value: value
          })
          const hash = await this.config.walletClient.writeContract(request)
          return hash
      } catch (error) {
          throw error
      }
    }

}

module.exports = Helper
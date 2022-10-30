import { nano_models, processTest, populateTransaction } from "../test.fixture";

const contractName = "WyvernExchangeWithBulkCancellations";
const contractAddr = "0x7f268357a8c2552623316e2562d90e642bb538e5";
const testNetwork = "ethereum";

const testLabel = "WyvernV2 cancel"; // <= Name of the test
const testDirSuffix = testLabel.toLowerCase().replace(/\s+/g, '_');

// https://etherscan.io/tx/0xaebce79157b8121fc28aaccdd48ded429152d46e3fc48f0c42aa60edcbcb9e3e 
const inputData = "0xa8a41c700000000000000000000000007f268357a8c2552623316e2562d90e642bb538e50000000000000000000000002f4a1b02247018713aac9c3d4d23d9aa2e5b715800000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3256965e7c3cf26e11fcaf296dfc8807c01073000000000000000000000000baf2127b49fc93cbca6269fade0f7f31df4c88a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d529ae9e8600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006286b0b60000000000000000000000000000000000000000000000000000000062abf69946fd2b56439db7af5374aa5f0bf4429b9b072d10b1e0a1e69204541eb835814b0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000004600000000000000000000000000000000000000000000000000000000000000580000000000000000000000000000000000000000000000000000000000000001c7fef64d55479baf9a6ebc91f2370c04175cd746d2eaa818b876816db7c5108177af50369c8596273f401f4f6987a483b43aabd63c0321c5f6127f1c1a7d4641400000000000000000000000000000000000000000000000000000000000000e4fb16a5950000000000000000000000002f4a1b02247018713aac9c3d4d23d9aa2e5b7158000000000000000000000000000000000000000000000000000000000000000000000000000000000000000079aa05963c92a2a10d96bd840eb5e73a1e675e920000000000000000000000000000000000000000000000000000000000000487000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e4000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
const models = [
    {
        name: 'nanos',
        steps: 4
    },
    // {
    // 	name: 'nanox',
    // 	steps: 0
    // },
]

// populate unsignedTx from genericTx and get network chain id
const unsignedTx = populateTransaction(contractAddr, inputData, testNetwork);
// Process tests for each nano models
models.forEach((model) => {
    const nano_model = nano_models.find((nano_model) => nano_model.name === model.name)
    processTest(nano_model, model.steps, contractName, testLabel, testDirSuffix, unsignedTx, testNetwork)
})
import { nano_models, processTest, populateTransaction } from "../test.fixture";

const contractName = "SeaPort";
const contractAddr = "0x00000000006c3852cbef3e08e8df289169ede581";
const testNetwork = "arbitrum";

const testLabel = "crosschain arbitrum fulfillBasicOrder buy aeth 1nft"; // <= Name of the test
const testDirSuffix = testLabel.toLowerCase().replace(/\s+/g, '_');

// https://arbiscan.io/tx/0x1edf85c11c8631c4e7de095170d5c6ce2adbf3ce15dbe4657e313c0939358ebf
const inputData = "0xfb0f3ee1000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000032fa2856f400000000000000000000000000e981e2a9a49c82a22fe5e44e58c8523c8d62279200000000000000000000000000000000000000000000000000000000000000000000000000000000000000005b3e3ff612fcaf9876256bae0553f244856e8b7900000000000000000000000000000000000000000000000000000000000001b60000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000635d937f0000000000000000000000000000000000000000000000000000000063d6dd7f0000000000000000000000000000000000000000000000000000000000000000360c6ebe0000000000000000000000000000000000000000db6a187fd6422bf30000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000002e00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000001576cd9de000000000000000000000000000000a26b00c1f0df003000390027140000faa719000000000000000000000000000000000000000000000000000001576cd9de00000000000000000000000000e981e2a9a49c82a22fe5e44e58c8523c8d62279200000000000000000000000000000000000000000000000000000000000000419c44b2150fc8f07bc8bda0d01ef768755c8d3a7eec48c17d52fc06c82a1d899a5c25eba15cc8ed581b88e079e1c4098e7366b34eddb0aff0a59a36884054930f1c00000000000000000000000000000000000000000000000000000000000000360c6ebe";
const models = [
    {
        name: 'nanos',
        steps: 9
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
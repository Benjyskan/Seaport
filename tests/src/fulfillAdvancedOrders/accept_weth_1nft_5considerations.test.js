import { nano_models, processTest, populateTransaction } from "../test.fixture";

const contractName = "SeaPort";
const contractAddr = "0x00000000006c3852cbef3e08e8df289169ede581";
const testNetwork = "ethereum";

const testLabel = "fulfillAdvancedOrder accept weth 1nft 5considerations"; // <= Name of the test
const testDirSuffix = testLabel.toLowerCase().replace(/\s+/g, '_');

// https://etherscan.io/tx/0x31ebb1cdf2d071a8d7f41f677aecdae9b9dec62efc068934525672070382a730
const inputData = "0xe7acab24000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000007e00000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000006a000000000000000000000000000000000000000000000000000000000000007200000000000000000000000006c456f4c8f96bb5878c0966e5ae4ac58bb4009e7000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000062e8651a0000000000000000000000000000000000000000000000000000000062e9b6550000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004b6846ac8ff3740000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000027147114878000000000000000000000000000000000000000000000000000002714711487800000000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000004000000000000000000000000a4c9956d27240692cab456d543d482d947c8d81b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000006c456f4c8f96bb5878c0966e5ae4ac58bb4009e70000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fa1c6d5030000000000000000000000000000000000000000000000000000000fa1c6d5030000000000000000000000000008de9c5a032463c561423387a9648c5c7bcc5bc900000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000032a5c1a7eb00000000000000000000000000000000000000000000000000000032a5c1a7eb000000000000000000000000000295667d4b4676bdf163e6d4b41f0bdd6850b242c0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008c0feb4ba00000000000000000000000000000000000000000000000000000008c0feb4ba000000000000000000000000000f182a6e2ec3db92523852311bd492442b9f733220000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003205af76700000000000000000000000000000000000000000000000000000003205af767000000000000000000000000000b50e0887ddf4496d26c506b1d3536856da21a3c800000000000000000000000000000000000000000000000000000000000000416cb7a3c89b6569b3ca24bf4bb9c775d7e2e77b85bf0c844f2fbe57bf2e0feffa632418646a055327c4c04e30ef7ea78d4e3fe9de90d667a88674f376f667f1451b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000061c00000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000";
const models = [
    {
        name: 'nanos',
        steps: 8
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
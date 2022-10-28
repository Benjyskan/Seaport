import { nano_models, processTest, populateTransaction } from "../test.fixture";

const contractName = "SeaPort";
const contractAddr = "0x00000000006c3852cbef3e08e8df289169ede581";
const testNetwork = "ethereum";

const testLabel = "fulfillAdvancedOrder buy4 eth 10nft"; // <= Name of the test
const testDirSuffix = testLabel.toLowerCase().replace(/\s+/g, '_');

// https://etherscan.io/tx/0x82ee1306452396ef0e45a62bfcfdd01f113367531aa82e50024cabfd2afa5406
const inputData = "0xe7acab2400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000c000000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000360d5031a22306ce8ce1bfc9153702ab66b7d20200000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000ac00000000000000000000000000000000000000000000000000000000000000b400000000000000000000000009de1273aa5ec78b33b7696a59456af455202fd58000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c00000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000007c000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000062e81a78000000000000000000000000000000000000000000000000000000006310f8f8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000143effd88c93760000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f00000000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000030a792bbd7e56b4b0ae14a25bd774345f70bc4ad0000000000000000000000000000000000000000000000000000000000000a9900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000030a792bbd7e56b4b0ae14a25bd774345f70bc4ad0000000000000000000000000000000000000000000000000000000000000a9000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000030a792bbd7e56b4b0ae14a25bd774345f70bc4ad0000000000000000000000000000000000000000000000000000000000000a9100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000030a792bbd7e56b4b0ae14a25bd774345f70bc4ad0000000000000000000000000000000000000000000000000000000000000a9200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000030a792bbd7e56b4b0ae14a25bd774345f70bc4ad0000000000000000000000000000000000000000000000000000000000000a9400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000030a792bbd7e56b4b0ae14a25bd774345f70bc4ad0000000000000000000000000000000000000000000000000000000000000a9300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000030a792bbd7e56b4b0ae14a25bd774345f70bc4ad0000000000000000000000000000000000000000000000000000000000000a9500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000030a792bbd7e56b4b0ae14a25bd774345f70bc4ad0000000000000000000000000000000000000000000000000000000000000a9700000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000030a792bbd7e56b4b0ae14a25bd774345f70bc4ad0000000000000000000000000000000000000000000000000000000000000a9600000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000030a792bbd7e56b4b0ae14a25bd774345f70bc4ad0000000000000000000000000000000000000000000000000000000000000a98000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001bb4bfbe8f4000000000000000000000000000000000000000000000000000001bb4bfbe8f40000000000000000000000000009de1273aa5ec78b33b7696a59456af455202fd580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c816bdd9c0000000000000000000000000000000000000000000000000000000c816bdd9c0000000000000000000000000008de9c5a032463c561423387a9648c5c7bcc5bc900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c6b72d9d00000000000000000000000000000000000000000000000000000002c6b72d9d0000000000000000000000000000c25506a94885c6c32dac5d463e61985a6626a88a00000000000000000000000000000000000000000000000000000000000000414bd1f23e4a693ff3f10236baa23e55073f7630b692819271b664c6a81808022b68d94ef91591539b3b61ff5e3f647e2a7911058d175e15210476ff119ebd3d501b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
const models = [
    {
        name: 'nanos',
        steps: 11
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
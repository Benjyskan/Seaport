import { nano_models, populateTransaction, processTest } from "../test.fixture";

const contractName = "SeaPort";
const contractAddr = "0x00000000006c3852cbef3e08e8df289169ede581";
const testNetwork = "ethereum";

const testLabel = "fulfillAvailableAdvancedOrders buy eth 4nfts multiple collections"; // <= Name of the test
const testDirSuffix = testLabel.toLowerCase().replace(/\s+/g, "_");

// https://etherscan.io/tx/0x95b339fbc200f959544c97a2b713f028940955a88232e15bdb407b108dded9b0 // but recipient address is modified to match speculos address. (5849734d2e3ada23b64e12311adfa6bcd6fe687c -> DAD77910DBDFDE764FC21FCD4E74D71BBACA6D8D) + 3 order's NFT address modified to raise multiple collections screen.
const inputData =
    "0x87201b4100000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000188000000000000000000000000000000000000000000000000000000000000018a00000000000000000000000000000000000000000000000000000000000001ac00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000DAD77910DBDFDE764FC21FCD4E74D71BBACA6D8D00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000006400000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000011c000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000005a00000000000000000000000002f1d71d05a2fd7f8236c19009c82029779255a93000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000062e869740000000000000000000000000000000000000000000000000000000062e876c7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a5ff6816f7f2270000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000101884c6c941b1a70e2c5597f33889023db9da230000000000000000000000000000000000000000000000000000000000001757000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c1fa6924bc800000000000000000000000000000000000000000000000000000c1fa6924bc8000000000000000000000000002f1d71d05a2fd7f8236c19009c82029779255a93000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000058acfcdd9800000000000000000000000000000000000000000000000000000058acfcdd98000000000000000000000000008de9c5a032463c561423387a9648c5c7bcc5bc90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000162b3f3766000000000000000000000000000000000000000000000000000000162b3f376600000000000000000000000000046f84f7fa304a1ebfd875ce25f98091b59cb6c5a000000000000000000000000000000000000000000000000000000000000004155272c4d3e4df94597bb85eb79c9c9be9fb45961db45349dbf3c8fe4e31377a9163ae75af43afd51bc92ee91bd94503d72266e608e0e9bdde91b8893dcaf70d21c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000005a0000000000000000000000000e399a654bbc275b0850a2e533e3b0569e26666a7000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000062e8696200000000000000000000000000000000000000000000000000000000631147e2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001615558df9d829c0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000101884c6c941b1a70e2c5597f33889023db9da230000000000000000000000000000000000000000000000000000000000001734000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c6f3b40313c50000000000000000000000000000000000000000000000000000c6f3b40313c50000000000000000000000000e399a654bbc275b0850a2e533e3b0569e26666a700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005af310766f7000000000000000000000000000000000000000000000000000005af310766f700000000000000000000000008de9c5a032463c561423387a9648c5c7bcc5bc9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016bcc41d9bdc000000000000000000000000000000000000000000000000000016bcc41d9bdc000000000000000000000000046f84f7fa304a1ebfd875ce25f98091b59cb6c5a00000000000000000000000000000000000000000000000000000000000000416054cad9c58fa72d5bee35415d99c81eb0d99f5cade9fdb2492a1cc1edfcc58e2c3d7df926f75e2d8e4d74d58f68f023a8ad093846f8f4f311056cbb8aeafc461c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000005a00000000000000000000000005548584d74f7b5bd5ed8016755bc1de27aa35621000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000062e869950000000000000000000000000000000000000000000000000000000063111fa0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000fd9ac1938e625f0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000101885c6c941b1a70e2c5597f33889023db9da230000000000000000000000000000000000000000000000000000000000000a31000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c6f3b40b6c000000000000000000000000000000000000000000000000000000c6f3b40b6c0000000000000000000000000005548584d74f7b5bd5ed8016755bc1de27aa3562100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005af3107a400000000000000000000000000000000000000000000000000000005af3107a40000000000000000000000000008de9c5a032463c561423387a9648c5c7bcc5bc9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016bcc41e9000000000000000000000000000000000000000000000000000000016bcc41e9000000000000000000000000000046f84f7fa304a1ebfd875ce25f98091b59cb6c5a00000000000000000000000000000000000000000000000000000000000000410eac1594090dbd801a791a825afcf179f408cdcaddb2b2ee4cd5268c6660061428265f03bb7c2ba037f0bb2c1df5935cde0e31674a3008587d817034354e99c01b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000005a00000000000000000000000003d2c86d8b06db4da724facc4f28753a2ecda9e03000000000000000000000000004c00500000ad104d7dbd00e3ae0a5c00560c000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000062e8698e00000000000000000000000000000000000000000000000000000000631146dd000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000efb3ba276aa6630000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000101884c6c941b1a70e2c5597f33889023db9da23000000000000000000000000000000000000000000000000000000000000098e000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c1fa6924bc800000000000000000000000000000000000000000000000000000c1fa6924bc8000000000000000000000000003d2c86d8b06db4da724facc4f28753a2ecda9e03000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000058acfcdd9800000000000000000000000000000000000000000000000000000058acfcdd98000000000000000000000000008de9c5a032463c561423387a9648c5c7bcc5bc90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000162b3f3766000000000000000000000000000000000000000000000000000000162b3f376600000000000000000000000000046f84f7fa304a1ebfd875ce25f98091b59cb6c5a0000000000000000000000000000000000000000000000000000000000000041d05a802ec438940c3d7009f84b5f8f3713db6a1402858f971166f657d4c0d5124378fd2aa08b178cbeeff492268df07bcaaec49be1650da5abb7779487f247e11c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000001200000000000000000000000000000000000000000000000000000000000000240000000000000000000000000000000000000000000000000000000000000036000000000000000000000000000000000000000000000000000000000000003c00000000000000000000000000000000000000000000000000000000000000420000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000000";

const models = [
    {
        name: "nanos",
        steps: 6,
    },
    // {
    // 	name: 'nanox',
    // 	steps: 0
    // },
];

// populate unsignedTx from genericTx and get network chain id
const unsignedTx = populateTransaction(contractAddr, inputData, testNetwork);
// Process tests for each nano models
models.forEach((model) => {
    const nano_model = nano_models.find((nano_model) =>
        nano_model.name === model.name
    );
    processTest(
        nano_model,
        model.steps,
        contractName,
        testLabel,
        testDirSuffix,
        unsignedTx,
        testNetwork,
    );
});

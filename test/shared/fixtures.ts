import { Fixture } from 'ethereum-waffle';
import { ethers, network } from 'hardhat';
import { BuyBack, DEPLOY_CONTRACT } from '../../typechain';
import { TestERC20 } from '../../typechain';
import { WETH9 } from '../../typechain';
import { expect } from 'chai';

const envConfig = require('dotenv').config();
const { NATIVE_POLYGON: TEST_NATIVE, SWAP_TOKEN_POLYGON: TEST_SWAP_TOKEN } = envConfig.parsed || {};

interface DeployContractFixture {
    contract: BuyBack;
    // swapToken: TestERC20;
    // wnative: WETH9;
}

export const deployContractFixture: Fixture<DeployContractFixture> = async function (
    wallets
): Promise<DeployContractFixture> {
    // const swapTokenFactory = await ethers.getContractFactory('TestERC20');
    // let swapToken = (await swapTokenFactory.deploy()) as TestERC20;
    // swapToken = swapToken.connect(wallets[0]);

    // const wnativeFactory = await ethers.getContractFactory('WETH9');
    // let wnative = wnativeFactory.attach(TEST_NATIVE) as WETH9;
    // wnative = wnative.connect(wallets[0]);

    const DeployContractFactory = await ethers.getContractFactory('BuyBack');

    const name = 'ptptp';
    const symbol = 'dfkmdf';
    const rewTok = '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75';
    const router = '0xF491e7B69E4244ad4002BC14e878a34207E38c29';
    const buyback = '0xFfF8B43e25164CAFf29c5775F14CB69f764EFC05';
    const marketing = '0x13fc3F179a4FAbC82087b41638D11560B790dA68';
    const fees = [100, 300, 800, 800];

    const contract = (await DeployContractFactory.deploy(
        name, symbol, rewTok, router, buyback, marketing, fees
    )) as BuyBack;

    const abiCoder = ethers.utils.defaultAbiCoder;

    const storageBalancePositionSwap = ethers.utils.keccak256(
        abiCoder.encode(['address'], [wallets[0].address]) +
            abiCoder.encode(['uint256'], [0]).slice(2, 66)
    );

    // await network.provider.send('hardhat_setStorageAt', [
    //     swapToken.address,
    //     storageBalancePositionSwap,
    //     abiCoder.encode(['uint256'], [ethers.utils.parseEther('100000')])
    // ]);

    // expect(await swapToken.balanceOf(wallets[0].address)).to.eq(ethers.utils.parseEther('100000'));

    await network.provider.send('hardhat_setBalance', [
        wallets[0].address,
        '0x152D02C7E14AF6800000' // 100000 eth
    ]);

    return {
        contract
    };
};

import { ethers, network, waffle } from 'hardhat';
import { deployContractFixtureInFork, deployContractFixture } from './shared/fixtures';
import { Wallet } from '@ethersproject/wallet';
import { BuyBack, TestERC20, WETH9 } from '../typechain';
import { expect } from 'chai';
import { DEADLINE } from './shared/consts';
import { BigNumber as BN, BigNumberish, ContractTransaction } from 'ethers';
const hre = require('hardhat');

const createFixtureLoader = waffle.createFixtureLoader;

describe('Tests', () => {
    let wallet: Wallet, other: Wallet;
    let contract: BuyBack;
    const rewTok = '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75';
    const router = '0xF491e7B69E4244ad4002BC14e878a34207E38c29';
    const buyback = '0xFfF8B43e25164CAFf29c5775F14CB69f764EFC05';
    const marketing = '0x13fc3F179a4FAbC82087b41638D11560B790dA68';

    let loadFixture: ReturnType<typeof createFixtureLoader>;

    before('create fixture loader', async () => {
        [wallet, other] = await (ethers as any).getSigners();
        loadFixture = createFixtureLoader([wallet, other]);
    });

    beforeEach('deploy fixture', async () => {
        ({ contract } = await loadFixture(deployContractFixture));
    });

    describe('#Tests', () => {
        describe('#funcName', () => {
            it('Should do smth', async () => {
                
                // await contract.transfer(ethers.constants.AddressZero, ethers.utils.parseEther('1'));
                console.log(await contract.balanceOf(marketing));
            });
        });
    });
});

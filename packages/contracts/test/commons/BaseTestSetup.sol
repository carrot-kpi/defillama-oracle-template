pragma solidity 0.8.19;

import {Test} from "forge-std/Test.sol";
import {ERC20PresetMinterPauser} from "oz/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import {KPITokensManager1} from "carrot/kpi-tokens-managers/KPITokensManager1.sol";
import {DefiLlamaOracle} from "src/DefiLlamaOracle.sol";
import {MockKPIToken} from "test/mocks/MockKPIToken.sol";
import {OraclesManager1} from "carrot/oracles-managers/OraclesManager1.sol";
import {KPITokensFactory} from "carrot/KPITokensFactory.sol";

/// SPDX-License-Identifier: GPL-3.0-or-later
/// @title Base test setup
/// @dev Test hook to set up a base test environment for each test.
/// @author Federico Luzzi - <federico.luzzi@protonmail.com>
abstract contract BaseTestSetup is Test {
    string internal constant TRUSTED_ORACLE_SPECIFICATION = "foo";
    address internal constant ANSWERER = address(1000000001);

    ERC20PresetMinterPauser internal firstErc20;
    ERC20PresetMinterPauser internal secondErc20;
    address internal feeReceiver;
    KPITokensFactory internal factory;
    KPITokensManager1 internal kpiTokensManager;
    DefiLlamaOracle internal mockOracle;
    MockKPIToken internal mockKPIToken;
    OraclesManager1 internal oraclesManager;

    function setUp() external {
        firstErc20 = new ERC20PresetMinterPauser("Token 1", "TKN1");
        secondErc20 = new ERC20PresetMinterPauser("Token 2", "TKN2");

        feeReceiver = address(400);
        factory = new KPITokensFactory(address(1), address(1), feeReceiver);

        mockKPIToken = new MockKPIToken();
        kpiTokensManager = new KPITokensManager1(address(factory));
        kpiTokensManager.addTemplate(
            address(mockKPIToken),
            "test-specification"
        );

        mockOracle = new DefiLlamaOracle(ANSWERER);
        oraclesManager = new OraclesManager1(address(factory));
        oraclesManager.addTemplate(
            address(mockOracle),
            TRUSTED_ORACLE_SPECIFICATION
        );

        factory.setKpiTokensManager(address(kpiTokensManager));
        factory.setOraclesManager(address(oraclesManager));
    }
}

import "carrot-scripts";
import type { Address } from "viem";

declare global {
    const __ROOT_ID__: string;
    const CCT_ERC20_1_ADDRESS: Address;
    const CCT_ERC20_2_ADDRESS: Address;
    const CCT_TEMPLATE_URL: string;
    const ENVIRONMENT: string;
}

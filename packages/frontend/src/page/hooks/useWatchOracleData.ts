import { useWagmiPassiveHook } from "@carrot-kpi/react";
import { ORACLE_ABI } from "@carrot-kpi/sdk";
import { useEffect, useState } from "react";
import type { Hex } from "viem";
import { type Address, useContractReads } from "wagmi";

interface WatchOracleDataParams {
    oracleAddress?: Address;
}

interface OracleData {
    finalized: boolean;
    data: Hex;
}

export function useWatchOracleData(
    params?: WatchOracleDataParams,
): OracleData | null {
    const [data, setData] = useState<OracleData | null>(null);

    const { data: readResults } = useWagmiPassiveHook({
        hook: useContractReads,
        params: {
            contracts: [
                {
                    address: params?.oracleAddress as Address | undefined,
                    abi: ORACLE_ABI,
                    functionName: "data",
                },
                {
                    address: params?.oracleAddress as Address | undefined,
                    abi: ORACLE_ABI,
                    functionName: "finalized",
                },
            ],
            enabled: !!params?.oracleAddress,
            watch: true,
        },
    });

    useEffect(() => {
        if (!readResults || !params?.oracleAddress) return;

        setData({
            data: readResults[0].result as Hex,
            finalized: readResults[1].result as boolean,
        });
    }, [params?.oracleAddress, readResults]);

    return data;
}

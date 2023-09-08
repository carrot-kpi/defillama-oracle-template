import { Skeleton, Typography } from "@carrot-kpi/ui";
import { Metric, type MetricPageProps } from "../../types";
import { InfoBox } from "../components/info-box";
import { useDefiLlamaProtocols } from "../../hooks/useDefiLlamaProtocols";
import { useEffect, useState } from "react";
import { getDefiLlamaLink } from "../utils/defillama";
import External from "../icons/external";
import { formatDecimals } from "@carrot-kpi/sdk";
import { useDefiLlamaCurrentTvl } from "../../hooks/useDefiLlamaCurrentTvl";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { formatUnits } from "viem";

dayjs.extend(localizedFormat);

export const TvlPage = ({
    t,
    oracle,
    specification,
    decodedOracleData,
}: MetricPageProps) => {
    const { loading: loadingProtocols, protocols } = useDefiLlamaProtocols();
    const { loading: loadingTvl, tvl } = useDefiLlamaCurrentTvl(
        specification.payload.protocol,
    );

    const [resolvedProtocol, setResolvedProtocol] = useState("");

    useEffect(() => {
        if (loadingProtocols) return;
        setResolvedProtocol(
            protocols.find(
                (protocol) => protocol.value === specification.payload.protocol,
            )?.label || specification.payload.protocol,
        );
    }, [loadingProtocols, protocols, specification.payload.protocol]);

    const finalized = oracle?.finalized;

    return (
        <>
            <div className="flex flex-col md:flex-row border-b border-black dark:border-white">
                <div className="w-full flex">
                    <InfoBox
                        label={t("tracked.protocol")}
                        className={{
                            root: "border-r border-black dark:border-white",
                        }}
                    >
                        {loadingProtocols ? (
                            <Skeleton width="100px" />
                        ) : (
                            <Typography>{resolvedProtocol}</Typography>
                        )}
                    </InfoBox>
                </div>
                <div className="w-full flex">
                    <InfoBox
                        label={t("metric")}
                        className={{
                            root: "border-r border-black dark:border-white",
                        }}
                    >
                        <Typography>{t("metric.tvl")}</Typography>
                    </InfoBox>
                </div>
                <div className="w-full flex">
                    <InfoBox label={t("oracle.link")}>
                        <a
                            className="flex gap-1 items-center"
                            href={getDefiLlamaLink(
                                specification.payload.protocol,
                                Metric.TVL,
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Typography>DefiLlama</Typography>
                            <External className="w-4 h-4 cursor-pointer" />
                        </a>
                    </InfoBox>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full flex">
                    <InfoBox
                        label={
                            finalized ? t("final.value") : t("current.value")
                        }
                        className={{
                            root: "border-r border-black dark:border-white",
                        }}
                    >
                        {loadingTvl ? (
                            <Skeleton width="100px" />
                        ) : (
                            <Typography>
                                {finalized
                                    ? formatDecimals(
                                          formatUnits(
                                              decodedOracleData.result,
                                              18,
                                          ),
                                          2,
                                      )
                                    : formatDecimals(tvl, 2)}
                            </Typography>
                        )}
                    </InfoBox>
                </div>
                <div className="w-full flex">
                    <InfoBox label={t("finalization.time")}>
                        <Typography>
                            {decodedOracleData.measurementTimestamp.format(
                                "L HH:mm:ss",
                            )}
                        </Typography>
                    </InfoBox>
                </div>
            </div>
        </>
    );
};
#!/usr/bin/env node

import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { rm, writeFile } from "fs/promises";
import chalk from "chalk";
import ora from "ora";
import { createRequire } from "module";
import webpack from "webpack";
import { existsSync } from "fs";
import { getTemplateComponentWebpackConfig } from "../.cct/utils/get-template-component-webpack-config.js";
import { formatWebpackMessages } from "../.cct/utils/format-webpack-messages.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const require = createRequire(import.meta.url);

const main = async () => {
    const prodMode = process.env.NODE_ENV === "production";
    const outDir = join(__dirname, "../dist");

    let spinner = ora();
    spinner.info(`Building ${prodMode ? "production" : "development"} bundle`);
    console.log();

    spinner = ora();
    spinner.start(`Removing previous ${chalk.blue("dist")} folder`);
    if (existsSync(outDir)) await rm(outDir, { recursive: true });
    spinner.succeed(`Previous ${chalk.blue("dist")} folder removed`);

    spinner = ora();
    spinner.start(`Building ${chalk.blue("federated modules")}`);
    await new Promise((resolve) => {
        webpack(
            [
                getTemplateComponentWebpackConfig(
                    "creationForm",
                    {
                        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
                    },
                    outDir,
                    prodMode ? "prod" : "dev",
                ),
                getTemplateComponentWebpackConfig(
                    "page",
                    {
                        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
                    },
                    outDir,
                    prodMode ? "prod" : "dev",
                ),
            ],
            (error, stats) => {
                if (error) {
                    spinner.fail(
                        `Failed to build ${chalk.blue("federated modules")}`,
                    );
                    console.log();
                    console.log(error.message || error);
                    console.log();
                    process.exit(1);
                }

                const statsData = stats.toJson({
                    all: false,
                    warnings: true,
                    errors: true,
                });

                const messages = formatWebpackMessages(statsData);

                if (messages.errors.length) {
                    if (messages.errors.length > 1) messages.errors.length = 1;
                    spinner.fail(
                        `Failed to build ${chalk.blue("federated modules")}`,
                    );
                    console.log();
                    console.log(messages.errors.join("\n\n"));
                    process.exit(1);
                }

                if (messages.warnings.length) {
                    spinner.warn(
                        `${chalk.blue(
                            "Federated modules",
                        )} built with warnings`,
                    );
                    console.log();
                    console.log(messages.warnings.join("\n\n"));
                    console.log();
                    resolve();
                    return;
                }

                spinner.succeed(`${chalk.blue("Federated modules")} built`);
                resolve();
            },
        );
    });

    spinner = ora(`Building ${chalk.blue("base.json")}`);
    await writeFile(
        join(outDir, "base.json"),
        JSON.stringify(require("../src/base.json")),
    );
    spinner.succeed(`${chalk.blue("base.json")} built`);
};

main().then().catch(console.error);

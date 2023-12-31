// import {
//     ChainId,
//     Oracle,
//     Template,
//     TemplateSpecification,
// } from "@carrot-kpi/sdk";
// import { Wallet } from "ethers";
// import { createRoot } from "react-dom/client";
// import { Component as Page } from "../src/page";
// import baseSpec from "../src/base.json";
// import { long as longCommitHash } from "git-rev-sync";

// describe("page", () => {
//     let oracle: Oracle;

//     beforeAll(() => {
//         const templateSpecification = new TemplateSpecification(
//             "foo-cid",
//             baseSpec.name,
//             baseSpec.description,
//             baseSpec.tags,
//             baseSpec.repository,
//             longCommitHash()
//         );
//         const randomAddress = (): string => Wallet.createRandom().address;
//         const template = new Template(
//             1,
//             randomAddress(),
//             1,
//             templateSpecification
//         );
//         oracle = new Oracle(ChainId.GOERLI, randomAddress(), template, false);
//     });

//     it("renders without crashing", () => {
//         const div = createRoot(document.createElement("div"));
//         eslint-disable-next-line @typescript-eslint/no-empty-function
//         div.render(<Page t={() => {}} oracle={oracle} />);
//         div.unmount();
//     });
// });

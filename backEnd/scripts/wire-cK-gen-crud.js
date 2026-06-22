import fs from "fs";
import path from "path";

const ROOT = path.resolve(
  "07_controllers/cloudKitchen_cntrl/cloudKitchen_General_cntrl",
);

const SHARED_SRV = "../../../../_cK_gen_shared/cK_gen_crud_srv_utils.js";
const SHARED_VLD = "../../../../_cK_gen_shared/cK_gen_passthrough_vld.js";
const MODEL_IMPORT =
  "../../../../../../../06_models/_models.index.js";

const ENTITIES = [
  {
    prefix: "cK_gen_salesPlatform",
    model: "SalesPlatform",
    label: "Sales platform",
    populate: [],
  },
  {
    prefix: "cK_gen_integration",
    model: "Integration",
    label: "Integration",
    populate: ["brands", "branches", "contract"],
  },
];

const CRUD_OPS = {
  create: "makeCreateSrv",
  getAll: "makeGetAllSrv",
  getOne: "makeGetOneSrv",
  delete: "makeDeleteSrv",
  updateAll: "makeUpdateSrv",
};

const EMPTY_VLD_OPS = new Set(["getAll", "getOne", "delete"]);

const writeFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, "utf8");
  console.log("updated", filePath);
};

for (const entity of ENTITIES) {
  const base = path.join(ROOT, `${entity.prefix}_crud_cntrl`);
  const crudSrvDir = path.join(
    base,
    `${entity.prefix}_cntrl_utils`,
    `${entity.prefix}_srv`,
    `${entity.prefix}_crud_srv`,
  );
  const fieldsSrvDir = path.join(
    base,
    `${entity.prefix}_cntrl_utils`,
    `${entity.prefix}_srv`,
    `${entity.prefix}_fields_srv`,
  );
  const crudVldDir = path.join(
    base,
    `${entity.prefix}_cntrl_utils`,
    `${entity.prefix}_vld`,
    `${entity.prefix}_crud_vld`,
  );
  const fieldsVldDir = path.join(
    base,
    `${entity.prefix}_cntrl_utils`,
    `${entity.prefix}_vld`,
    `${entity.prefix}_fields_vld`,
  );

  for (const [op, factory] of Object.entries(CRUD_OPS)) {
    const fileName = `${entity.prefix}_${op}_srv.js`;
    const displayName = ` | ${fileName} | `;
    const exportName = `${entity.prefix}_${op}_srv`;
    const factoryFn = `cK_gen_${factory}`;

    const extra =
      op === "getAll" || op === "getOne"
        ? `,\n  populate: ${JSON.stringify(entity.populate)}`
        : "";

    const srvContent = `import { ${entity.model} } from "${MODEL_IMPORT}";
import { ${factoryFn} } from "${SHARED_SRV}";

const displayName = "${displayName}";

export const ${exportName} = ${factoryFn}({
  Model: ${entity.model},
  entityLabel: "${entity.label}",
  displayName${extra},
});
`;

    writeFile(path.join(crudSrvDir, fileName), srvContent);

    const vldFileName = `${entity.prefix}_${op}_vld.js`;
    const vldExport = `${entity.prefix}_${op}_vld`;
    const vldDisplay = ` | ${vldFileName} | `;

    const vldContent = EMPTY_VLD_OPS.has(op)
      ? `import { cK_gen_passthroughEmpty_vld } from "${SHARED_VLD}";

const displayName = "${vldDisplay}";
const isDebug = true;

export const ${vldExport} = cK_gen_passthroughEmpty_vld(displayName, isDebug);
`
      : `import { cK_gen_passthroughBody_vld } from "${SHARED_VLD}";

const displayName = "${vldDisplay}";
const isDebug = true;

export const ${vldExport} = cK_gen_passthroughBody_vld(displayName, isDebug);
`;

    writeFile(path.join(crudVldDir, vldFileName), vldContent);
  }

  if (fs.existsSync(fieldsSrvDir)) {
    for (const file of fs.readdirSync(fieldsSrvDir)) {
      if (!file.endsWith("_srv.js") || file.startsWith("_")) continue;

      const exportName = file.replace(".js", "");
      const displayName = ` | ${file} | `;

      const srvContent = `import { ${entity.model} } from "${MODEL_IMPORT}";
import { cK_gen_makeUpdateSrv } from "${SHARED_SRV}";

const displayName = "${displayName}";

export const ${exportName} = cK_gen_makeUpdateSrv({
  Model: ${entity.model},
  entityLabel: "${entity.label}",
  displayName,
});
`;

      writeFile(path.join(fieldsSrvDir, file), srvContent);
    }
  }

  if (fs.existsSync(fieldsVldDir)) {
    for (const file of fs.readdirSync(fieldsVldDir)) {
      if (!file.endsWith("_vld.js") || file.startsWith("_") || file === "sample.js")
        continue;

      const exportName = file.replace(".js", "");
      const displayName = ` | ${file} | `;

      const vldContent = `import { cK_gen_passthroughBody_vld } from "${SHARED_VLD}";

const displayName = "${displayName}";
const isDebug = true;

export const ${exportName} = cK_gen_passthroughBody_vld(displayName, isDebug);
`;

      writeFile(path.join(fieldsVldDir, file), vldContent);
    }
  }
}

console.log("Done.");

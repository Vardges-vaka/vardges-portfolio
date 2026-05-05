import {
  CLOUDFLARE_API_TOKEN,
  CLOUDFLARE_ACCOUNT_ID,
} from "../../../00_config/_config.index.js";

const GRAPHQL_ENDPOINT = "https://api.cloudflare.com/client/v4/graphql";

export const r2_analyticsClient = () => {
  if (!CLOUDFLARE_API_TOKEN)
    return { ok: false, message: "CLOUDFLARE_API_TOKEN missing — check .env" };
  if (!CLOUDFLARE_ACCOUNT_ID)
    return {
      ok: false,
      message: "CLOUDFLARE_ACCOUNT_ID missing — check .env",
    };

  const query = async (gql, variables = {}) => {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify({ query: gql, variables }),
    });
    if (!res.ok)
      throw new Error(
        `Cloudflare GraphQL HTTP ${res.status}: ${await res.text()}`
      );
    const json = await res.json();
    if (json.errors?.length) throw new Error(json.errors[0].message);
    return json.data;
  };

  return { ok: true, query, accountId: CLOUDFLARE_ACCOUNT_ID };
};

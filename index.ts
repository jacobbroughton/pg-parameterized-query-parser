export function readQueryWithParams(query: string, params: any[]): string {
  const paramsHashTable: Record<string, any> = {};

  if (typeof query !== "string") throw new Error("`query` must be a string");
  if (params.constructor !== Array) throw new Error("`params` must be an array");

  let modifiedQuery: string = query || "";

  for (let i = 0; i < params.length; i++) {
    if (params[i] === undefined) throw new Error(`parameter value is undefined at $${i + 1}`)
    if (params[i] === null) params[i] = "null";
    else if (typeof params[i] === "string") params[i] = `'${params[i]}'`;
    else if (params[i].length) {
      params[i] = `'{${params[i]}}'`;
    }

    paramsHashTable[`$${i + 1}`] = params[i];
  }

  for (const paramKey in paramsHashTable) {
    modifiedQuery = modifiedQuery.replaceAll(paramKey, paramsHashTable[paramKey]);
  }

  return modifiedQuery;
}

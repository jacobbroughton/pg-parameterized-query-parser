export function readQueryWithParams(query, params) {
    console.log("----------------------");
    const paramsHashTable = {};
    let modifiedQuery = query;
    for (let i = 0; i < params.length; i++) {
        if (params[i] === null)
            params[i] = "null";
        else if (typeof params[i] === "string")
            params[i] = `'${params[i]}'`;
        else if (params[i].length) {
            params[i] = `'{${params[i]}}'`;
        }
        paramsHashTable[`$${i + 1}`] = params[i];
    }
    for (const paramKey in paramsHashTable) {
        console.log(paramsHashTable[paramKey]);
        modifiedQuery = modifiedQuery.replaceAll(paramKey, paramsHashTable[paramKey]);
    }
    return modifiedQuery;
}
const initialQuery = `
  select *
    from
        items a
    inner join
        users b on a.created_by_id = b.id
    where lower(a.what_is_this) LIKE '%' || lower($1) || '%'
      and a.price >= $2 
    and (
        ($3 > 0 AND a.price <= $3)
        OR ($3 <= 0 OR $3 is null)  --Ensuring that if $3 is not greater than 0, it's ignored
    )
    and a.condition = any($4)
    and a.shipping = any($5)
    and a.negotiable = any($6)
    and a.trades = any($7)
    and a.is_deleted = $8
`;
const params = [
    "Hello world",
    0,
    null,
    ["Brand New", "Like New", "Used", "Heavily Used", "Not Functional"],
    ["Willing to Ship", "Local Only"],
    ["Firm", "OBO/Negotiable"],
    ["Accepting Trades", "No Trades"],
    false
];
console.log(readQueryWithParams(initialQuery, params));
console.log("---------------------");
//# sourceMappingURL=index.js.map
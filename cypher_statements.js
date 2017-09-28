exports.domains_collect_ips =
  "MATCH (d:Domain) WITH d, rand() as rand ORDER BY rand LIMIT 10000 WITH collect(d" +
  ") as ds UNWIND ds as d MATCH (d)-[:CONNECTED]-(i:IP) RETURN d.name as domain, co" +
  "llect(i.address) as ip";

exports.domains_ips_totals = 
`Match (d:Domain) WITH count(d) as domainCount
MATCH (i:IP) WITH domainCount, count(i) as ipCount
RETURN domainCount, ipCount`
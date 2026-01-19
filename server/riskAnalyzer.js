import fs from "fs";
import punycode from "punycode";
import whois from "node-whois";

const BLACKLIST_FILE = "./blacklist.txt";
const BLACKLISTED_ENTRIES = new Set(
  fs.readFileSync(BLACKLIST_FILE, "utf-8")
    .split("\n")
    .map(l => l.trim().toLowerCase())
    .filter(l => l)
);

const FACTOR_WEIGHT = 14.28;

export async function analyzeUrl(url) {
  const result = { url, risk_percentage: 0, status: "SAFE", triggered_factors: {} };
  const domain = new URL(url).hostname.toLowerCase();
  let score = 0;

  if (BLACKLISTED_ENTRIES.has(domain)) {
    result.risk_percentage = 80;
    result.status = "BLOCK";
    result.triggered_factors.blacklisted = true;
    return result;
  }

  if (url.length > 75) { score += FACTOR_WEIGHT; result.triggered_factors.long_url = true; }
  if (punycode.toUnicode(domain) !== domain) { score += FACTOR_WEIGHT; result.triggered_factors.homograph_attack = true; }

  try {
    const whoisData = await new Promise((resolve, reject) => {
      whois.lookup(domain, (err, data) => err ? reject(err) : resolve(data));
    });

    const created = /Creation Date: (.*)/.exec(whoisData);
    if (created) {
      const ageDays = (new Date() - new Date(created[1])) / (1000*60*60*24);
      if (ageDays < 30) { score += FACTOR_WEIGHT; result.triggered_factors.new_domain = true; }
    }
  } catch {
    score += FACTOR_WEIGHT; 
    result.triggered_factors.new_domain = true;
  }

  result.risk_percentage = Math.round(score * 100) / 100;
  if (score > 70) result.status = "BLOCK";
  else if (score >= 30) result.status = "WARNING";

  return result;
}

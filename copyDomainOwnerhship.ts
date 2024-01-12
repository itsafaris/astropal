import fs from "fs";
import path from "path";

const f = "./apple-developer-merchantid-domain-association";
const dist = "./public/.well-known";

if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist, { recursive: true });
}

fs.copyFileSync(f, path.join(dist, f));

import fs from "node:fs";
import path from "node:path";
const SRC = process.argv[2];
const js = fs.readFileSync(path.join(SRC, "assets/site.js"), "utf8");
const grab = (name) => {
  const i = js.indexOf(`const ${name}={`);
  let depth = 0, j = js.indexOf("{", i);
  const start = j;
  for (; j < js.length; j++) {
    if (js[j] === "{") depth++;
    else if (js[j] === "}" && --depth === 0) break;
  }
  return new Function(`return (${js.slice(start, j + 1)})`)();
};
const learningPaths = grab("learningPaths");
const flowSteps = grab("flowSteps");
const roleLabels = grab("roleLabels");

const pageSims = {};
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
  e.name === ".git" || e.name === "node_modules" ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
for (const f of walk(SRC).filter((f) => f.endsWith(".html"))) {
  const s = fs.readFileSync(f, "utf8");
  const k = s.match(/data-workflow-kind="([^"]+)"/);
  if (!k) continue;
  const task = s.match(/name="task"[^>]*value="([^"]*)"/) || s.match(/value="([^"]*)"[^>]*name="task"/);
  const title = s.match(/<div class="demo-heading">.*?<h2>(.*?)<\/h2>/s);
  let rel = "/" + path.relative(SRC, f);
  rel = rel.replace(/index\.html$/, "").replace(/\.html$/, "");
  if (rel.length > 1) rel = rel.replace(/\/$/, "");
  pageSims[rel] = { kind: k[1], task: task ? task[1] : "", title: title ? title[1].replace(/<[^>]+>/g, "") : "" };
}
fs.writeFileSync("content/sim.json", JSON.stringify({ learningPaths, flowSteps, roleLabels, pageSims }, null, 1));
console.log(Object.keys(learningPaths), Object.keys(flowSteps), Object.keys(pageSims).length);

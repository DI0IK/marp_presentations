import { marpCli } from "@marp-team/marp-cli";
import fs from "fs";

const presentations = fs
  .readdirSync("./src", { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

(async () => {
  for (const presentation of presentations) {
    fs.mkdirSync(`./dist/${presentation}`, { recursive: true });
    await marpCli([
      `./src/${presentation}/index.md`,
      "-o",
      `./dist/${presentation}/index.html`,
      "--html",
      "--title",
      presentation,
    ]);
  }
})();

const indexHtml = presentations
  .map(
    (presentation) =>
      `<li><a href="./${presentation}/index.html">${presentation}</a></li>`
  )
  .join("");

fs.writeFileSync(
  "./dist/index.html",
  `<!DOCTYPE html>
<html>
<head>
  <title>Presentations</title>
</head>
<body>
  <ul>
    ${indexHtml}
  </ul>
</body>
</html>`
);

// src/index.mjs
import { createReadStream } from "node:fs";
import { readFile as readFile2, stat } from "node:fs/promises";
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { join as join2 } from "node:path";

// src/host-persona.mjs
import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

// src/scenes.json
var scenes_default = [
  {
    id: "day",
    file: "room-day.png",
    label: "\u539F\u521B\u6F14\u793A \xB7 \u6668\u5149",
    source: "demo/day",
    group: "\u573A\u666F"
  },
  {
    id: "night",
    file: "room-night.png",
    label: "\u539F\u521B\u6F14\u793A \xB7 \u661F\u591C",
    source: "demo/night",
    group: "\u573A\u666F"
  },
  {
    id: "forest",
    file: "room-forest.png",
    label: "\u539F\u521B\u6F14\u793A \xB7 \u6797\u95F4",
    source: "demo/forest",
    group: "\u573A\u666F"
  }
];

// src/resource-pack.json
var resource_pack_default = {
  kind: "demo"
};

// src/state.mjs
var SCENES = Object.freeze(scenes_default);
var sceneMap = new Map(SCENES.map((scene) => [scene.id, scene]));
var DEFAULTS = Object.freeze({ enabled: true, left: resource_pack_default.kind === "game" ? "tig" : "none", right: resource_pack_default.kind === "game" ? "lpdcat" : "none", scene: "night", motion: true, showPortrait: true, textShadow: true, persona: resource_pack_default.kind === "game" });
var CHARACTERS = Object.freeze({ none: { name: "\u65E0", normal: null }, tig: { name: "\u864E\u7237", normal: "tig-normal.png", happy: "tig-happy.png", concern: "tig-concern.png" }, lpd: { name: "\u4E91\u8C79", normal: "lpd-normal.png", happy: "lpd-happy.png", concern: "lpd-concern.png" }, lpdcat: { name: "\u77F3\u864E", normal: "lpdcat-normal.png", happy: "lpdcat-happy.png", concern: "lpdcat-concern.png" } });
var MOODS = Object.freeze({ idle: { label: "\u6B63\u5728\u503E\u542C", expression: "normal", portrait: "normal" }, thinking: { label: "\u6B63\u5728\u601D\u8003", expression: "normal", portrait: "serious" }, working: { label: "\u6B63\u5728\u6267\u884C", expression: "normal", portrait: "serious" }, speaking: { label: "\u6B63\u5728\u56DE\u590D", expression: "happy", portrait: "normal" }, waiting: { label: "\u7B49\u5F85\u4F60\u7684\u56DE\u7B54", expression: "concern", portrait: "confused" }, approval: { label: "\u7B49\u5F85\u4F60\u7684\u786E\u8BA4", expression: "concern", portrait: "serious" }, finished: { label: "\u672C\u8F6E\u5DF2\u5B8C\u6210", expression: "happy", portrait: "laugh" }, goal: { label: "\u76EE\u6807\u5DF2\u5B8C\u6210", expression: "happy", portrait: "laugh" }, failed: { label: "\u9047\u5230\u95EE\u9898", expression: "concern", portrait: "difficult" }, stopped: { label: "\u5DF2\u505C\u6B62", expression: "normal", portrait: "difficult" }, offline: { label: "\u8FDE\u63A5\u4E2D\u65AD", expression: "concern", portrait: "confused" } });
function roleForSelection(left, right, enabled = true) {
  if (!enabled) return null;
  const roles = [...new Set([left, right].filter((role) => role !== "none" && Object.hasOwn(CHARACTERS, role)))];
  return roles.length === 1 ? roles[0] : null;
}

// src/host-persona.mjs
async function installPersona(ctx) {
  const root = fileURLToPath(new URL("../skills/", import.meta.url));
  const definitions = /* @__PURE__ */ new Map();
  for (const role of ["tig", "lpd", "lpdcat"]) {
    const folder = join(root, "nekojishi-" + role);
    const path = join(folder, "SKILL.md");
    const raw = await readFile(path, "utf8");
    const content = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").trim();
    const description = raw.match(/^description:\s*(.+)$/m)?.[1] ?? CHARACTERS[role].name;
    definitions.set(role, { content, folder });
    ctx.skills.register({ name: "nekojishi-" + role, description, content, path, source: "bundled", resourceBase: { kind: "directory", path: folder } });
  }
  const stateDirectory = join(process.env.DSH_HOME ?? fileURLToPath(new URL("../.local-state/", import.meta.url)), "customizations", "nekojishi");
  const stateFile = join(stateDirectory, "role-bindings.json");
  let bindings = {}, defaultRole = null;
  try {
    const saved = JSON.parse(await readFile(stateFile, "utf8"));
    defaultRole = definitions.has(saved.defaultRole) ? saved.defaultRole : null;
    for (const [id, role] of Object.entries(saved.bindings ?? saved)) if (/^[\w-]{1,160}$/.test(id) && (role === null || definitions.has(role))) bindings[id] = role;
  } catch (error) {
    if (error.code !== "ENOENT") ctx.logger.warn("Nekojishi role bindings could not be read");
  }
  let pending = Promise.resolve();
  const save = () => {
    const data = JSON.stringify({ defaultRole, bindings }, null, 2);
    pending = pending.catch(() => {
    }).then(async () => {
      await mkdir(stateDirectory, { recursive: true });
      await writeFile(stateFile + ".tmp", data);
      await rename(stateFile + ".tmp", stateFile);
    });
    return pending;
  };
  ctx.systemPrompt.context({ name: "nekojishi:character-expression", order: 850, required: true, interpolate: false, text: (context) => {
    const id = context.agent?.id ?? context.scope?.id;
    const role = Object.hasOwn(bindings, id) ? bindings[id] : defaultRole;
    const skill = definitions.get(role);
    return skill ? `<nekojishi-character-expression skill="nekojishi-${role}">
${skill.content}
\u6280\u80FD\u8D44\u6E90\u76EE\u5F55\uFF1A${skill.folder}
</nekojishi-character-expression>` : Object.hasOwn(bindings, id) ? '<nekojishi-character-expression active="false">\u5F53\u524D\u5DF2\u5173\u95ED\u4EBA\u7269\u8868\u8FBE\u3002\u5386\u53F2\u89D2\u8272\u53F0\u8BCD\u4EC5\u4F5C\u5BF9\u8BDD\u8BB0\u5F55\uFF0C\u672C\u6B21\u4EFB\u52A1\u4F7F\u7528\u539F\u751F Agent \u7684\u4E13\u4E1A\u8868\u8FBE\uFF0C\u7EE7\u7EED\u539F\u4EFB\u52A1\u4E0E\u5DE5\u5177\u6743\u9650\u3002</nekojishi-character-expression>' : "";
  } });
  ctx.effect(() => ctx.webServer.register({ kind: "exact", path: "/nekojishi-ui/persona", handler: async (req, res) => {
    const send = (status, value) => {
      res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
      res.end(JSON.stringify(value));
    };
    if (req.method !== "POST") {
      send(405, { error: "POST required" });
      return;
    }
    let size = 0, chunks = [];
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 4096) {
        send(413, { error: "Request too large" });
        return;
      }
      chunks.push(chunk);
    }
    let body;
    try {
      body = JSON.parse(Buffer.concat(chunks));
    } catch {
      send(400, { error: "Invalid JSON" });
      return;
    }
    const { sessionId, left, right, enabled } = body;
    if (sessionId !== null && (typeof sessionId !== "string" || !/^[\w-]{1,160}$/.test(sessionId)) || !Object.hasOwn(CHARACTERS, left) || !Object.hasOwn(CHARACTERS, right) || typeof enabled !== "boolean") {
      send(400, { error: "Invalid character selection" });
      return;
    }
    const role = roleForSelection(left, right, enabled);
    const previous = sessionId === null ? defaultRole : bindings[sessionId] ?? null;
    const defaultChanged = defaultRole !== role;
    defaultRole = role;
    if (sessionId !== null) bindings[sessionId] = role;
    if (previous !== role || defaultChanged) {
      await save();
      ctx.emit("system-prompt/change");
    }
    send(200, { role, skill: role ? "nekojishi-" + role : null });
  } }), "nekojishi: session character binding");
}

// src/index.mjs
var inject = ["webServer", "skills", "systemPrompt"];
async function apply(ctx) {
  await installPersona(ctx);
  const root = fileURLToPath2(new URL(resource_pack_default.kind === "game" ? "../assets/" : "../demo-assets/", import.meta.url));
  let manifest;
  try {
    manifest = JSON.parse(await readFile2(join2(root, "manifest.json"), "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    ctx.logger.warn("Nekojishi resources are not imported. Native UI remains available; follow the repository local-import instructions.");
    return;
  }
  const whitelist = new Set(manifest.files);
  ctx.effect(() => ctx.webServer.register({ kind: "prefix", path: "/nekojishi-assets", handler: async (req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405);
      res.end();
      return;
    }
    let name;
    try {
      name = decodeURIComponent(new URL(req.url, "http://localhost").pathname.slice("/nekojishi-assets/".length));
    } catch {
      res.writeHead(400);
      res.end();
      return;
    }
    if (!whitelist.has(name)) {
      res.writeHead(404);
      res.end();
      return;
    }
    const actual = manifest.aliases?.[name] ?? name;
    if (actual.includes("/") || actual.includes("\\") || actual === "..") {
      res.writeHead(404);
      res.end();
      return;
    }
    const file = join2(root, actual);
    let info;
    try {
      info = await stat(file);
    } catch {
      res.writeHead(404);
      res.end();
      return;
    }
    const etag = `"${info.size}-${Math.floor(info.mtimeMs)}"`;
    if (req.headers["if-none-match"] === etag) {
      res.writeHead(304);
      res.end();
      return;
    }
    const type = actual.endsWith(".svg") ? "image/svg+xml" : actual.endsWith(".wav") ? "audio/wav" : actual.endsWith(".png") ? "image/png" : actual.endsWith(".jpg") ? "image/jpeg" : actual.endsWith(".mp3") ? "audio/mpeg" : "application/json; charset=utf-8";
    let start = 0, end = info.size - 1, status = 200;
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (match) {
        start = match[1] ? Number(match[1]) : Math.max(0, info.size - Number(match[2]));
        end = match[1] && match[2] ? Math.min(end, Number(match[2])) : end;
        status = 206;
      } else start = info.size;
      if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= info.size) {
        res.writeHead(416, { "Content-Range": `bytes */${info.size}` });
        res.end();
        return;
      }
    }
    res.writeHead(status, { "Content-Type": type, "Content-Length": end - start + 1, "Accept-Ranges": "bytes", ...status === 206 ? { "Content-Range": `bytes ${start}-${end}/${info.size}` } : {}, "Cache-Control": "private, max-age=86400", "ETag": etag, "X-Content-Type-Options": "nosniff" });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    const stream = createReadStream(file, { start, end });
    stream.on("error", () => res.destroy());
    stream.pipe(res);
  } }), "nekojishi: assets");
}
export {
  apply,
  inject
};
//# sourceMappingURL=index.js.map

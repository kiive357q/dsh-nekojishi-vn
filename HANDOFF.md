# 开发与发布交接

本项目为 DSH Nekojishi VN 的公开源码版本。公开构建默认使用原创演示资源，原版游戏资源只通过用户显式本机导入获得。

发布前执行 npm ci、npm run build、npm test、npm run release:check。如果本机导入过游戏，先 node scripts/generate-demo.mjs --force，再构建。不要提交 assets/、skills/*/references/、凭据、profile 或缓存。

Windows 默认安装使用 install.ps1 与预构建文件，无需另装编译工具。兼容范围和验证状态见 docs/VALIDATION.md。

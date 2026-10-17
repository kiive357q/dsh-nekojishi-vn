# DSH Nekojishi VN · 让 Agent 工作有一幕自己的故事

[简体中文](README.md) · [繁體中文](README.zh-TW.md) · [日本語](README.ja.md)

把 DeepSeek Harness 的任务界面变成视觉小说舞台：背景、左右人物、悬浮对话流、贴底输入框与随真实任务状态变化的表情。原生模型、项目、工具、权限、提问和会话继续由 DSH 管理。

**默认安装可用，无需游戏资源。** 公开版默认是轻量舞台：原创代码生成的三张场景、一段合成音乐，以及完整输入与侧栏交互；不附替代人物。安装了 Nekojishi 1.06s 的用户可选择在本机导入自己的游戏资源。

## 值得体验的部分

人物图像、对应表情和原版场景需要先完成下方的本机游戏导入；轻量舞台可直接使用输入、侧栏、音乐及主题切换功能。

- **人物陪你推进任务**：思考、执行、回复、等待回答、失败、本轮结束与目标完成分别反馈；完成判断依据 DSH 状态与事件。
- **舞台自然让位于工作**：人物底部锚定窗口，聊天流按轮廓安全边界避让；原生左右栏打开时重新布局，资源全屏时遮蔽并虚化底层舞台。
- **角色和模型分别选择**：两侧均支持“无”。单角色或两侧同角色可启用对应角色表达 skill，保留技术工作能力。
- **输入、输出各有位置**：底部输入框负责发送任务，主界面承载聊天流；原生功能键与提问往返继续可用。
- **工作也有自己的播放列表**：播放器位于新建会话下方，支持播放、进度、音量、随机及本地音频／歌单导入，重启不自动播放。
- **随时回到熟悉的界面**：一键撤销主题视觉覆盖；打开插件页或自动化任务页时暂时隐藏人物与头像。

## 下载或克隆后安装

已验证宿主：官方 DSH **0.2.1-rc.2**，Windows 桌面端。仓库包含预构建 `lib/` 与原创演示资源，默认安装无需 Node、npm、Python 或游戏。

1. 下载仓库 ZIP 并解压，或 `git clone https://github.com/kiive357q/dsh-nekojishi-vn.git`。
2. 从托盘正常退出 DeepSeek Harness，避免 Windows 插件文件占用。
3. 在解压后的项目目录，用 PowerShell 运行：

```powershell
.\install.ps1
```

脚本从 Windows 安装信息查找官方客户端，使用客户端自带运行时安装到 `desktop` profile，再正常打开客户端即可。便携版可显式指定：

```powershell
.\install.ps1 -DesktopExe 'D:\Apps\DeepSeek Harness\DeepSeek Harness.exe'
```

CLI 用户可用 `-Profile web`；如只需生成安装包，运行 `./install.ps1 -PackOnly`。发布附件中的 `.tgz` 可直接交给官方插件管理器或 `dsh plugin --profile desktop add <包路径>`。

脚本不下载或升级 DSH、不改账户、不接触 API Key。若 PowerShell 执行策略或客户端权限阻止执行，按本机策略处理；脚本不会修改执行策略。

DSH 本身仍需完成正常的账户或模型配置，才能发送真实任务。若已安装本项目的私人开发版，请先在官方插件管理器移除旧主题，再安装公开版，避免两份舞台和资源路由同时加载。

## 可选：使用本机游戏资源

```powershell
npm ci
python -m pip install -r scripts/requirements.txt
python scripts/import-resources.py --game-dir '你的 Nekojishi 安装目录'
npm run build
.\install.ps1 -IncludeLocalGameResources
```

导入只读本机游戏，当前适配 1.06s：107 张背景、25 首音乐、三名角色的原版图像与中文分支引用。结果留在本机，**请勿把生成的资源或完整游戏资源安装包上传到公共仓库**。恢复原创演示版：`node scripts/generate-demo.mjs --force`，再 `npm run build`。

## 角色 skill

`skills/` 包含虎爷、云豹、石虎三份人工归纳的表达规则。它们约束口吻、专业任务表达、真实完成反馈和剧情分支核对，不是模型权重训练，也不包含原始台词库。

原始中文引用仅在用户显式导入本机游戏后生成。没有引用文件时，角色不应声称核实了具体剧情。人物设定与角色名称的权利属于相应权利人；代码许可证不提供第三方角色素材授权。

## 开发与验证

```powershell
npm ci
npm run build
npm test
```

默认构建生成原创演示资源；本机已明确导入游戏时沿用本机资源配置。提交公开发布前运行 `npm run release:check`，要求演示模式并检查公开文件清单。游戏版仅供本机安装。

本机原主题 0.3.2 已通过 9 项状态／绑定检查、16 项浏览器回归与 5 项功能回归。公开版新增无资源回退检查。公开版独立安装与浏览器验证状态见 [验证说明](docs/VALIDATION.md)，不把原版测试结果冒充所有公开版环境的验证。

界面目前为简体中文；三种语言的说明文档不代表界面已全部本地化。macOS／Linux、其他 DSH 版本及第三方客户端尚未完整验证。透明布局也不能保证与所有其他外观插件同时启用兼容。

## 发布与资源边界

原创代码及原创演示资源采用 MIT；不捆绑原版游戏图片、音乐、字体、剧本或提取台词库。第三方说明见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。本插件为非官方项目。

社区目录收录目标：`awesome-dsh-plugin/awesome-dsh-plugin` 的 `data/plugins/kiive357q__dsh-nekojishi-vn.yml`，分类 `theme`。目录是否合并由维护者决定；公开仓库与 Release 发布不等于已经获得收录。

## 主题快照

以下为在隔离 DSH 宿主中导入本机《家有大猫》资源后的实际截图，不含私人会话。截图中的游戏人物、美术与界面素材权利归原权利人所有，供展示主题效果；公开安装包不包含这些游戏资源。

![视觉小说主界面](docs/screenshots/demo-stage.png)

![人物与场景选择](docs/screenshots/appearance.png)

![左侧栏与音乐播放器](docs/screenshots/sidebar-music.png)

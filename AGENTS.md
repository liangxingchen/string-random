# 项目知识库

**生成时间：** 2026-01-11
**提交：** [不可用]
**分支：** master

## 概述
用于生成随机字符串的极简 npm 包。纯 JavaScript 实现，零依赖。

## 结构
```
./
├── index.js          # 核心逻辑：random(length, options)
├── index.d.ts        # TypeScript 类型定义
├── test/
│   └── index.js      # Mocha 测试（所有测试用例）
└── package.json
```

## 查找位置
| 任务 | 位置 | 备注 |
|------|----------|-------|
| 主逻辑 | index.js | random() 函数，46 行 |
| 类型定义 | index.d.ts | Options 接口 |
| 测试 | test/index.js | Mocha，每个测试 1 万次迭代 |

## 代码地图
| 符号 | 类型 | 位置 | 引用 | 角色 |
|--------|------|----------|------|------|
| random | function | index.js:12 | - | 主导出函数 |
| Options | interface | index.d.ts:1 | - | 配置类型 |

## 约定
- **双重导出**：`module.exports = random.default = random`（同时支持 CommonJS 和 ES6 默认导入）
- **ES5 语法**：使用 `var`、函数声明（不使用 const/let）
- **单测试文件**：所有 mocha 测试都在 test/index.js 中
- **仅类型定义**：包含 .d.ts 但无 tsconfig.json（仅提供类型定义）

## 反模式（本项目）
- **绝不要用 `Math.random()` 生成密码/令牌** - 不具备加密安全性
- **绝不要包含 .history/ 目录** - 编辑器备份不应存在于代码仓库中

## 独特风格
- 自定义 `run(fn, times)` 辅助函数用于压力测试（每个测试 1 万次迭代）
- 布尔简写：`options === true` 等同于 `{specials: true}`

## 命令
```bash
npm test    # 运行 mocha 测试
```

## 注意事项
- **安全性**：使用 Math.random() - 不适合加密应用场景
- **无代码检查/格式化**：未配置 .eslintrc、.prettierrc
- **无 CI/CD**：无 .github/workflows 或自动化测试
- **极简配置**：依赖工具默认设置

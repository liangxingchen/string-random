# string-random

[![npm](https://img.shields.io/npm/v/string-random.svg)](https://www.npmjs.com/package/string-random)
[![License](https://img.shields.io/npm/l/string-random.svg)](LICENSE)

一个轻量级的随机字符串生成库，支持自定义字符集和字符类型控制。纯 JavaScript 实现，零依赖。

## 特性

- ✅ 极简设计，API 简洁易用
- ✅ 支持自定义字符集（数字、字母、特殊字符）
- ✅ 支持快速生成指定长度的随机字符串
- ✅ 完整的 TypeScript 类型定义
- ✅ 零依赖，体积极小
- ✅ 同时支持 CommonJS 和 ES6 模块

## 安装

```bash
npm install string-random
# 或
yarn add string-random
# 或
pnpm add string-random
```

## 快速开始

```javascript
// CommonJS
const stringRandom = require("string-random");

// ES6
import stringRandom from "string-random";

// 基础用法
console.log(stringRandom()); // "aB3cD7xY" (默认长度 8)
console.log(stringRandom(16)); // "aB3cD7xY9L2mN4oP"
```

## API 文档

### stringRandom(length?, options?)

生成指定长度的随机字符串。

**参数：**

| 参数      | 类型                            | 默认值 | 描述                 |
| --------- | ------------------------------- | ------ | -------------------- |
| `length`  | `number`                        | `8`    | 随机字符串的长度     |
| `options` | `Options` \| `string` \| `true` | `{}`   | 配置选项（详见下方） |

**返回值：** `string` - 生成的随机字符串

---

### Options 接口

控制随机字符串生成的字符集选项。

| 属性       | 类型                  | 默认值  | 描述                                 |
| ---------- | --------------------- | ------- | ------------------------------------ |
| `numbers`  | `string` \| `boolean` | `true`  | 是否包含数字，或自定义数字字符集     |
| `letters`  | `string` \| `boolean` | `true`  | 是否包含字母，或自定义字母字符集     |
| `specials` | `string` \| `boolean` | `false` | 是否包含特殊字符，或自定义特殊字符集 |

**默认字符集：**

- `numbers`: `"0123456789"`
- `letters`: `"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"`
- `specials`: `"~!@#$%^*()_+-=[]{}|;:,./<>?"`

---

## 使用示例

### 基础用法

```javascript
const stringRandom = require("string-random");

// 默认长度 8，包含数字和字母
console.log(stringRandom()); // "aB3cD7xY"

// 指定长度
console.log(stringRandom(16)); // "aB3cD7xY9L2mN4oP"
```

### 使用 Options 对象

```javascript
const stringRandom = require("string-random");

// 仅字母（不包含数字）
console.log(stringRandom(16, { numbers: false }));
// "aBcDeFgHiJkLmNoP"

// 仅数字（不包含字母）
console.log(stringRandom(16, { letters: false }));
// "1234567890123456"

// 包含特殊字符
console.log(stringRandom(16, { specials: true }));
// "aB3!cD7@xY9#L2$"
```

### 自定义字符集

```javascript
const stringRandom = require("string-random");

// 自定义字母（仅大写）
console.log(stringRandom(16, { letters: "ABCDEFG" }));
// "A3B7C2D9E1F4G8H"

// 自定义数字（仅偶数）
console.log(stringRandom(16, { numbers: "02468" }));
// "a0B2X4d6e8F0a2B"

// 自定义特殊字符
console.log(stringRandom(16, { specials: "!@#$%" }));
// "aB3!cD7@xY9#$L2"

// 组合自定义
console.log(
  stringRandom(20, {
    numbers: false,
    letters: "abcdefgh",
    specials: "!@#$%",
  })
);
// "a!b@c#d$e%f!g@h#$"
```

### 快捷方式

```javascript
const stringRandom = require("string-random");

// options=true 等同于 {specials: true}
console.log(stringRandom(16, true));
// "aB3!cD7@xY9#L2$mN4%"
```

### 使用自定义字符集字符串

```javascript
const stringRandom = require("string-random");

// 直接使用自定义字符集字符串
console.log(stringRandom(10, "ABCDEFG0123456789"));
// "A3B7C2D9E1"

// 仅数字
console.log(stringRandom(10, "0123456789"));
// "1234567890"

// 仅十六进制字符
console.log(stringRandom(32, "0123456789abcdef"));
// "a3b7c2d9e1f4a8b7c6d5e4f3a2b1c"
```

### 特殊场景

```javascript
const stringRandom = require("string-random");

// 仅特殊字符
console.log(
  stringRandom(10, {
    specials: true,
    numbers: false,
    letters: false,
  })
);
// "!@#$%^&*()_"

// 自定义仅特殊字符
console.log(
  stringRandom(10, {
    specials: ":;,",
    numbers: false,
    letters: false,
  })
);
// ":;:;:;:;:;"

// 生成 ID 风格字符串（字母 + 数字）
console.log(stringRandom(12, { specials: false }));
// "aB3cD7xY9L2m"

// 生成测试数据风格字符串（纯字母）
console.log(stringRandom(20, { numbers: false, specials: false }));
// "aBcDeFgHiJkLmNoPqRsT"
```

## TypeScript 支持

```typescript
import stringRandom from "string-random";

// 类型推断完整支持
const id: string = stringRandom(16, { specials: false });
console.log(id);

// 自定义 Options
const options: stringRandom.Options = {
  numbers: "012345",
  letters: "abcdef",
  specials: true,
};

const result: string = stringRandom(20, options);
console.log(result);
```

## 安全性

本库使用**加密安全的随机数生成器**：

- **浏览器**：使用 `crypto.getRandomValues()` (Web Crypto API)
- **Node.js**：使用 `crypto.getRandomValues()` (v15+) 或 `crypto.randomBytes()` (旧版本)

**适用于大多数场景：**

- ✅ 生成测试数据
- ✅ 生成随机文件名
- ✅ 生成临时标识符
- ✅ 生成演示用的随机字符串
- ✅ UI 占位符数据
- ✅ 随机示例文本
- ✅ 生成简单的会话 ID
- ✅ 生成 API 令牌（非高安全要求）

**不适用于高安全要求的场景：**

- ❌ 生成用户密码（建议使用专门的密码生成库）
- ❌ 生成加密密钥（应使用专门的加密库）
- ❌ 生成银行/支付相关的敏感令牌

## 兼容性

- **浏览器**：所有现代浏览器支持 `crypto.getRandomValues()`
- **Node.js**：
  - v15+：使用 `crypto.getRandomValues()`
  - v0.12+：使用 `crypto.randomBytes()` 回退
  - 极旧版本：回退到 `Math.random()`（不推荐）

## 完整示例

```javascript
const stringRandom = require("string-random");

console.log("=== string-random 示例 ===\n");

// 1. 基础用法
console.log("1. 基础用法：");
console.log("   默认:", stringRandom());
console.log("   长度16:", stringRandom(16));

// 2. 字符类型控制
console.log("\n2. 字符类型控制：");
console.log(
  "   仅字母:",
  stringRandom(12, { numbers: false, specials: false })
);
console.log(
  "   仅数字:",
  stringRandom(12, { letters: false, specials: false })
);
console.log("   全部:", stringRandom(12, { specials: true }));

// 3. 自定义字符集
console.log("\n3. 自定义字符集：");
console.log(
  "   仅大写:",
  stringRandom(10, { letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" })
);
console.log(
  "   仅小写:",
  stringRandom(10, { letters: "abcdefghijklmnopqrstuvwxyz" })
);
console.log("   二进制:", stringRandom(8, "01"));
console.log("   十六进制:", stringRandom(8, "0123456789ABCDEF"));

// 4. 复杂组合
console.log("\n4. 复杂组合：");
console.log(
  "   字母+符号:",
  stringRandom(15, { numbers: false, specials: true })
);
console.log(
  "   数字+符号:",
  stringRandom(15, { letters: false, specials: true })
);
console.log(
  "   自定义:",
  stringRandom(15, { letters: "ABC", numbers: "123", specials: "!@#" })
);

// 5. 实际应用
console.log("\n5. 实际应用：");
const generateUsername = () => "user_" + stringRandom(8).toLowerCase();
console.log("   用户名:", generateUsername());
const generateTempId = () => stringRandom(12, { specials: false });
console.log("   临时ID:", generateTempId());
const generateTestEmail = () => stringRandom(6) + "@example.com";
console.log("   测试邮箱:", generateTestEmail());

// 输出示例：
// === string-random 示例 ===
//
// 1. 基础用法：
//    默认: aB3cD7xY
//    长度16: aB3cD7xY9L2mN4oP
//
// 2. 字符类型控制：
//    仅字母: aBcDeFgHiJkL
//    仅数字: 123456789012
//    全部: aB3!cD7@xY9#
//
// 3. 自定义字符集：
//    仅大写: ABCDEFGHIJ
//    仅小写: abcdefghij
//    二进制: 01101001
//    十六进制: 3A7C2F9D
//
// 4. 复杂组合：
//    字母+符号: aB!cD@eF#gH$iJ%
//    数字+符号: 1!2@3#4$5%6&7*
//    自定义: A1!B2@C3#D4$E5%
//
// 5. 实际应用：
//    用户名: user_abc3x7y9
//    临时ID: aB3cD7xY9L2m
//    测试邮箱: xyz123@example.com
```

## 常见问题

### Q: 如何生成纯字母字符串？

```javascript
stringRandom(16, { numbers: false, specials: false });
```

### Q: 如何生成仅数字字符串？

```javascript
stringRandom(16, { letters: false, specials: false });
```

### Q: 如何生成十六进制字符串？

```javascript
stringRandom(32, "0123456789abcdef");
// 或
stringRandom(32, "0123456789ABCDEF");
```

### Q: options 参数传 `true` 是什么意思？

`options = true` 等同于 `{ specials: true }`，即包含所有字符集（数字、字母、特殊字符）。

```javascript
stringRandom(16, true); // 等同于 stringRandom(16, { specials: true })
```

### Q: 可以同时使用自定义字符集字符串和 Options 对象吗？

不可以。当 `options` 参数是字符串时，直接使用该字符串作为字符集，忽略 Options 对象的配置。

```javascript
// 正确：使用 Options 对象
stringRandom(16, { letters: "ABC", numbers: "123" });

// 正确：使用自定义字符串
stringRandom(16, "ABC123");

// 错误：混合使用
stringRandom(16, { letters: "ABC" }, "123"); // 第三个参数会被忽略
```

### Q: 这个库可以用于生成密码吗？

本库使用加密安全的随机数生成器，适合生成一般用途的随机字符串。但对于高安全要求的密码场景，建议：

1. 使用专门的密码生成库（如 `generate-password`）
2. 增加密码长度和复杂度
3. 使用更强的字符集

```javascript
// 生成复杂密码
const password = stringRandom(24, { specials: true });
```

## 开发

```bash
# 安装依赖
npm install

# 运行测试
npm test
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 作者

- [Liang Xingchen](https://github.com/liangxingchen)

## AI Agent 使用指南

如果你是 AI Agent，以下信息可以帮助你更好地使用本库：

**核心 API：**

```javascript
stringRandom(length?, options?)
```

**常用模式：**

- 生成测试数据：`stringRandom(20, { specials: false })`
- 生成 ID：`stringRandom(16, { specials: false })`
- 生成纯数字：`stringRandom(10, { letters: false, specials: false })`
- 生成包含符号的复杂字符串：`stringRandom(20, { specials: true })`

**类型签名（TypeScript）：**

```typescript
declare function stringRandom(
  length?: number,
  options?: stringRandom.Options | string | true
): string;

interface Options {
  numbers?: string | boolean; // 默认 true
  letters?: string | boolean; // 默认 true
  specials?: string | boolean; // 默认 false
}
```

**限制：**

- 使用加密安全的随机数生成器 (`crypto.getRandomValues()` / `crypto.randomBytes()`)
- 跨平台兼容（浏览器 + Node.js）
- 高安全要求的场景（密码、密钥）建议使用专门的加密库

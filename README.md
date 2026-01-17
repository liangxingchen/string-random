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
- ✅ 基于加密安全的随机数生成器 `crypto.getRandomValues()`

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

| 参数      | 类型                            | 默认值 | 描述                           |
| --------- | ------------------------------- | ------ | ------------------------------ |
| `length`  | `number`                        | `8`    | 随机字符串的长度，最大支持4096 |
| `options` | `Options` \| `string` \| `true` | `{}`   | 配置选项（详见下方）           |

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
  }),
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
  }),
);
// "!@#$%^&*()_"

// 自定义仅特殊字符
console.log(
  stringRandom(10, {
    specials: ":;,",
    numbers: false,
    letters: false,
  }),
);
// ":;:;:;:;:;"

// 生成 ID 风格字符串（字母 + 数字）
console.log(stringRandom(12, { specials: false }));
// "aB3cD7xY9L2m"

// 生成测试数据风格字符串（纯字母）
console.log(stringRandom(20, { numbers: false, specials: false }));
// "aBcDeFgHiJkLmNoPqRsT"
```

## 安全性

本库使用**加密安全的随机数生成器**：

**适用于大多数场景：**

- ✅ 生成测试数据
- ✅ 生成随机文件名
- ✅ 生成临时标识符
- ✅ 生成演示用的随机字符串
- ✅ UI 占位符数据
- ✅ 随机示例文本
- ✅ 生成短信验证码
- ✅ 生成简单的会话 ID
- ✅ 生成 API 令牌
- ✅ 生成用户密码
- ✅ 生成加密密钥

## 兼容性

本库使用 `crypto.getRandomValues()` 生成随机数，该方法的支持情况为：

- **浏览器**：所有现代浏览器支持
- **Node.js**：v15+
- **极旧环境或特殊环境**：IE浏览器/小程序环境，请自行添加polyfill

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

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 作者

- [Liang Xingchen](https://github.com/liangxingchen)

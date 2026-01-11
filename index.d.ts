/**
 * @namespace stringRandom
 * @description string-random 命名空间，包含所有类型定义
 */

declare namespace stringRandom {
  /**
   * 随机字符串生成选项配置
   *
   * @interface Options
   *
   * @description
   * 控制随机字符串生成的字符集选项。所有选项都是可选的，可以使用布尔值或自定义字符串。
   *
   * **示例用法：**
   * ```typescript
   * import stringRandom from 'string-random';
   *
   * // 使用布尔值
   * stringRandom(16, { numbers: false, letters: true, specials: true });
   *
   * // 使用自定义字符集
   * stringRandom(16, {
   *   numbers: '012345',
   *   letters: 'abcdef',
   *   specials: '!@#$%'
   * });
   *
   * // 组合使用
   * stringRandom(16, {
   *   numbers: false,           // 不包含数字
   *   letters: 'ABCDEF',        // 仅使用指定字母
   *   specials: true           // 包含所有特殊字符
   * });
   * ```
   *
   * **默认字符集：**
   * - numbers: "0123456789"
   * - letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
   * - specials: "~!@#$%^*()_+-=[]{}|;:,./<>?"
   */
  interface Options {
    /**
     * 是否包含数字或自定义数字字符集
     *
     * - `true` | `undefined`: 使用默认数字集 "0123456789"
     * - `false`: 不包含任何数字
     * - `string`: 使用自定义的数字字符串，例如 "012345" 或 "2468"
     *
     * @default true
     * @example
     * // 使用默认数字
     * stringRandom(10, { numbers: true });        // "a3B7x2K9L1"
     *
     * // 不包含数字
     * stringRandom(10, { numbers: false });       // "abcXYZdefGHI"
     *
     * // 自定义数字（仅偶数）
     * stringRandom(10, { numbers: "02468" });     // "a0B2X4d6e8F"
     */
    numbers?: string | boolean;

    /**
     * 是否包含字母或自定义字母字符集
     *
     * - `true` | `undefined`: 使用默认字母集（大小写英文字母）
     * - `false`: 不包含任何字母
     * - `string`: 使用自定义的字母字符串，例如 "abcdef" 或 "ABCDEFG"
     *
     * @default true
     * @example
     * // 使用默认字母（大小写混合）
     * stringRandom(10, { letters: true });        // "aB3cD7xY9L"
     *
     * // 不包含字母（仅数字）
     * stringRandom(10, { letters: false });       // "1234567890"
     *
     * // 仅大写字母
     * stringRandom(10, { letters: "ABCDEFG" });   // "A3B7C2D9E1"
     *
     * // 仅小写字母
     * stringRandom(10, { letters: "abcdef" });   // "a3b7c2d9e1"
     */
    letters?: string | boolean;

    /**
     * 是否包含特殊字符或自定义特殊字符集
     *
     * - `true`: 使用默认特殊字符集 "~!@#$%^*()_+-=[]{}|;:,./<>?"
     * - `false` | `undefined`: 不包含任何特殊字符（默认）
     * - `string`: 使用自定义的特殊字符字符串，例如 "!@#$%" 或 ":;"
     *
     * @default false
     * @example
     * // 包含默认特殊字符
     * stringRandom(10, { specials: true });       // "aB3!cD7@xY9"
     *
     * // 仅使用标点符号
     * stringRandom(10, { specials: ":;.,?!" });  // "a:B3;cD.7xY"
     *
     * // 仅使用符号字符（不包含字母数字）
     * stringRandom(10, { specials: true, numbers: false, letters: false }); // "!@#$%^&*()_"
     */
    specials?: string | boolean;
  }
}

/**
 * 生成随机字符串
 *
 * @function stringRandom
 * @description
 * 生成指定长度的随机字符串，支持自定义字符集和字符类型控制。
 *
 * **重要提示：** 本函数使用 `Math.random()` 生成随机数，不具备加密安全性，
 * **不适合**用于生成密码、令牌、会话 ID 等安全敏感场景。
 * 如需加密安全的随机数，请使用 Node.js 的 `crypto` 模块。
 *
 * @param {number} [length=8] - 随机字符串的长度，默认为 8
 * @param {stringRandom.Options | string | true} [options={}] - 配置选项
 *
 * @returns {string} 生成的随机字符串
 *
 * @example
 * ```typescript
 * // 基础用法
 * stringRandom();                    // "aB3cD7xY"  (默认长度 8，包含数字和字母)
 * stringRandom(16);                  // "aB3cD7xY9L2mN4oP"
 *
 * // 使用 Options 对象
 * stringRandom(16, { numbers: false });           // "aBcDeFgHiJkLmNoP" (仅字母)
 * stringRandom(16, { letters: false });           // "1234567890123456"  (仅数字)
 * stringRandom(16, { specials: true });           // "aB3!cD7@xY9#L2$" (包含特殊字符)
 *
 * // 自定义字符集
 * stringRandom(16, { letters: "ABCDEF" });        // "A3B7C2D9E1F4G8H"
 * stringRandom(16, { numbers: "01234" });         // "a0B1c2D3e4F5g6H"
 * stringRandom(16, { specials: "!@#$%" });      // "aB3!cD7@xY9#$L2"
 *
 * // 快捷方式：options=true 等同于 {specials: true}
 * stringRandom(16, true);               // "aB3!cD7@xY9#L2$mN4%"
 *
 * // 使用自定义字符集字符串
 * stringRandom(10, "ABCDEFG0123456789");       // "A3B7C2D9E1"
 * stringRandom(10, "0123456789");               // "1234567890"
 *
 * // 复杂组合
 * stringRandom(20, {
 *   numbers: false,
 *   letters: "abcdefgh",
 *   specials: "!@#$%"
 * });  // "a!b@c#d$e%f!g@h#$"
 *
 * // 特殊场景：仅特殊字符
 * stringRandom(10, { specials: true, numbers: false, letters: false }); // "!@#$%^&*()_"
 *
 * // 特殊场景：自定义仅特殊字符
 * stringRandom(10, { specials: ":;,", numbers: false, letters: false }); // ":;:;:;:;:;"
 * ```
 */
declare function stringRandom(length?: number, options?: stringRandom.Options | string | true): string;

export = stringRandom;

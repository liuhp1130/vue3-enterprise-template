/**
 * <type>(<scope>): <subject>
 *
 * <body>
 *
 * <footer>
 */

export default {
  // 继承的规范配置（核心：使用 conventional 规范）
  extends: ["@commitlint/config-conventional"],
  // 自定义规则（可选，覆盖继承的规范，团队可按需扩展）
  rules: {
    // 提交类型枚举，限制仅允许以下类型
    "type-enum": [
      2, // 2 = 强制报错，1 = 警告，0 = 关闭规则
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    // 提交类型不能为空
    "type-empty": [2, "never"],
    // 提交作用域可选，不能为空（若填写）
    "scope-empty": [0, "never"], // 0 表示关闭「作用域必填」，改为可选
    // 提交描述不能为空【与冒号之间必须有空格】
    "subject-empty": [2, "never"],
    // 提交描述首字母小写
    "subject-case": [0, "never", ["lower-case"]],
  },
}

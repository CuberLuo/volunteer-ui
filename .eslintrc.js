module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭函数名与括号之间要求存在空格的问题
    'space-before-function-paren': 'off',
    // 关闭不允许vue文件单个单词问题
    'vue/multi-word-component-names': 'off',
    // 关闭使用tab缩进导致报错的问题
    'no-tabs': 'off',
    // 关闭注释中空格报错问题
    'no-irregular-whitespace': 'off',
    // 关闭导入组件未使用报错问题
    'no-unused-vars': 'off'
  }
}

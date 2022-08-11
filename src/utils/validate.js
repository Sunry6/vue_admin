/**
 * 判断是否为外部资源
 * @param {路径} path
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

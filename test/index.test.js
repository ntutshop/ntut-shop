import test from 'ava'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

// 我们用一个变量保留 nuxt 和 server 实例的引用
// 这样可以在单元测试结束之后关掉它们
let nuxt = null

// 初始化 Nuxt.js 并创建一个监听 localhost:4000 的服务器
test.before('Init Nuxt.js', async t => {
  const rootDir = resolve(__dirname, '..')
  let config = {}
  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (e) {}
  config.rootDir = rootDir // 项目目录
  config.dev = false // 生产构建模式
  nuxt = new Nuxt(config)
  await new Builder(nuxt).build()
  nuxt.listen(4000, 'localhost')
})



// 关掉服务器和Nuxt实例，停止文件监听。
test.after('Closing server and nuxt.js', t => {
  nuxt.close()
})

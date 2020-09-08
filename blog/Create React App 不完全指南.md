# Create React App 不完全指南

众所周知，手动构建 React 项目十分繁琐。

在 0202 年的今天，官方的构建工具 `create-react-app` 已经发展到比较好用了，完全可以覆盖大部分的使用场景，下本将简要介绍一下，如果构建出一个常规的、实用的项目。

## 初始化项目
`npx create-react-app my-app`

**官方推荐：最好不要在全局安装 `create-react-app`，以便每次初始化项目时，都使用最新的 `create-react-app`**

注意两点
1. 可以选择模版，比如使用 `typescript`，`npx create-react-app my-app --template typescript`
1. 可以选择包管理器，默认优先 `yarn`, 可以指定使用 `npm`，`npx create-react-app my-app --use-npm` (下文已 `npm` 为例)

## 启动应用
```sh
$ cd my-app
$ npm start
```
启动正常的话，浏览器会自动打开 `localhost:3000`

![img](https://user-images.githubusercontent.com/4033831/92477593-70dc2f00-f213-11ea-9dbe-8c395048fbd3.png)

## 自定义配置

实际项目中，往往需要自定义一些配置。

自定义配置的方式有：
1. 修改 package.json 中的配置项
1. 在应用根目录添加 `.env` 文件，并添加对应配置项，已覆盖默认值
1. 使用 `npm eject` 分解掉 `create-react-app`，这个方式可无限制的自定义

大部分情况下，前两种方式就可以满足需求了。
同时，官方也致力于让开发者不使用 `eject`，也能满足各种使用场景。

几个常用的配置项：

### 应用端口号
1. 在 `.env` 中添加配置项 `PORT=4000`


### 修改 `eslint` 规则
1. 在 `.env` 中添加配置项 `EXTEND_ESLINT=true`，开启扩展 `eslint`
2. 在 `package.json` 中修改 `eslintConfig`
  ```diff
  // 例如，修改为不使用分号
  /* package.json */
  "eslintConfig": {
  - "extends": "react-app"
  + "extends": "react-app",
  + "rules": {
  +   "semi": [
  +     2,
  +     "never"
  +   ]
  + }
  }
  ```

### 使用 `SASS`
1. 安装 `npm install node-sass -D` 即可

需要注意的是，引入 `node_modules` 中的 `scss` 文件时，可以这样写：
```css
@import '~some-module/some.scss'; /* some-module 为 node_modules 中的模块 */
```

也可以通过在 `.env` 中配置 `SASS_PATH`，省略前面的 `~`，具体查看[官方文档](https://create-react-app.dev/docs/adding-a-sass-stylesheet)

### 配置 `webpack-dev-server` 的 `proxy`

1. 在 `package.json` 中添加 `"proxy": "http://your-host"`

`proxy` 字段只支持字符串类型的配置，如果需要更灵活的配置，可利用官方提供的 express app hook 实现，具体查看[官方文档](https://create-react-app.dev/docs/proxying-api-requests-in-development)

### 使用 Ant Design 和 Less

这个配置比较麻烦，需要借助第三方的自定义配置工具，这里以 `ant-design` 官方推荐 `craco` 为例。

1. 安装 `craco`，`npm install @craco/craco`
2. 替换 `package.json` 中的 `scripts`
  ```diff
  /* package.json */
  "scripts": {
  - "start": "react-scripts start",
  - "build": "react-scripts build",
  - "test": "react-scripts test",
  + "start": "craco start",
  + "build": "craco build",
  + "test": "craco test",
  }
  ```
3. 安装 `less-loader`，`npm install -D craco-less`
4. 在项目根目录创建一个 craco.config.js 用于修改默认配置
  ```javascript
  const CracoLessPlugin = require('craco-less')

  module.exports = {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              // 这里传入主题
              // 实际项目的话，可以独立一个 antd.theme.js
              modifyVars: { '@primary-color': '#1DA57A' },
              javascriptEnabled: true
            }
          }
        }
      }
    ]
  }
  ```
5. 最后安装 `antd`，`npm install antd`
至此，一个常规的 React 项目已经构建好，可以愉快地写 bug 了。

更多细节查看
1. [Create React App 官方文档](https://create-react-app.dev/docs/getting-started)
2. [Ant Design 官方文档](https://ant.design/docs/react/use-with-create-react-app-cn)

# Micro-SPA

微前端的一种思路实现

# 前提

目前 demo 方案实现基于 vue，并没有考虑支持多个技术栈支持，如果需要可以在 demo 思路的基础上扩展。
demo 目前仅仅提供思路实现，具体细节（维护子应用挂载、销毁，store 分发等）未一一实现。

## 容器应用

微前端基座（容器应用），提供微前端最基本的代码架构，比如初始化 vue，注册子模块，通用依赖的定义，权限控制等功能。

其中有一些注意点：

- Router：为了让微前端能够无缝跳转其他页面，统一使用全局路由，在子模块中定义的路由将会在加载页面时实时合并到主路由中，之后由主路由接管跳转子模块逻辑；

基座启动时候执行如下逻辑将子模块加入到应用中：

1. 子模块的通用代码绑定至全局函数；
2. 基于 url 请求获取子模块部署的 manifest.json（路由文件、入口文件等信息）；
3. 匹配子模块的路由加入到基座的路由规则；
4. 加载对应子模块的入口文件；

## hosts 配置

因为容器应用不依赖于子模块的执行，开发过程中，容器应用与子模块是相互独立的服务，需要各自启动。这个时候需要有个类似注册中心来发现对应的子模块地址。在匹配到对应 url 地址时候去读取 host 文件配置与当前 url 做匹配，匹配成功会去相应地址去读取资源文件。

demo 中 app 应用的 config 目录下的 host.js 文件定义了子模块的地址信息，配置中可以包含多个不同服务器环境的地址，在不同的环境中自动使用相对应的 url。

## 路由

方案在容器应用的路由拦截器部分实现子模块的路由获取，并将其添加进主路由。

```javascript
if (to.name === "$MicroBiz") {
  fetch(`${config.moduleA.dev}/manifest.json`, {
    mode: "cors"
  })
    .then(res => res.json())
    .then(res => {
      const $script = document.createElement("script");
      $script.id = `router-moduleA`;
      $script.src = `${config.moduleA.dev}${res["routes.js"]}`;
      $script.onload = () => {
        const customRoutes = window.mp[`moduleA_routes`]();
        router.addRoutes(customRoutes);
        return next();
      };
      document.body.appendChild($script);
    });
}
```

## module.vue

容器应用中最重要的部分就是如何获取并渲染微前端模块。现提供一个 module.vue 模块专门负责拉取并渲染微前端模块，则 module.vue 需要做的事情如下：

- 定位微前端模块所在的 host 并拉取微前端模块 manifest.json 列表

- 由于获取 manifest 的过程在加载路由时已经完成，因此接下来直接从
  store 中获取该模块的 js 文件 url，并将其加载，再插入页面。此处直接通过往 document.head 中插入 script 标签的方法加载模块，这与加载路由文件的方法一样，不再赘述

- 执行微前端模块的渲染函数，最终将其渲染至页面中。每个微前端模块都需要定义有一个全局的渲染函数。

## 子模块

- 路由

在 jobs/routes.js 中，我们绑定一个全局函数用来让主容器获取到我们自己配置的路由信息，类似下面的代码 jobs/route.js：

```javascript
if (window.mp) {
  window.mp["moduleA_routes"] = () => route;
}
```

- entry

每一个子模块都需要一个单独的 entry 文件，这类似于主容器的 jobs/app.js，能用于初始化子模块代码、绑定全局渲染函数等。entry 文件与正常的初始化 Vue 方式一样，只是需要将初始化逻辑包裹在一个全局函数中，以便主容器能在加载此模块 js 完毕后，方便的进行渲染调用。例如：

```javascript
if (window.mp) {
  window.mp[`render_moduleA_${appName}`] = containerId => {
    let moduleA;
    let APP = {
      startAPP() {
        // 这边初始化vue

        moduleA = new Vue({
          router,
          render: h => h(Main)
        }).$mount(containerId);
      },

      destoryApp() {
        moduleA.$destory();
      }
    };

    APP.startAPP();
  };
}
```

## 一些注意点

- 公用依赖提取 可以在 webpack 的 external 配置忽略一些公用的依赖；

```javascript
externals: {
  Vue: "window.mp.Vue";
}
```

- manifest 子模块提供给容器查找对应的资源列表文件，这里使用`webpack-manifest-plugin`生成；

- entry 子模块的入口文件，需要打包过程中加入扫描全部`jobs`文件夹的功能

- 公用组件需要按需加载

## 参考链接

1. [爱奇艺号如何基于 Vue 定制开发微前端框架？](https://mp.weixin.qq.com/s/z3Ir-RnPQGXGRh6pDTu8IA)

# hMusic
音乐小程序（仿照qq音乐）

**基于微信小程序原生开发**

## 文档地址  
https://developers.weixin.qq.com/miniprogram/dev/framework

## 本项目效果图
<img width="179" alt="1677827883421" src="https://user-images.githubusercontent.com/43988239/222656431-96ad127c-e5b1-4e21-bfe6-5361c149b1a9.png">
<img width="187" alt="1677827942672" src="https://user-images.githubusercontent.com/43988239/222656619-e2c4ad06-453d-4bb0-baa5-a9ef8a132211.png">


## store插件
hy-event-store

## 网易云api如何使用
```shell
$ git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
$ cd NeteaseCloudMusicApi
$ npm install
```

```shell
$ node app.js
```

服务器启动默认端口为 3000,若不想使用 3000 端口或者想使用本地ip（我的是192.168.10.40）,可使用以下命令: Mac/Linux

```shell
$ PORT=4000 node app.js
$ set HOSTNAME=[本地ip地址] && node app.js
```

windows 下使用 git-bash 或者 cmder 等终端执行以下命令:

```shell
$ set PORT=4000 && node app.js
```


## Project setup
```
npm install

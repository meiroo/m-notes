##demo site: <http://m-notes.meteor.com>

###功能列表
1. Notes管理、Notes增删查改。 增加分页模块。修改样式基于Google Material Design-Bootstrap
2. 权限和用户管理。注册登录。只能修改和删除自己Notes。
3. MarkDown和Sublime样式。支持MarkDown格式Notes。调整src样式类似sublime。
4. 查询。按Tags查询。
5. 全站缓存。全站页面以及JS和数据库都缓存到本地。无网络情况正常使用。有网络后自动同步。
6. 用户全部Notes导出下载为JSON文件。
7. qrcode


###技术实现


####依赖组件：
```
//CSS样式类
bootstrap3： bootstrap模板样式
bootstrap-material-design： 基于bootstrap的模板
code-prettyfy： 处理代码的样式优化
markdown：markdown样式

//login
accounts-password : 处理账户密码添加验证
accounts-ui-bootstrap： 基于bootstrap的登陆框样式

//H5本地缓存 处理全部网站的本地缓存化
appcache : 处理HTML5 CSS/JS/HTML的本地缓存
grounddb：处理数据库的本地缓存

//客户端服务端数据同步和发布
autopublish：处理服务端数据库修改发布
insecure： 客户端可写全部数据库

//other
qrcode
iron:router
pnotify
```

####目录结构：
```
client  //客户端
    - template //每个文件分为js和html。js为控制器 html为模板显示。
            header, nav, note, noteEdit, notes
    - plugin  //一些组件等
            pagination pnotify

lib  //服务端和客户端共同访问数据库
    collection //数据库表

server      //服务端
    server
    publish

```


###使用到的Meteor功能特点
* 依赖subscribe，publish功能。数据库可以对前后端统一开放。数据库修改后可以publish到各个终端。  
* 动态模版 填充。Meteor采用tracker进行跟踪自动刷新。此机制是通用机制。不仅是处理界面。逻辑部分也是可以完全用此机制自动处理逻辑模块的调用。
* 本地存储。包括html css js 数据库。网络正常后会自动同步数据。
* 组件化  前后端统一化组件 一键安装

###meteor package list
```
accounts-password                   1.0.4  Password support for accounts
appcache                            1.0.2  Enable the application cache in th...
autopublish                         1.0.1  Publish the entire database to all...
ground:db                           0.0.9  Ground Meteor.Collections offline
html5cat:bootstrap-material-design  0.1.3  Google's Material Design based Boo...
ian:accounts-ui-bootstrap-3         1.1.12  Bootstrap-styled accounts-ui with...
insecure                            1.0.1  Allow all database writes by default
markdown                            1.0.2  Markdown-to-HTML processor
meteor-platform                     1.2.0  Include a standard set of Meteor p...
mizzao:bootstrap-3                  3.2.0_1  HTML, CSS, and JS framework for ...
mongo                                1.0.8  Adaptor for using MongoDB and Mini...
code-prettify
iron:router
```
# Docker

[[toc]]

## Docker 是什么？

Docker 是一个开源的应用容器引擎，基于 `GO 语言`并遵从 Apache2.0 协议开源。

Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。

容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）,更重要的是容器性能开销极低。

#### 相比传统的虚拟机，Docker有如下优点：

1. 部署在容器的Docker程序，使用的都是宿主机的硬件资源，对硬件的资源使用率高
2. Docker启动快，轻量，是传统虚拟机无法相比的
3. 兼容性高，可以在物理机、公有云、私有云、个人电脑等设备上使用
4. 可以快速部署和扩容



### Docker 包括三个组成部分

1. **镜像（Image）**：可与你理解为一个容器的定义。
2. **容器（Container）**：镜像和容器的关系就类似面向对象程序中的`类`和`对象实例`一样，镜像是静态的定义，容器是镜像运行的实体。
3. **仓库（Repository）**：用来存放镜像。

## Docker的安装

1. Docker中文官网： https://docker.p2hp.com/， 首页点击下载然后安装即可
2. Homebrew安装（Mac OS）



## Docker常用命令

```shell
# docker下所有容器
docker ps -a

# docker下正在运行的容器
docker ps

# docker下所有的镜像
docker images

# 删除镜像
docker rmi 镜像id/镜像名

# 停止容器
docker stop 容器id/容器名

# 删除容器
docker rm -f 容器id/容器名

# 访问某个容器内部的终端
docker exec -ti 容器ID /bin/bash

#查看容器底层信息
docker inspect 容器id/容器名

# 构建一个新的docker镜像，注意最后的.必须得加
docker build -t 镜像名 .

# 运行镜像，第一个8080指的是容器内部的端口，第二个8080指的是宿主机的端口
docker run -d -p 8080:8080 镜像id/镜像名

# 或者在运行时使用--name可以定义容器名称
docker run -d -p 8080:8080 --name 容器名 镜像名

# 退出容器终端
exit
```

### 命令中一些参数的含义

```
-t: 在新容器内指定一个伪终端或终端。

-i: 允许你对容器内的标准输入 (STDIN) 进行交互。

-d: 容器启动后后台运行

-P:将容器内部使用的网络端口随机映射到我们使用的主机上。

-p：设置宿主机端口与容器端口映射
```

还可以使用 `docker command --help` 查看命令相关的帮助



## Docker的容器和镜像使用

```shell
# 查找镜像
docker search mysql

# 拉取镜像，如果不带冒号后面的版本，则会拉取最新的版本
docker pull ubuntu:13.10

# 运行镜像，如果没有这个镜像，则会拉取一个新的镜像并启动这个镜像
docker run -t -i ubuntu:13.10 /bin/bash
```



### docker build 构建自定义镜像

使用docker build命令构建自定义镜像，需要使用Dockerfile文件，这个文件内置了指令，告诉Docker如何构建镜像



## 常用软件安装

### Docker 安装 Mysql（8.0）

1. 拉取镜像

```shell
docker pull mysql:8.0
```

2. 启动镜像

```shell
docker run -itd --name mysql8.0 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root mysql
```

参数说明：

**-p 3306:3306**   将容器的3306端口映射到宿主机的3306端口，可以在外部使用容器IP:3306访问

**MYSQL_ROOT_PASSWORD=root**  设置mysql的root用户密码为root

3. 查看容器是否启动

```sh
docker ps
```

4. 时间调整

docker中的mysql服务器时间没有使用北京时间，使用前需要先调一下

```
# 1. 先进入mysql容器
docker exec -ti 容器ID /bin/bash

# 2. 修改时区
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo "Asia/Shanghai" > /etc/timezone 

# 3. 退出容器
exit

# 4. 重启容器即可生效
docker restart 容器ID
```



### Docker 安装 Redis

1. 拉取镜像

```shell
docker pull redis
```

2. 运行redis镜像

```shell
docker run -itd --name redis -p 6379:6379 redis
```



### Docker 安装 ES（7.6.2 ）和 Kibana

1. 拉取镜像

```sh
docker pull elasticsearch:7.6.2
```

2. 运行镜像

```sh
docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms512m -Xmx512m" --name elasticsearch7.6.2 -d elasticsearch:7.6.2
```

3. 访问localhost:9200 ,如果返回es相关信息，说明启动成功
4. 安装Kibana

```sh
docker pull kibana:7.6.2
```

5. 在本地自定义的目录下新建Dockerfile目录，用于存放Dockerfile文件，并创建kibana.yml文件

```yml
server.name: kibana
server.host: "0"
elasticsearch.hosts: [ "http://100.125.11.37:9200"]  
xpack.monitoring.ui.container.elasticsearch.enabled: true
```

6. 启动kibana

```sh
docker run --name kibana -v /Users/yanglin/Documents/Dockerfile/kibana7.6.2/kibana.yml:/usr/share/kibana/config/kibana.yml -p 5601:5601 -d kibana:7.6.2

# 说明:
# /Users/yanglin/Documents/Dockerfile/kibana7.6.2/kibana.yml 是宿主机的yml所在文件位置
# /usr/share/kibana/config/kibana.yml 是kibana容器存放的位置
```

7. 通过访问 localhost:5601 即可访问kibana



## Springboot项目部署到Docker

#### 1. 项目开发

简单开发一个springboot应用，创建controller，方便测试

```java
@RestController
public class HelloController {

    @GetMapping("/")
    @ResponseBody
    public String hello(String echo) {
        return "hello " + echo;
    }

}
```



#### 2. 编写Dockerfile文件

```
# Docker image for springboot file run
# VERSION 0.0.1
# Author: 
# 基础镜像使用java
FROM openjdk:8
MAINTAINER yilyn
# VOLUME 指定了临时文件目录为/tmp。
# 其效果是在主机 Dockerfile所在目录下创建了一个临时文件(如果不指定，则默认在docker的文件夹下)，并链接到容器的/tmp
VOLUME /Users/yanglin/Documents/Dockerfile/yilyn-docker-demo /tmp 
# 将jar包添加到容器中并更名为xx.jar
ADD yilyn-docker-demo.jar yilyn-docker-demo.jar
# 运行jar包
RUN bash -c 'touch /yilyn-docker-demo.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/yilyn-docker-demo.jar"]
```

#### 3. 应用打包

将Springboot应用打成jar包，并将这个jar包放到Dockerfile所在的文件夹下，注意jar包的名字要和Dockerfile指定的文件名相同

#### 4. 使用docker build构建镜像

先进入Dockerfile所在的目录下，然后执行构建命令

```sh
docker build -t yilyn-docker-demo:1.0 .
```

构建完成以后查看是否构建成功

```sh
docker images
```

![docker-images](/images/docker/docker-images.png)

#### 5. 启动镜像

```sh
# 通过宿主机IP:8080访问docker容器的8080端口
docker run -d -p 8080:8080 --name yilyn-docker-demo yilyn-docker-demo:1.0
```

#### 6. 验证是否发布成功

访问localhost:8080 ，如图，说明发布成功

![验证截图](/images/docker/访问8080.png)


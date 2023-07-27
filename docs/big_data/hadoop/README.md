# 本地基于Docker搭建Hadoop环境

## 一、环境准备

1. Docker 20.10.23 
2. Ubuntu 16.04
3. hadoop-3.3.2
4. jdk8


### Ubuntu安装及环境设置

1. 拉取Ubuntu镜像
```
docker pull ubuntu:16.04
```

2. 运行镜像

```sh
# 启动镜像，后面是镜像ID
docker run --name ubuntu-hadoop -itd b6f507652425
```

3. 配置ubuntu环境
    
```shell
# 先删除原有的源文件 源文件中的源下载速度太慢
rm /etc/apt/sources.list

# 使用echo方式配置国内源(清华) Ubuntu清华源
echo "deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted
> deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted
> deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal universe
> deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates universe
> deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal multiverse
> deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates multiverse
> deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
> deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted
> deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security universe
> deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security multiverse" > /etc/apt/sources.list

# 更新apt
apt update

# 安装java环境
apt install openjdk-8-jdk

# 安装vim工具
apt install vim

# 安装net-tools工具
apt install net-tools

# 配置ssh登录
apt-get install openssh-server
apt-get install openssh-client

# 配置ssh密钥
# 进入当前用户根目录
cd ~
# 生成密钥,并将文件名设置为:authorized_keys
ssh-keygen -t rsa -P ""
# 将公钥追加到id_rsa.pub中，如果没有id_rsa.pub文件，需要执行 ssh-keygen -t rsa 生成
cat .ssh/id_rsa.pub >> .ssh/authorized_keys

# 启动ssh服务
service ssh start

# 登录自己的服务器 验证配置是否成功
ssh 127.0.0.1

# 修改 .bashrc，设置自动启动ssh服务, vim编辑 .bashrc 文件，在最后一行加入 service ssh start，保存后退出即可设置成功
vim ~/.bashrc
```

### hadoop安装

```shell
# 使用清华镜像，注意文件存放位置
wget https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/core/hadoop-3.3.2/hadoop-3.3.2.tar.gz

# 解压到 /usr/local 目录下面并重命名文件夹
tar -zxvf hadoop-3.3.2.tar.gz -C /usr/local/
cd /usr/local/
mv hadoop-3.3.2 hadoop
```

### 环境变量配置

打开环境变量配置文件： `vim /etc/profile`，配置 `JAVA` 和 `Hadoop` 环境变量
```shell

# java
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH

# hadoop
export HADOOP_HOME=/usr/local/hadoop
export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_YARN_HOME=$HADOOP_HOME
export HADOOP_INSTALL=$HADOOP_HOME
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export HADOOP_CONF_DIR=$HADOOP_HOME
export HADOOP_LIBEXEC_DIR=$HADOOP_HOME/libexec
export JAVA_LIBRARY_PATH=$HADOOP_HOME/lib/native:$JAVA_LIBRARY_PATH
export HADOOP_CONF_DIR=$HADOOP_HOME/etc/hadoop
export HDFS_DATANODE_USER=root
export HDFS_DATANODE_SECURE_USER=root
export HDFS_SECONDARYNAMENODE_USER=root
export HDFS_NAMENODE_USER=root
export YARN_RESOURCEMANAGER_USER=root
export YARN_NODEMANAGER_USER=root
```
执行命令，使配置生效： `source /etc/profile`

### hadoop环境配置
Hadoop中有5个文件需要配置，分别是 core-site.xml、hdfs-site.xml、mapred-site.xml、yarn-site.xml、workers，这些配置文件基本都在安装目录下的 ./etc/hadoop/ 文件夹中

#### 1. 首先需要配置hadoop环境脚本 hadoop-env.sh 文件，设置JAVA、HDFS、YARN等信息

```shell
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export HDFS_NAMENODE_USER=root
export HDFS_DATANODE_USER=root
export HDFS_SECONDARYNAMENODE_USER=root
export YARN_RESOURCEMANAGER_USER=root
export YARN_NODEMANAGER_USER=root
```

#### 2. 修改 core-site.xml
```xml
<configuration>　　
    <!--指定nameNode的地址-->
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://h01:8020</value>
    </property>
    <!--指定Hadoop数据的存储目录-->
    <property>
        <name>hadoop.tmp.dir</name>
        <value>/usr/local/hadoop/data</value>
    </property>
    <!--配置HDFS网页登陆使用的静态用户，配置这个之后才有权限可以在网页端删除文件、文件夹-->
    <property>
        <name>hadoop.http.staticuser.user</name>
        <value>root</value>
    </property>
</configuration>
```

#### 3. 修改 hdfs-site.xml

```xml
<configuration>
　　<!--文件的存储个数-->
    <property>
        <name>dfs.replication</name>
        <value>3</value>
    </property>
　　<!--nn web端访问地址，使用网页访问HDFS文件系统就是这个端口-->
    <property>
        <name>dfs.namenode.http-address</name>
        <value>h01:9870</value>
    </property>
　　<!--2nn web端访问地址-->
    <property>
        <name>dfs.namenode.secondary.http-address</name>
        <value>h01:9868</value>
    </property>
　　<!--网页查看HDFS文件内容，出现Couldn‘t preview the file报错，需要配置的参数-->
    <property>
        <name>dfs.webhdfs.enabled</name>
        <value>true</value>
    </property>
</configuration>
```

#### 4. 修改 mapred-site.xml

```xml
<configuration>
　　<!--指定MapReduce程序运行在Yarn上-->
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```

#### 5. 修改 yarn-site.xml

```xml
<configuration>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
    <property>
        <name>yarn.resourcemanager.hostname</name>
        <value>h01</value>
    </property>
    <property>
        <name>yarn.nodemanager.env-whitelist</name>         
        <value>JAVA_HOME,HADOOP_COMMON_HOME,HADOOP_HDFS_HOME,HADOOP_CONF_DIR,CLASSPATH_PREPEND_DISTCACHE,HADOOP_YARN_HOME,HADOOP_MAPRED_HOME</value>
    </property>
</configuration>
```

### 6. 修改 workers 这里集群有几个就写几个，不能有空行和空格

```shell
h01
h02
h03
```

### docker镜像构建

将配置好的ubuntu docker容器，构建成一个docker镜像

```shell
# docker commit -m "镜像描述" 容器ID 生成的镜像名
docker commit -m "hadoop image" be28f33a2de8 ubuntu-hadoop
```

### 启动hadoop

1. 启动 h01 节点，作为master节点，需要暴露端口，以供web访问
```shell
docker run -it --network hadoop -h h01 --name "h01" -p 9870:9870 -p 8088:8088 ubuntu-hadoop /bin/bash
```

2. 启动 h02 节点
```shell
docker run -it --network hadoop -h h02 --name "h02" ubuntu-hadoop /bin/bash
```

3.  启动 h03 节点
```shell
docker run -it --network hadoop -h h03 --name "h03" ubuntu-hadoop /bin/bash
```

4. 在 h01 节点中，启动hadoop集群
```shell
# 进入h01容器所在服务器
docker exec -it h01 sh

# 先格式化操作，否则hdfs起不来，只有第一次启动的时候需要初始化，进入`/usr/local/hadoop` 目录下操作
./bin/hdfs namenode -format

# 启动HDFS集群
./sbin/start-dfs.sh

# 启动yarn集群管理节点
./sbin/start-yarn.sh

```

5. 访问hadoop

访问`localhost:9870`，即可看到Hadoop的文件管理系统

访问`localhost:8088`，即可看到Hadoop Yarn的资源调度系统
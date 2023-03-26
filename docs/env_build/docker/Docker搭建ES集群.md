[[toc]]

## Docker搭建3个节点的ES集群

### 1. 本地创建Docker节点的yml文件

创建3个文件，分别命名为node0.yml、node1.yml 和 node1.yml

```ymal
cluster.name: yilyn-es-cluster
# node节点的名称，三个节点名称分别为node0、node1、node2
node.name: node0
network.host: 0.0.0.0
# 外部访问es的端口，三个节点都是9200，因为是不同的容器，没有影响
http.port: 9200

# 节点之间通讯的端口，三个节点都是9300，因为是不同的容器，没有影响
transport.tcp.port: 9300

# 各个节点的ip与通讯端口，节点内部通过tcp互相通信，因为在同一个宿主机下，可以使用【容器名:端口】的方式在docker内部访问
discovery.seed_hosts: ["es-node0:9300","es-node1:9300","es-node2:9300"]
 
# 初始祝节点，默认设置为node0
cluster.initial_master_nodes: ["node0"]
bootstrap.system_call_filter: false
bootstrap.memory_lock: false
http.cors.enabled: true
http.cors.allow-origin: "*"
```

### 2. 创建网桥

```shell
# 创建名为 elastic 的网桥，所有节点可以通过网桥形成集群
docker network create elastic
```

### 3. 创建容器

**node0节点容器创建**

```shell
docker create --name es-node0 --net elastic -p 9300:9300 -p9200:9200 -v /Users/yanglin/Documents/Dockerfile/es-cluster/node0.yml:/usr/share/elasticsearch/config/elasticsearch.yml -t elasticsearch:7.6.2
```

**node1节点容器创建**

```shell
docker create --name es-node1 --net elastic -p 9301:9301 -p9201:9201 -v /Users/yanglin/Documents/Dockerfile/es-cluster/node1.yml:/usr/share/elasticsearch/config/elasticsearch.yml -t elasticsearch:7.6.2
```

**node2节点容器创建**

```shell
docker create --name es-node2 --net elastic -p 9302:9302 -p9202:9202 -v /Users/yanglin/Documents/Dockerfile/es-cluster/node2.yml:/usr/share/elasticsearch/config/elasticsearch.yml -t elasticsearch:7.6.2
```

### 4. 查看容器并启动

![es-cluster-container.png](/images/docker/es-cluster-container.png)

上图列表中就是刚才创建的3个es节点容器，接下来就是启动这三个es容器了

### 5. 安装kibana

```shell
# 拉取镜像
docker pull kibana:7.6.2

# 运行镜像，需要和es的三个节点使用同一个网桥，相当于在同一个局域网下
docker run --name es-cluster-kibana --net elastic -p 5601:5601 kibana:7.6.2
```

kibana启动后要修改kibana.yml的配置文件，才能连接到3个es节点上

```shell
# 进入kibana容器
docker exec -it kibana容器ID sh

# 修改kibana.yml
vi config/kibana.yml

# 将下面的配置改成es节点对应的IP+端口，因为是同一个网桥下，所以可以使用【容器名:端口】的方式
elasticsearch.hosts: [ "http://es-node0:9200","http://es-node1:9200","http://es-node2:9200" ]

# 保存并退出，然后重启kibana容器
docker restart 容器ID
```

### 6. 访问kibana, http://localhost:5601 顺利进入kibana说明集群搭建成功
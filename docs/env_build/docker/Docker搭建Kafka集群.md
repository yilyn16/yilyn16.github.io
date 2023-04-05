# Docker搭建Kafka集群

### 环境及架构说明

因为Kafka集群依赖Zookeeper，所以本文掩饰搭建Zookeeper和3个Kafka broker组成的集群

**zookeeper在kafka集群中的作用**:
1. zk可以作为协调者，管理producer、consumer和broker
2. 管理Topic和Broker的对应关系
3. Broker向zk注册后，producer可以感知broker的变化，从而实现负载均衡

### 搭建Zookeeper

1. 拉取zk镜像
```shell
docker pull zookeeper
```

2. 启动镜像
```shell
docker run -d --name zookeeper -p 2181:2181 -t cd95534ce638
```

### 搭建Kafka Cluster

1. 拉取名为`ubuntu/kafka`的镜像
```shell
docker pull ubuntu/kafka
```

2. 使用 docker compose创建容器, 创建如下的yml文件，并放在本地挂载目录下

```shell
version: '3'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    container_name: zookeeper
    ports:
      - "2181:2181"
 
  kafka1:
    image: wurstmeister/kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: 192.168.31.74 #宿主机的IP,可以多个
      KAFKA_CREATE_TOPICS: TestComposeTopic:2:1 # 初始化容器时创建的topic名称，2:1代表存在于2个分组，1个副本
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181 # 连接zk的集群，因为是同一个容器，可以使用容器名，如果是不同的机器，需要写成IP+端口
      KAFKA_BROKER_ID: 1
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://192.168.31.74:9092
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092
    container_name: kafka01 # 容器名
    volumes:
      - /Users/yanglin/Documents/Dockerfile/kafka-cluster:/var/run/docker.sock # 将本地文件目录挂在到容器目录中
 
  kafka2:
    image: wurstmeister/kafka
    ports:
      - "9093:9093"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: 192.168.31.74 
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_BROKER_ID: 2
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://192.168.31.74:9093
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9093
    container_name: kafka02
    volumes:
      - /Users/yanglin/Documents/Dockerfile/kafka-cluster:/var/run/docker.sock
 
  kafka3:
    image: wurstmeister/kafka
    ports:
      - "9094:9094"
    environment:
      KAFKA_ADVERTISED_HOST_NAME: 192.168.31.74
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_BROKER_ID: 3
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://192.168.31.74:9094
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9094
    container_name: kafka03
    volumes:
      - /Users/yanglin/Documents/Dockerfile/kafka-cluster:/var/run/docker.sock
```

3. 执行脚本，进行zk和集群的安装

```shell
docker-compose -f docker-compose-kafka-cluster.yml up
```

4. 等待容器启动完成，验证是否安装成功

分别进入3个 broker 容器验证：
```shell
# 进入容器
docker exec -it d9e6adea81b7 sh

# 查看topic分区
kafka-topics.sh --describe --zookeeper 宿主机IP:2181 --topic TestComposeTopic
```

可以看到topic在broker中的分区情况
![topic分区情况](/images/docker/kafka集群topic.png)

5. 消息发送和接收验证

broker1作为生产者发送消息，进入broker1容器执行如下命令
```shell
# kafka01:9092 kafka01指的是容器名， TestComposeTopic
kafka-console-producer.sh --broker-list kafka01:9092 --topic TestComposeTopic
```

broker2和broker3作为消费者消费消息，进入broker2和broker3容器分别执行如下命令
```shell
# kafka03:9094 这里broker2和broker3的容器名和端口不一样，执行的时候注意区分
kafka-console-consumer.sh --bootstrap-server kafka03:9094 --topic TestComposeTopic --from-beginning
```

执行完毕后，在broker1中发送消息，broker2和broker3就能接收到
![kafka集群生产消费测试](/images/docker/kafka集群生产消费测试.png)

(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{298:function(s,a,e){"use strict";e.r(a);var n=e(7),r=Object(n.a)({},(function(){var s=this,a=s._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"docker搭建kafka集群"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker搭建kafka集群"}},[s._v("#")]),s._v(" Docker搭建Kafka集群")]),s._v(" "),a("h3",{attrs:{id:"环境及架构说明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#环境及架构说明"}},[s._v("#")]),s._v(" 环境及架构说明")]),s._v(" "),a("p",[s._v("因为Kafka集群依赖Zookeeper，所以本文掩饰搭建Zookeeper和3个Kafka broker组成的集群")]),s._v(" "),a("p",[a("strong",[s._v("zookeeper在kafka集群中的作用")]),s._v(":")]),s._v(" "),a("ol",[a("li",[s._v("zk可以作为协调者，管理producer、consumer和broker")]),s._v(" "),a("li",[s._v("管理Topic和Broker的对应关系")]),s._v(" "),a("li",[s._v("Broker向zk注册后，producer可以感知broker的变化，从而实现负载均衡")])]),s._v(" "),a("h3",{attrs:{id:"搭建zookeeper"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#搭建zookeeper"}},[s._v("#")]),s._v(" 搭建Zookeeper")]),s._v(" "),a("ol",[a("li",[s._v("拉取zk镜像")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull zookeeper\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("启动镜像")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-d")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--name")]),s._v(" zookeeper "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-p")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2181")]),s._v(":2181 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-t")]),s._v(" cd95534ce638\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("h3",{attrs:{id:"搭建kafka-cluster"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#搭建kafka-cluster"}},[s._v("#")]),s._v(" 搭建Kafka Cluster")]),s._v(" "),a("ol",[a("li",[s._v("拉取名为"),a("code",[s._v("ubuntu/kafka")]),s._v("的镜像")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" pull ubuntu/kafka\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("使用 docker compose创建容器, 创建如下的yml文件，并放在本地挂载目录下")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("version: "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'3'")]),s._v("\nservices:\n  zookeeper:\n    image: wurstmeister/zookeeper\n    container_name: zookeeper\n    ports:\n      - "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2181:2181"')]),s._v("\n \n  kafka1:\n    image: wurstmeister/kafka\n    ports:\n      - "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"9092:9092"')]),s._v("\n    environment:\n      KAFKA_ADVERTISED_HOST_NAME: "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".31.74 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#宿主机的IP,可以多个")]),s._v("\n      KAFKA_CREATE_TOPICS: TestComposeTopic:2:1 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 初始化容器时创建的topic名称，2:1代表存在于2个分组，1个副本")]),s._v("\n      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 连接zk的集群，因为是同一个容器，可以使用容器名，如果是不同的机器，需要写成IP+端口")]),s._v("\n      KAFKA_BROKER_ID: "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("\n      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://192.168.31.74:9092\n      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092\n    container_name: kafka01 "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 容器名")]),s._v("\n    volumes:\n      - /Users/yanglin/Documents/Dockerfile/kafka-cluster:/var/run/docker.sock "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 将本地文件目录挂在到容器目录中")]),s._v("\n \n  kafka2:\n    image: wurstmeister/kafka\n    ports:\n      - "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"9093:9093"')]),s._v("\n    environment:\n      KAFKA_ADVERTISED_HOST_NAME: "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".31.74 \n      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181\n      KAFKA_BROKER_ID: "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("\n      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://192.168.31.74:9093\n      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9093\n    container_name: kafka02\n    volumes:\n      - /Users/yanglin/Documents/Dockerfile/kafka-cluster:/var/run/docker.sock\n \n  kafka3:\n    image: wurstmeister/kafka\n    ports:\n      - "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"9094:9094"')]),s._v("\n    environment:\n      KAFKA_ADVERTISED_HOST_NAME: "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".31.74\n      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181\n      KAFKA_BROKER_ID: "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("\n      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://192.168.31.74:9094\n      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9094\n    container_name: kafka03\n    volumes:\n      - /Users/yanglin/Documents/Dockerfile/kafka-cluster:/var/run/docker.sock\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br"),a("span",{staticClass:"line-number"},[s._v("42")]),a("br"),a("span",{staticClass:"line-number"},[s._v("43")]),a("br"),a("span",{staticClass:"line-number"},[s._v("44")]),a("br"),a("span",{staticClass:"line-number"},[s._v("45")]),a("br"),a("span",{staticClass:"line-number"},[s._v("46")]),a("br"),a("span",{staticClass:"line-number"},[s._v("47")]),a("br"),a("span",{staticClass:"line-number"},[s._v("48")]),a("br"),a("span",{staticClass:"line-number"},[s._v("49")]),a("br"),a("span",{staticClass:"line-number"},[s._v("50")]),a("br")])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("执行脚本，进行zk和集群的安装")])]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker-compose")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-f")]),s._v(" docker-compose-kafka-cluster.yml up\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("等待容器启动完成，验证是否安装成功")])]),s._v(" "),a("p",[s._v("分别进入3个 broker 容器验证：")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 进入容器")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("docker")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("-it")]),s._v(" d9e6adea81b7 "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 查看topic分区")]),s._v("\nkafka-topics.sh "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--describe")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--zookeeper")]),s._v(" 宿主机IP:2181 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--topic")]),s._v(" TestComposeTopic\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("可以看到topic在broker中的分区情况\n"),a("img",{attrs:{src:"/images/docker/kafka%E9%9B%86%E7%BE%A4topic.png",alt:"topic分区情况"}})]),s._v(" "),a("ol",{attrs:{start:"5"}},[a("li",[s._v("消息发送和接收验证")])]),s._v(" "),a("p",[s._v("broker1作为生产者发送消息，进入broker1容器执行如下命令")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kafka01:9092 kafka01指的是容器名， TestComposeTopic")]),s._v("\nkafka-console-producer.sh --broker-list kafka01:9092 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--topic")]),s._v(" TestComposeTopic\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("broker2和broker3作为消费者消费消息，进入broker2和broker3容器分别执行如下命令")]),s._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# kafka03:9094 这里broker2和broker3的容器名和端口不一样，执行的时候注意区分")]),s._v("\nkafka-console-consumer.sh --bootstrap-server kafka03:9094 "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[s._v("--topic")]),s._v(" TestComposeTopic --from-beginning\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("执行完毕后，在broker1中发送消息，broker2和broker3就能接收到\n"),a("img",{attrs:{src:"/images/docker/kafka%E9%9B%86%E7%BE%A4%E7%94%9F%E4%BA%A7%E6%B6%88%E8%B4%B9%E6%B5%8B%E8%AF%95.png",alt:"kafka集群生产消费测试"}})])])}),[],!1,null,null,null);a.default=r.exports}}]);
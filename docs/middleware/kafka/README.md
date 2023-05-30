# Kafka

Kafka 最初由Linkedin公司开发，是一个分布式的、支持分区的（partition）、多副本的（replica）、基于zookeeper协调消息处理系统。

### Kafka特性
1. 高吞吐、低延迟：每秒可以处理几十万条消息


## 架构图

![Kafka架构图](/images/middleware/kafka/Kafka架构图.png)


## 常见问题

### kafka如何保证消息不重复消费

*重复消费的场景：*
1. consumer宕机，消费了一半的消息没有提交，触发rebalance，重新选去一个consumer消费，新的consumer拉取消息时还是按照旧的offset位置进行拉取，从而出现原consumer和新consumer会重复消费部分消息
2. consumer超过固定时间（session time：默认5s，最大10s）没有向broker发送心跳（每隔3s发送一次），broker认为consumer已经离线，触发rebalance，选择新的cosumer
3. 消费超时，consumer一次拉取（默认500）条数据进行消费，但是处理500条的时间超过规定的响应时间（5min），broker会认为consumer消费能力不够，重新选择新的consumer

*解决办法：*
1. 需要在consumer端做好幂等处理
2. 另外根据业务实际情况对配置做一些修改，比如consumer消息确认的响应时间可以适当放大等等

### kafka如何保证消息不丢失
**丢失场景：**
1. producer丢失：

+ ack配置：
  + **1** ：默认值，代表producer发送给broker之后，broker要将数据写入leader partition才会返回ack确认；
  + **0** ：代表broker接收到消息之后立刻响应ack；
  + **-1或all** ：代表broker接收消息后，leader和isr列表中的follower都要卸乳成功才能响应ack

    **解决办法：**
    + ack配置为-1或者1，按实际业务情况，配合producer配置重试次数进行重试
    + 发送消息时使用带回调的方法发送，失败时可以回调producer进行业务处理


2. **broker丢失**：broker内部使用`异步刷盘`策略，先写缓存再刷盘，如果写完缓存，broker宕机，数据就会丢失； 

   **解决办法：**多副本数据备份

3. **consumer丢失：** 自动提交offset，如果consumer还没有消费完，就进行了自动提交，此时consumer异常，这个消息就丢失了

   **解决办法：** 需要设置为手动提交，consumer执行完成后再提交offset
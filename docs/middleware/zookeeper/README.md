# Zookeeper选举机制

Zookeeper为了保证各节点的协同，在工作时需要一个Leader，提供三种选举机制：
1. LeaderElection
2. AuthFastLeaderElection
3. 默认采用FastLeaderElection算法

## 首先需要了解一些概念

### 1. 服务器ID
即myid，在服务器配置参数中配置，myid越大，选举权重越大

### 2. 选举状态
选举过程中有4种状态
1. LOOKING（竞选状态），启动时默认的状态
2. FOLLOWING（随从状态），同步Leader状态，参与投票
3. OBSERVING（观察状态），同步Leader状态，不参与投票
4. LEADING（领导者状态），选举生出的状态

### 3. 数据ID
Zookeeper服务器中的数据版本号，值越大说明数据最新，所以权重也越高

### 4. 逻辑时钟
用来判断多个投票是否在同一轮选举周期中，该值在服务端是一个自增序列，每次进入新一轮的投票后，都会对该值进行加1操作。
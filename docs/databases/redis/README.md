# Redis

## 一、基于内存实现

​	内存读写速度远高于磁盘，内存的响应时间约为100纳秒。

## 二、数据结构

### 1. 字符串（SDS-简单动态字符串）

SDS的结构：

char[] buff; //字符数组

int len; //字符串长度

int free; //buff字段中没有使用的长度

![redis存储字符串](/images/redis/redis存储字符串.png)

- 优势：

    **长度计算**：Redis可以直接调用获取长度的方法（strlen）。

    **字符串变更操作**：因为他的内存分配和释放策略，可以高效的对字符串进行追加和缩短。

    - 空间预分配：

    小于1M的字符串，分配时为原长+等长+1字节。如某字符串长度=5，初始分配长度=5+5+1=11；

    大于1M的字符串，分配时为原长+1M+1字节，如某字符串初始大小为3M，则分配内存=3M+1M+1Byte；

    - 空间惰性释放：

    上图的redis，变成red，内存无需释放，len->3, free->7；

       

### 2. 链表（双向无环链表 list+listNode）

   ![redis链表结构](/images/redis/redis链表结构.jpeg)

   优势：

   + 双向
   + 无环
   + list中明确了表头，表尾以及长度

### 3. 压缩列表（ziplist）

+ 连续的内存空间
+ 给每个节点增加一个length属性

简单压缩列表：

![压缩列表](/images/redis/压缩列表1.png)

Redis压缩列表结构示例：

![redis压缩列表结构示例](/images/redis/redis压缩列表结构示例.png)

entry说明：

<b>prevlength（8位）</b>：上一个节点的长度（方便反向遍历）。

​	当prevlength<254时，该值就代表上一个节点的真实长度；

​	当prevlength>=254时，该节点的前8位无法表示真实长度，从第8位开始的后面32位才是上一个节点的长度。

<b>encoding</b>：指当前节点的编码规则

<b>data</b>：当前节点值

   

### 4. 字典（哈希表）

   基于散列，但因为散列函数会出现散列冲突，解决散列冲突的两种方法：开放寻址法和链表法

   Redis的实现：

   ![redis字典.jpeg](/images/redis/redis字典.jpeg)

   

#### 5. 跳跃表（多级索引）

   什么是跳跃表？

   ![一层跳跃表.png](/images/redis/一层跳跃表.png)

   redis的跳跃表是有序集合（zSet）的其中一个实现，如果有序集合的元素大于128个或者集合中元素长度大于64，就会使用跳跃表，否则使用压缩列表。

   

**redis跳跃表的实现：**skipList + zskipListNode

![redis跳跃表.png](/images/redis/Redis跳跃表.png)

蓝色指skipList，右边部分是多个zskipListNode

skipList结构：

+ header：指向第一个zskipListNode

+ tail：指向最后一个zskipListNode

+ level：当前跳跃表中层数最大的zskipListNode（头节点不算在内）

+ length：当前跳跃表的长度，即zskipListNode的数量（头节点不算在内）

zskiplistNode结构：

+ level：层，L1代表第一层，L2代表第二层。每一个level都有两个属性，一个是前进指针，一个是跨度。
+ backward（后退）：当前zskiplistNode的前一个节点
+ score：排序使用
+ 对象：各节点保存的成员对象的指针，指向实际保存的地址。

##  三、线程模型

### 1. **文件事件处理器**

   ![文件事件处理器.png](/images/redis/文件事件处理器.png)

   + 套接字（socket）

     客户端连接、读写等操作请求，server socket根据这些请求产生文件事件，文件事件包括AE_READABLE，AE_WRITABLE，redis服务端可读，可连接产生的是AE_READABLE，可写产生的是AE_WRITABLE事件。

   + I/O多路复用程序

     作用是用来监听server socket，并将这些socket顺序的放入队列中。

   + 文件事件分派器

     接收队列中的socket，并将socket中的文件事件类型与对应的事件处理器关联，根据对应的事件处理器进行操作。

   + 事件处理器

     + 连接应答处理器：redis服务器初始化时，关联服务器监听套接字产生的AE_READABLE事件。事件在客户端connect时产生，创建套接字。
     + 命令请求处理器：客户端连接成功后，关联客户端套接字的AE_READABLE事件。
     + 命令回复处理器：服务器有命令回复需要传送给客户端时，关联客户端套接字的AE_WRITABLE事件。事件在客户端尝试读取时产生。

**完整通信过程：**

   ![通信过程](/images/redis/通信过程.png)

### 2.时间事件处理器

+ 刷新服务器信息
+ 清理过期的key
+ 持久化

   

**为什么说Redis是单线程实现的？**

-- redis内部使用文件事件处理器（file event handler），因为文件事件处理器在执行redis命令请求时是单线程执行的，而文件事件处理器是redis的核心，所以说redis是单线程的。

实际上redis从4.0版本开始，删除对象的操作也开始使用多线程处理。

   

## Redis热key问题

### 一、什么是热key

瞬间有大量请求去访问redis上某个固定的key，导致redis服务器宕机。某些业务下如果redis服务不可用，则会请求数据库，导致数据库服务无法使用。

### 二、如何解决

#### 1. 监控

   + 客户端收集：在调用redis服务的时候，增加一层监控，对所有rediskey进行ump监控。
   + redis服务集群代理：在redis服务器集群上做一层代理，所有请求经过这个代理，从而通过这个代理进行统一监控
   + redis自带命令：
     + monitor命令-可实时抓取redis服务器接收到的命令，需要单独开发统计的逻辑代码。
     + hotkeys参数-4.0.3版本以后加入，需要在客户端启动时增加-hotkeys参数。key比较多的情况下执行速度很慢。

#### 2. 解决方案：

**客户端缓存：**

redis服务器发现热key后，通过sdk把热key写入到客户端的本地缓存中，当key发生了写操作的时候，再把这个key从本地缓存中删除。

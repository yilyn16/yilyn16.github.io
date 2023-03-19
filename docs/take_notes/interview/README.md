[[toc]]

### Executors创建线程池的四种方式
1. newCachedThreadPool() 可缓存的线程池，coreSize=0，maxCoreSize=Integer.MAX_VALUE, 存活时间60秒，SynchronousQueue队列（没有元素，put时只能等待一个take操作）
2. newFixedThreadPool(int n) 固定长度的线程池，coreSize=maxCoreSize=n,LinkedBlockingQueue
3. newScheduledThreadPool(int n) 可定时执行的线程池 maxCoreSize=Integer.MAX_VALUE，DelayedWorkQueue
4. newSingleThreadExecutor() 单线程的线程池coreSize=maxCoreSize=1

### 为什么不建议用Executors创建线程池
1. newCachedThreadPool和newScheduledThreadPool创建的线程池，maxCoreSize=Integer.MAX_VALUE，如果阻塞队列任务已满，会不断的创建线程，导致系统个资源被耗尽，严重时会出现OOM
2. newFixedThreadPool和newSingleThreadExecutor这两个方法的阻塞队列是LinkedBlockingQueue，没有限制大小，所以如果使用不当，阻塞队列数量会不断堆积，有出现OOM的风险

### Spring用到的一些设计模式
1. 工厂模式：BeanFactory、ApplicationContext
2. 模板方法模式： spring容器初始化时的refresh()方法就用的时模板方法的勾子方法，不同的实现会自行实现内部方法
3. 代理模式：AOP使用代理模式，JDK动态代理和Cglib动态代理，JDK动态代理需要被代理类实现接口，Cglib可以代理普通类，JDK是通过反射实现，Cglib是通过字节码生成一个被代理类的子类去进行增强的（所以被代理类不能用final修饰）
4. 观察者模式：ApplicationEvent事件监听就是使用了观察者模式
5. 适配器模式：springmvc的Controller，spring AOP的通知和增强也用了适配器（AdvisorAdapter）
6. 策略模式：不同资源文件的获取
7. 单例模式：singleton的bean

### spring bean 生命周期
1. 实例化bean
2. 设置属性
3. 检查Aware接口并设置相关依赖（Aware可以理解为获取容器对象的方法）
4. BeanPostProcessor的前置处理（before方法，对bean进行修改）
5. 检查是否实现InitializingBean接口，若实现，则调用afterProperties方法对bean进行操作
6. 检查是不是有init-method方法，此时调用该方法进行方法的初始化
7. BeanPostProcessor的后置处理
8. 注册回调相关的接口
9. 使用
10. 销毁

### 常用的限流算法
1. 计数器 处理一个请求则+1，请求完成则-1，每次请求时都先判断计数器的值，超过阈值则拒绝。 
    - 优点：简单粗暴好实现 
    - 缺点：处理瞬时的高并发请求会对程序有一定压力。

2. 固定窗口 维护一个计数器，将单位时间当作一个窗口，计数器记录这个窗口接收请求的次数。 当请求数小于阈值，则允许访问，并且计数器+1； 当请求数超过阈值，则拒绝访问 当时间窗口结束后，计数器清零

    **问题：**
    - 当某一时刻瞬时的请求已经将计数器增加到阈值，那么剩下的时间窗口内的请求都会被拒绝，造成一种服务不可用的情况
    - 窗口切换前后的请求可能超过阈值

3. 令牌桶算法 令牌桶是漏桶的改进版，可以支持突发流量，桶中存放令牌，而不是流量；恒定定速率往桶中放入令牌，请求过来时如果没有从令牌桶中拿到令牌，则拒绝。

4. 滑动窗口 滑动窗口解决固定窗口临界值的问题，粒度更细；每次请求时如果没有达到阈值，就记录请求的时间，并基于这个时间向后推一个时间窗口。

    **问题：** 
    - 无法解决短时大流量的冲击

5. 漏桶算法 漏桶算法更平滑 漏桶具有固定容量，出口流量速率固定 入口流量速率可以任意（客户端请求量无法控制） 如果入口流量在请求时超过了桶的容量，则拒绝
    **问题：** 
    - 因为出口容量是固定的，所以漏桶算法无法解决突发流量的问题

### ES其中一个数据节点宕机会出现什么问题？
1. 其他节点会将宕机节点的主分片副本升级为主分片，所以主分片的数据还是完整的，但是副本不完整，此时集群状态为yellow；
2. 一段时间过后（可配置）如果这个宕机的节点还没有恢复并加入到集群中，则ES集群认为它不会回来了，此时会生成缺失的副本，集群状态恢复为green。
3. 如果在生成副本数据的时候宕机的节点恢复加入到集群中来了，那么es会比较两个集群的副本，以完整度高的为准。再根据rebalance配置进行rebalance。

### 线程间通信的几种方式
1. 基于锁（synchronized和retrantlock），不断的去获取锁，线程A和线程B同时执行同一个被锁定的代码块，后抢到锁的需要等待前一个线程执行完成后再执行
2. 等待/通知机制，基于Object的wait()方法、nofity()方法、notifyAll()方法
3. join() 方法：join() 方法是Thread类的一个方法，是将当前线程进入【等待】状态，等join的这个线程执行完成后，再执行当前线程
4. sleep() 方法是Thread类的静态方法，作用是让线程睡眠一段时间
5. volitale关键字
6. CountDownLatch 闭锁
7. CyclicBarrier 栅栏
8. Semaphore 信号量

### sleep() 与 wait() 的区别
1. wait方法只能在同步代码块或同步方法中，而sleep方法可以在随意位置
2. 两个方法都会释放cpu资源，但是sleep方式不会释放锁，而wait方法会释放

### 运行时数据区
1. 程序计数器（线程独占）

    用来存储指向吓一条指令的地址

2. 本地方法栈（线程独占）

    与虚拟机栈类似，只不过本地方法栈存储的是本地方法（native），Hot Spot虚拟机将本地方法栈和虚拟机栈合二为一。

3. 虚拟机栈（线程独占）

    每个线程在创建时都会创建一个虚拟机栈，配置参数：-Xss，当分配的栈容量超过配置的大小时，会抛出StackOverFlowError

4. 堆（线程共享）
    - 大多数对象都在这里分配内存
    - java7被分为新生代、老年代和永久代；java8被分为新生代、老年代和元空间
    - 配置方式： -Xms:堆的起始大小， -Xmx：堆的最大内存，如果堆内存超过最大内存，则会抛出OutOfMemoryError
    - 新生代和老年代在堆结构的占比一般为1:2，配置参数：-XX:NewRatio=2或者-Xmn，如果两个配置都存在，以-Xmn为准
    - 新生代中Eden和Survivor（2个）所占比例为8:1:1，通过-XX:SurvivorRatio配置

5. 方法区/非堆（线程共享）

    存储类的结构，方法、构造函数、属性等，还包括常量池，以及类中的一些特殊方法，比如static方法

### Java线程的状态
1. NEW 初始化一个线程后，这个线程的状态就是NEW
2. RUNNABLE 当调用线程的start()方法时，该线程状态变为RUNNABLE，可以被cpu进行调度或者是正在调度中
3. BLOCKED 线程拿不到资源锁（synchronized），则处于BLOCKED状态，当获取到锁后，则状态变成RUNNABLE
4. WAITING 调用wait方法之后，状态变为WAITING
5. TIMED_WATING 调用sleep方法时
6. TERMINATED run方法执行完成之后

### spring解决循环依赖的三级缓存分别是什么
1. private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256); 用来存放完全初始化完成的单例bean
2. private final Map<String, Object> earlySingletonObjects = new HashMap<>(16); // 二级缓存，用来存放正在创建中的单例bean，此时的bean是初始化完成的，但是并没有对其属性进行注入
3. private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<>(16); // 三级缓存 bean的工厂，用来生成二级缓存中存放的bean的半成品
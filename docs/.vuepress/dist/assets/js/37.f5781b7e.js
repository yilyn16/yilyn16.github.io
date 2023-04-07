(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{314:function(a,v,t){"use strict";t.r(v);var _=t(7),e=Object(_.a)({},(function(){var a=this,v=a._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[v("p"),v("div",{staticClass:"table-of-contents"},[v("ul",[v("li",[v("a",{attrs:{href:"#executors创建线程池的四种方式"}},[a._v("Executors创建线程池的四种方式")])]),v("li",[v("a",{attrs:{href:"#为什么不建议用executors创建线程池"}},[a._v("为什么不建议用Executors创建线程池")])]),v("li",[v("a",{attrs:{href:"#spring用到的一些设计模式"}},[a._v("Spring用到的一些设计模式")])]),v("li",[v("a",{attrs:{href:"#spring-bean-生命周期"}},[a._v("spring bean 生命周期")])]),v("li",[v("a",{attrs:{href:"#常用的限流算法"}},[a._v("常用的限流算法")])]),v("li",[v("a",{attrs:{href:"#es其中一个数据节点宕机会出现什么问题"}},[a._v("ES其中一个数据节点宕机会出现什么问题？")])]),v("li",[v("a",{attrs:{href:"#线程间通信的几种方式"}},[a._v("线程间通信的几种方式")])]),v("li",[v("a",{attrs:{href:"#sleep-与-wait-的区别"}},[a._v("sleep() 与 wait() 的区别")])]),v("li",[v("a",{attrs:{href:"#运行时数据区"}},[a._v("运行时数据区")])]),v("li",[v("a",{attrs:{href:"#java线程的状态"}},[a._v("Java线程的状态")])]),v("li",[v("a",{attrs:{href:"#spring解决循环依赖的三级缓存分别是什么"}},[a._v("spring解决循环依赖的三级缓存分别是什么")])]),v("li",[v("a",{attrs:{href:"#main-方法的重载、重写"}},[a._v("main()方法的重载、重写")])]),v("li",[v("a",{attrs:{href:"#hashmap产生死循环的原因"}},[a._v("HashMap产生死循环的原因")])]),v("li",[v("a",{attrs:{href:"#synchronized优化"}},[a._v("synchronized优化")])]),v("li",[v("a",{attrs:{href:"#b树和b-树的区别"}},[a._v("B树和B+树的区别")])]),v("li",[v("a",{attrs:{href:"#innodb为什么要使用b-树做索引"}},[a._v("InnoDB为什么要使用B+树做索引？")])]),v("li",[v("a",{attrs:{href:"#thread真正开启新线程是调用start方法还是run方法"}},[a._v("Thread真正开启新线程是调用start方法还是run方法？")])]),v("li",[v("a",{attrs:{href:"#object-o-new-object-占用多少字节"}},[a._v("Object o = new Object() 占用多少字节")])]),v("li",[v("a",{attrs:{href:"#select-for-update-是表锁还是行锁"}},[a._v("select ... for update 是表锁还是行锁")])]),v("li",[v("a",{attrs:{href:"#jvm有哪些垃圾回收器"}},[a._v("JVM有哪些垃圾回收器")])]),v("li",[v("a",{attrs:{href:"#volatile如何保证可见性"}},[a._v("volatile如何保证可见性")])]),v("li",[v("a",{attrs:{href:"#线程池执行流程"}},[a._v("线程池执行流程")])]),v("li",[v("a",{attrs:{href:"#concurrenthashmap-的原理"}},[a._v("ConcurrentHashMap 的原理")])]),v("li",[v("a",{attrs:{href:"#mysql执行计划-explain"}},[a._v("MySQL执行计划（explain）")])]),v("li",[v("a",{attrs:{href:"#innodb-和-myisam-有什么区别"}},[a._v("InnoDB 和 MyISAM 有什么区别")])]),v("li",[v("a",{attrs:{href:"#布隆过滤器的原理"}},[a._v("布隆过滤器的原理")])]),v("li",[v("a",{attrs:{href:"#什么是类的加载"}},[a._v("什么是类的加载")])]),v("li",[v("a",{attrs:{href:"#类的生命周期"}},[a._v("类的生命周期")])]),v("li",[v("a",{attrs:{href:"#类加载器"}},[a._v("类加载器")])]),v("li",[v("a",{attrs:{href:"#类加载的过程"}},[a._v("类加载的过程")])]),v("li",[v("a",{attrs:{href:"#双亲委派"}},[a._v("双亲委派")])]),v("li",[v("a",{attrs:{href:"#mysql-rc和rr隔离级别的区别"}},[a._v("MySQL RC和RR隔离级别的区别")])]),v("li",[v("a",{attrs:{href:"#最左匹配的原理"}},[a._v("最左匹配的原理")])]),v("li",[v("a",{attrs:{href:"#kafka为什么不支持读写分离"}},[a._v("kafka为什么不支持读写分离")])]),v("li",[v("a",{attrs:{href:"#es数据写入的流程"}},[a._v("ES数据写入的流程")])])])]),v("p"),a._v(" "),v("h3",{attrs:{id:"executors创建线程池的四种方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#executors创建线程池的四种方式"}},[a._v("#")]),a._v(" Executors创建线程池的四种方式")]),a._v(" "),v("ol",[v("li",[a._v("newCachedThreadPool() 可缓存的线程池，coreSize=0，maxCoreSize=Integer.MAX_VALUE, 存活时间60秒，SynchronousQueue队列（没有元素，put时只能等待一个take操作）")]),a._v(" "),v("li",[a._v("newFixedThreadPool(int n) 固定长度的线程池，coreSize=maxCoreSize=n,LinkedBlockingQueue")]),a._v(" "),v("li",[a._v("newScheduledThreadPool(int n) 可定时执行的线程池 maxCoreSize=Integer.MAX_VALUE，DelayedWorkQueue")]),a._v(" "),v("li",[a._v("newSingleThreadExecutor() 单线程的线程池coreSize=maxCoreSize=1")])]),a._v(" "),v("h3",{attrs:{id:"为什么不建议用executors创建线程池"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#为什么不建议用executors创建线程池"}},[a._v("#")]),a._v(" 为什么不建议用Executors创建线程池")]),a._v(" "),v("ol",[v("li",[a._v("newCachedThreadPool和newScheduledThreadPool创建的线程池，maxCoreSize=Integer.MAX_VALUE，如果阻塞队列任务已满，会不断的创建线程，导致系统个资源被耗尽，严重时会出现OOM")]),a._v(" "),v("li",[a._v("newFixedThreadPool和newSingleThreadExecutor这两个方法的阻塞队列是LinkedBlockingQueue，没有限制大小，所以如果使用不当，阻塞队列数量会不断堆积，有出现OOM的风险")])]),a._v(" "),v("h3",{attrs:{id:"spring用到的一些设计模式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#spring用到的一些设计模式"}},[a._v("#")]),a._v(" Spring用到的一些设计模式")]),a._v(" "),v("ol",[v("li",[a._v("工厂模式：BeanFactory、ApplicationContext")]),a._v(" "),v("li",[a._v("模板方法模式： spring容器初始化时的refresh()方法就用的时模板方法的勾子方法，不同的实现会自行实现内部方法")]),a._v(" "),v("li",[a._v("代理模式：AOP使用代理模式，JDK动态代理和Cglib动态代理，JDK动态代理需要被代理类实现接口，Cglib可以代理普通类，JDK是通过反射实现，Cglib是通过字节码生成一个被代理类的子类去进行增强的（所以被代理类不能用final修饰）")]),a._v(" "),v("li",[a._v("观察者模式：ApplicationEvent事件监听就是使用了观察者模式")]),a._v(" "),v("li",[a._v("适配器模式：springmvc的Controller，spring AOP的通知和增强也用了适配器（AdvisorAdapter）")]),a._v(" "),v("li",[a._v("策略模式：不同资源文件的获取")]),a._v(" "),v("li",[a._v("单例模式：singleton的bean")])]),a._v(" "),v("h3",{attrs:{id:"spring-bean-生命周期"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#spring-bean-生命周期"}},[a._v("#")]),a._v(" spring bean 生命周期")]),a._v(" "),v("ol",[v("li",[a._v("实例化bean")]),a._v(" "),v("li",[a._v("设置属性")]),a._v(" "),v("li",[a._v("检查Aware接口并设置相关依赖（Aware可以理解为获取容器对象的方法）")]),a._v(" "),v("li",[a._v("BeanPostProcessor的前置处理（before方法，对bean进行修改）")]),a._v(" "),v("li",[a._v("检查是否实现InitializingBean接口，若实现，则调用afterProperties方法对bean进行操作")]),a._v(" "),v("li",[a._v("检查是不是有init-method方法，此时调用该方法进行方法的初始化")]),a._v(" "),v("li",[a._v("BeanPostProcessor的后置处理")]),a._v(" "),v("li",[a._v("注册回调相关的接口")]),a._v(" "),v("li",[a._v("使用")]),a._v(" "),v("li",[a._v("销毁")])]),a._v(" "),v("h3",{attrs:{id:"常用的限流算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#常用的限流算法"}},[a._v("#")]),a._v(" 常用的限流算法")]),a._v(" "),v("ol",[v("li",[v("p",[a._v("计数器 处理一个请求则+1，请求完成则-1，每次请求时都先判断计数器的值，超过阈值则拒绝。")]),a._v(" "),v("ul",[v("li",[a._v("优点：简单粗暴好实现")]),a._v(" "),v("li",[a._v("缺点：处理瞬时的高并发请求会对程序有一定压力。")])])]),a._v(" "),v("li",[v("p",[a._v("固定窗口 维护一个计数器，将单位时间当作一个窗口，计数器记录这个窗口接收请求的次数。 当请求数小于阈值，则允许访问，并且计数器+1； 当请求数超过阈值，则拒绝访问 当时间窗口结束后，计数器清零")]),a._v(" "),v("p",[v("strong",[a._v("问题：")])]),a._v(" "),v("ul",[v("li",[a._v("当某一时刻瞬时的请求已经将计数器增加到阈值，那么剩下的时间窗口内的请求都会被拒绝，造成一种服务不可用的情况")]),a._v(" "),v("li",[a._v("窗口切换前后的请求可能超过阈值")])])]),a._v(" "),v("li",[v("p",[a._v("令牌桶算法 令牌桶是漏桶的改进版，可以支持突发流量，桶中存放令牌，而不是流量；恒定定速率往桶中放入令牌，请求过来时如果没有从令牌桶中拿到令牌，则拒绝。")])]),a._v(" "),v("li",[v("p",[a._v("滑动窗口 滑动窗口解决固定窗口临界值的问题，粒度更细；每次请求时如果没有达到阈值，就记录请求的时间，并基于这个时间向后推一个时间窗口。")]),a._v(" "),v("p",[v("strong",[a._v("问题：")])]),a._v(" "),v("ul",[v("li",[a._v("无法解决短时大流量的冲击")])])]),a._v(" "),v("li",[v("p",[a._v("漏桶算法 漏桶算法更平滑 漏桶具有固定容量，出口流量速率固定 入口流量速率可以任意（客户端请求量无法控制） 如果入口流量在请求时超过了桶的容量，则拒绝\n"),v("strong",[a._v("问题：")])]),a._v(" "),v("ul",[v("li",[a._v("因为出口容量是固定的，所以漏桶算法无法解决突发流量的问题")])])])]),a._v(" "),v("h3",{attrs:{id:"es其中一个数据节点宕机会出现什么问题"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#es其中一个数据节点宕机会出现什么问题"}},[a._v("#")]),a._v(" ES其中一个数据节点宕机会出现什么问题？")]),a._v(" "),v("ol",[v("li",[a._v("其他节点会将宕机节点的主分片副本升级为主分片，所以主分片的数据还是完整的，但是副本不完整，此时集群状态为yellow；")]),a._v(" "),v("li",[a._v("一段时间过后（可配置）如果这个宕机的节点还没有恢复并加入到集群中，则ES集群认为它不会回来了，此时会生成缺失的副本，集群状态恢复为green。")]),a._v(" "),v("li",[a._v("如果在生成副本数据的时候宕机的节点恢复加入到集群中来了，那么es会比较两个集群的副本，以完整度高的为准。再根据rebalance配置进行rebalance。")])]),a._v(" "),v("h3",{attrs:{id:"线程间通信的几种方式"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#线程间通信的几种方式"}},[a._v("#")]),a._v(" 线程间通信的几种方式")]),a._v(" "),v("ol",[v("li",[a._v("基于锁（synchronized和retrantlock），不断的去获取锁，线程A和线程B同时执行同一个被锁定的代码块，后抢到锁的需要等待前一个线程执行完成后再执行")]),a._v(" "),v("li",[a._v("等待/通知机制，基于Object的wait()方法、nofity()方法、notifyAll()方法")]),a._v(" "),v("li",[a._v("join() 方法：join() 方法是Thread类的一个方法，是将当前线程进入【等待】状态，等join的这个线程执行完成后，再执行当前线程")]),a._v(" "),v("li",[a._v("sleep() 方法是Thread类的静态方法，作用是让线程睡眠一段时间")]),a._v(" "),v("li",[a._v("volitale关键字")]),a._v(" "),v("li",[a._v("CountDownLatch 闭锁")]),a._v(" "),v("li",[a._v("CyclicBarrier 栅栏")]),a._v(" "),v("li",[a._v("Semaphore 信号量")])]),a._v(" "),v("h3",{attrs:{id:"sleep-与-wait-的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#sleep-与-wait-的区别"}},[a._v("#")]),a._v(" sleep() 与 wait() 的区别")]),a._v(" "),v("ol",[v("li",[a._v("wait方法只能在同步代码块或同步方法中，而sleep方法可以在随意位置")]),a._v(" "),v("li",[a._v("两个方法都会释放cpu资源，但是sleep方式不会释放锁，而wait方法会释放")])]),a._v(" "),v("h3",{attrs:{id:"运行时数据区"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#运行时数据区"}},[a._v("#")]),a._v(" 运行时数据区")]),a._v(" "),v("ol",[v("li",[v("p",[a._v("程序计数器（线程独占）")]),a._v(" "),v("p",[a._v("用来存储指向吓一条指令的地址")])]),a._v(" "),v("li",[v("p",[a._v("本地方法栈（线程独占）")]),a._v(" "),v("p",[a._v("与虚拟机栈类似，只不过本地方法栈存储的是本地方法（native），Hot Spot虚拟机将本地方法栈和虚拟机栈合二为一。")])]),a._v(" "),v("li",[v("p",[a._v("虚拟机栈（线程独占）")]),a._v(" "),v("p",[a._v("每个线程在创建时都会创建一个虚拟机栈，配置参数：-Xss，当分配的栈容量超过配置的大小时，会抛出StackOverFlowError")])]),a._v(" "),v("li",[v("p",[a._v("堆（线程共享）")]),a._v(" "),v("ul",[v("li",[a._v("大多数对象都在这里分配内存")]),a._v(" "),v("li",[a._v("java7被分为新生代、老年代和永久代；java8被分为新生代、老年代和元空间")]),a._v(" "),v("li",[a._v("配置方式： -Xms:堆的起始大小， -Xmx：堆的最大内存，如果堆内存超过最大内存，则会抛出OutOfMemoryError")]),a._v(" "),v("li",[a._v("新生代和老年代在堆结构的占比一般为1:2，配置参数：-XX:NewRatio=2或者-Xmn，如果两个配置都存在，以-Xmn为准")]),a._v(" "),v("li",[a._v("新生代中Eden和Survivor（2个）所占比例为8:1:1，通过-XX:SurvivorRatio配置")])])]),a._v(" "),v("li",[v("p",[a._v("方法区/非堆（线程共享）")]),a._v(" "),v("p",[a._v("存储类的结构，方法、构造函数、属性等，还包括常量池，以及类中的一些特殊方法，比如static方法")])])]),a._v(" "),v("h3",{attrs:{id:"java线程的状态"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#java线程的状态"}},[a._v("#")]),a._v(" Java线程的状态")]),a._v(" "),v("ol",[v("li",[a._v("NEW 初始化一个线程后，这个线程的状态就是NEW")]),a._v(" "),v("li",[a._v("RUNNABLE 当调用线程的start()方法时，该线程状态变为RUNNABLE，可以被cpu进行调度或者是正在调度中")]),a._v(" "),v("li",[a._v("BLOCKED 线程拿不到资源锁（synchronized），则处于BLOCKED状态，当获取到锁后，则状态变成RUNNABLE")]),a._v(" "),v("li",[a._v("WAITING 调用wait方法之后，状态变为WAITING")]),a._v(" "),v("li",[a._v("TIMED_WATING 调用sleep方法时")]),a._v(" "),v("li",[a._v("TERMINATED run方法执行完成之后")])]),a._v(" "),v("h3",{attrs:{id:"spring解决循环依赖的三级缓存分别是什么"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#spring解决循环依赖的三级缓存分别是什么"}},[a._v("#")]),a._v(" spring解决循环依赖的三级缓存分别是什么")]),a._v(" "),v("ol",[v("li",[a._v("private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256); 用来存放完全初始化完成的单例bean")]),a._v(" "),v("li",[a._v("private final Map<String, Object> earlySingletonObjects = new HashMap<>(16); // 二级缓存，用来存放正在创建中的单例bean，此时的bean是初始化完成的，但是并没有对其属性进行注入")]),a._v(" "),v("li",[a._v("private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap<>(16); // 三级缓存 bean的工厂，用来生成二级缓存中存放的bean的半成品")])]),a._v(" "),v("h3",{attrs:{id:"main-方法的重载、重写"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#main-方法的重载、重写"}},[a._v("#")]),a._v(" main()方法的重载、重写")]),a._v(" "),v("p",[a._v("main方法"),v("strong",[a._v("可以被重载")]),a._v("，\n"),v("strong",[a._v("不能被重写")]),a._v("，因为main方法是被static修饰的静态方法，是脱离对象全局唯一的。")]),a._v(" "),v("h3",{attrs:{id:"hashmap产生死循环的原因"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#hashmap产生死循环的原因"}},[a._v("#")]),a._v(" HashMap产生死循环的原因")]),a._v(" "),v("p",[a._v("HashMap产生死循环时在JDK7中，JDK7的HashMap是由数组+链表组成的，并且采用头插法的方式为链表添加元素，当多个线程同时执行扩容流程时才会产生死循环的问题。")]),a._v(" "),v("ol",[v("li",[a._v("假设当前数组某一位置存在 A->B->C 三个节点的链表，此时有T1和T2两个线程对这个HashMap进行扩容，T1和T2线程都指向A节点，T1.next和T2.next都指向B节点；")]),a._v(" "),v("li",[a._v("当T1线程先获取到资源，T2线程休眠；T1线程完成扩容后，该数组的这个位置上的链表结构变成了 C->B->A(头插法)，这个时候B节点的next指向A，即B.next=A；")]),a._v(" "),v("li",[a._v("T1执行完成后，T2获取到CPU资源，这时候就发生了死循环（A和B的next分别指向对方），因为T1执行完成后，B.next=A, 但是T2线程中，还没有发生变化，仍然是A.next=B。")])]),a._v(" "),v("h3",{attrs:{id:"synchronized优化"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#synchronized优化"}},[a._v("#")]),a._v(" synchronized优化")]),a._v(" "),v("p",[a._v("synchronized在jdk1.5的时候性能比较差，在jdk1.6对其做了优化，包括"),v("strong",[a._v("锁膨胀（锁升级）")]),a._v("、"),v("strong",[a._v("锁消除")]),a._v("、"),v("strong",[a._v("锁粗化")]),a._v("和"),v("strong",[a._v("自适应自旋锁")]),a._v("。")]),a._v(" "),v("ol",[v("li",[a._v("锁膨胀（锁升级）：jdk1.6之前，synchronized是重量级锁，也就是说 synchronized 在释放和获取锁时都会从用户态转换成内核态，所以性能比较差。")])]),a._v(" "),v("p",[a._v("有了锁膨胀之后，synchronized的状态有了"),v("strong",[a._v("无锁")]),a._v("、"),v("strong",[a._v("偏向锁")]),a._v("和"),v("strong",[a._v("轻量级锁")]),a._v("，这时候在并发操作时大部分场景都不需要用户态到内核态的转换了。")]),a._v(" "),v("ol",{attrs:{start:"2"}},[v("li",[a._v("锁消除：JVM如果检测不到某段代码被共享和竞争的可能性，那么会讲这段代码所属的同步锁消除掉。")])]),a._v(" "),v("p",[a._v("如 StringBuffer 的 append() 方法，内部是synchronized修饰的，在编译之后可能会被编译成StringBuilder对象（不加锁）")]),a._v(" "),v("ol",{attrs:{start:"3"}},[v("li",[v("p",[a._v("锁粗化：锁粗化是指，将多个连续的加锁、解锁操作连接在一起，扩展成一个范围更大的锁。")])]),a._v(" "),v("li",[v("p",[a._v("自适应自旋锁（JDK1.7加入）：自旋锁是指通过自身循环，尝试获取锁的一种方式。线程自旋的次数不再是固定的值，而是一个动态改变的值，这个值会根据前一次自旋获取锁的状态来决定此次自旋的次数")])])]),a._v(" "),v("h3",{attrs:{id:"b树和b-树的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#b树和b-树的区别"}},[a._v("#")]),a._v(" B树和B+树的区别")]),a._v(" "),v("ol",[v("li",[a._v("B树每个角落节点都保存key和data，B+树的非叶子结点只保存key，叶子结点才保存key和data，")]),a._v(" "),v("li",[a._v("B+树的叶子节点通过指针顺序连接，B输没有指针，所以B+树范围查询时效率更高。")])]),a._v(" "),v("h3",{attrs:{id:"innodb为什么要使用b-树做索引"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#innodb为什么要使用b-树做索引"}},[a._v("#")]),a._v(" InnoDB为什么要使用B+树做索引？")]),a._v(" "),v("p",[a._v("索引要满足高效率的查询，同时在数据的新增和更新过程中维护索引的成本不能太高，B+树比较好的满足了这两点。")]),a._v(" "),v("p",[a._v("不用以下数据结构做索引的原因：")]),a._v(" "),v("ol",[v("li",[a._v("hash：虽然hash效率很高，但是当出现范围查找的时候，需要对范围内的所有数据都进行hash计算；另外hash不支持key以外字段的等值查询；不适合前缀匹配，因为需要根据计算key的hash才能")]),a._v(" "),v("li",[a._v("有序数组：对查询、修改、删除来说数组效率很高，但是当新增数据时，需要插入位置后的所有数据进行位置的移动")]),a._v(" "),v("li",[a._v("跳跃表：层级太高导致IO次数变多，影响查询效率")]),a._v(" "),v("li",[a._v("B树：中间节点也存储了数据，所以在相同层高下，B树比B+树存储的数据少；另外B树对范围查询不友好，因为叶子节点之间没有使用指针连接。")])]),a._v(" "),v("h3",{attrs:{id:"thread真正开启新线程是调用start方法还是run方法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#thread真正开启新线程是调用start方法还是run方法"}},[a._v("#")]),a._v(" Thread真正开启新线程是调用start方法还是run方法？")]),a._v(" "),v("ol",[v("li",[a._v("start方法是Thread类中的方法，用于启动新的线程")]),a._v(" "),v("li",[a._v("run方法不会开启线程，而是在start开启新线程之后在这个线程中同步执行的方法。")])]),a._v(" "),v("h3",{attrs:{id:"object-o-new-object-占用多少字节"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#object-o-new-object-占用多少字节"}},[a._v("#")]),a._v(" Object o = new Object() 占用多少字节")]),a._v(" "),v("ol",[v("li",[a._v("一个对象由"),v("strong",[a._v("对象头")]),a._v("、"),v("strong",[a._v("实例数据")]),a._v("和"),v("strong",[a._v("对齐填充")]),a._v("组成；")]),a._v(" "),v("li",[a._v("对象头：又分为"),v("code",[a._v("Mark Word")]),a._v("和"),v("code",[a._v("对象指针")]),a._v("，如果是数组对象，对象头中还包含"),v("code",[a._v("length")]),a._v("存储数组长度；Mark Word占用8个字节；对象指针分为两种情况，一种是未被压缩的情况下，占用8字节；一种是被压缩，占用4个字节；")]),a._v(" "),v("li",[a._v("实例数据：用来存储对象实例的真正数据，new Object()完成后，实例数据没有存储任何信息，所以占用0字节；")]),a._v(" "),v("li",[a._v("对齐填充：如果对象大小没有达到8字节的整数倍，在对齐填充区域会自动补齐到8的整数倍；"),v("strong",[a._v("所以这个问题的答案是16字节")]),a._v("。")])]),a._v(" "),v("blockquote",[v("p",[v("strong",[a._v("对象指针压缩")]),a._v("是为了在64位平台中使用32位指针，导致内存被浪费时使用的。通过JVM命令启用指针压缩:-XX:+UseCompressedOops，禁止指针压缩:-XX:-UseCompressedOops")])]),a._v(" "),v("p",[v("img",{attrs:{src:"/images/interview/java%E5%AF%B9%E8%B1%A1%E5%B8%83%E5%B1%80.jpeg",alt:"java对象布局"}})]),a._v(" "),v("h3",{attrs:{id:"select-for-update-是表锁还是行锁"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#select-for-update-是表锁还是行锁"}},[a._v("#")]),a._v(" select ... for update 是表锁还是行锁")]),a._v(" "),v("ol",[v("li",[a._v("如果select带有查询条件，且查询条件走了索引，则是行锁；但如果是索引失效的场景下，仍然是表锁；")]),a._v(" "),v("li",[a._v("如果select不带where查询条件或者查询条件不是索引，那么这个sql使用的是表锁")]),a._v(" "),v("li",[a._v("如果where条件使用某个带索引的字段范围查询，则使用的是间隙锁，这时所定的是查询范围之间的数据。")])]),a._v(" "),v("h3",{attrs:{id:"jvm有哪些垃圾回收器"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#jvm有哪些垃圾回收器"}},[a._v("#")]),a._v(" JVM有哪些垃圾回收器")]),a._v(" "),v("p",[v("strong",[a._v("并行/并发类型")])]),a._v(" "),v("ol",[v("li",[a._v("串行：Serial、 Serial Old")]),a._v(" "),v("li",[a._v("并行回收器：ParNew、Parallel scavenge、 Parallel Old")]),a._v(" "),v("li",[a._v("并发收集器：CMS、 G1")])]),a._v(" "),v("p",[v("strong",[a._v("根据分代类型")])]),a._v(" "),v("ol",[v("li",[a._v("新生代： Serial、 ParNew、 Parallel scavenge")]),a._v(" "),v("li",[a._v("老年代：Serial Old、 Parallel Old")]),a._v(" "),v("li",[a._v("混合（整堆收集）： G1")])]),a._v(" "),v("h3",{attrs:{id:"volatile如何保证可见性"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#volatile如何保证可见性"}},[a._v("#")]),a._v(" volatile如何保证可见性")]),a._v(" "),v("ol",[v("li",[a._v("CPU和内存是两个独立的硬件，是通过中间的"),v("strong",[a._v("总线")]),a._v("来进行数据交互的，volatile会开启总线的"),v("strong",[a._v("mesi缓存一致性协议")])]),a._v(" "),v("li",[a._v("mesi缓存一致性协议就是当某个共享数据出现修改时，这个数据会立刻同步到主内存中，其他CPU通过总线嗅探机制可以感知到数据的变化，从将自己工作内存中的这个数据进行失效处理，再将最新的数据从主内存中同步到自己的工作线程中。")])]),a._v(" "),v("h3",{attrs:{id:"线程池执行流程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#线程池执行流程"}},[a._v("#")]),a._v(" 线程池执行流程")]),a._v(" "),v("ol",[v("li",[a._v("如果线程数小于核心线程数，则通过addWorker添加一个核心工作线程；否则进入第2步")]),a._v(" "),v("li",[a._v("如果阻塞队列还没有满，则将该任务放到阻塞队列中等待执行；\n1）此时会再次检查线程池状态如果不是RUNNING，会从队列中删除这个任务，然后执行拒绝策略；\n2）如果是RUNNING状态，那么会判断当前线程池数如果为0，则通过addWorker添加一个非核心线程")]),a._v(" "),v("li",[a._v("如果线程池为非RUNNING状态，或者添加阻塞队列失败，则执行拒绝策略。")])]),a._v(" "),v("h3",{attrs:{id:"concurrenthashmap-的原理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#concurrenthashmap-的原理"}},[a._v("#")]),a._v(" ConcurrentHashMap 的原理")]),a._v(" "),v("p",[a._v("ConcurrentHashMap在JDK1.7和JDK1.8以后的差别比较大")]),a._v(" "),v("p",[v("strong",[a._v("JDK1.7版本的ConcurrentHashMap：")])]),a._v(" "),v("ol",[v("li",[a._v("基于Segment数组+Entry数组+链表实现；")]),a._v(" "),v("li",[a._v("Segment数组是16位的固定长度，每个Segment存放的是Entry数组，Entry存放链表数据，ConcurrentHashMap的数据就存放在链表中；")]),a._v(" "),v("li",[a._v("Segment继承自ReentrantLock，当多个线程并发操作时，会对Segment进行加锁操作，从而实现Segment下所有数据的数据安全。")])]),a._v(" "),v("p",[v("strong",[a._v("JDK1.8版本的ConcurrentHashMap：")])]),a._v(" "),v("ol",[v("li",[a._v("与HashMap结构相同，基于Node数组+链表/红黑树实现，是通过CAS和synchronized实现线程安全的")]),a._v(" "),v("li",[a._v("在put数据时，根据key的hash判断Node数组下标，当前下标元素为空时（即链表头节点为空），通过CAS方式对头节点赋值；")]),a._v(" "),v("li",[a._v("如果此时头节点已存在，则用synchronized锁定头节点，然后在当前链表中进行数据的增加；\n4，当链表数量大于8时，链表的结构会自动转换成红黑树的结构。")])]),a._v(" "),v("h3",{attrs:{id:"mysql执行计划-explain"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#mysql执行计划-explain"}},[a._v("#")]),a._v(" MySQL执行计划（explain）")]),a._v(" "),v("ol",[v("li",[a._v("select_type: 查询类型，包括SIMPLE（简单查询），PRIMARY（子查询最外层的查询）、UNION")]),a._v(" "),v("li",[a._v("type：\n"),v("ul",[v("li",[a._v("system")]),a._v(" "),v("li",[a._v("consts: 指定主键查询或唯一索引查询，只匹配一条数据")]),a._v(" "),v("li",[a._v("eq_ref: 主键或唯一索引被连接使用")]),a._v(" "),v("li",[a._v("ref: 使用普通索引查询")]),a._v(" "),v("li",[a._v("range：使用索引范围查询")]),a._v(" "),v("li",[a._v("index: 扫描某个索引的全量数据")]),a._v(" "),v("li",[a._v("ALL：全表扫描，即扫描聚集索引的所有叶子节点")])])]),a._v(" "),v("li",[a._v("possible_keys： 可能使用的索引")]),a._v(" "),v("li",[a._v("key：实际使用的索引")]),a._v(" "),v("li",[a._v("rows：查询中读取的行数，是一个大概的值，不是结果集的数量")]),a._v(" "),v("li",[a._v("Extra: 一些额外的信息\n"),v("ul",[v("li",[a._v("using index")]),a._v(" "),v("li",[a._v("using where")]),a._v(" "),v("li",[a._v("using index condition")])])])]),a._v(" "),v("h3",{attrs:{id:"innodb-和-myisam-有什么区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#innodb-和-myisam-有什么区别"}},[a._v("#")]),a._v(" InnoDB 和 MyISAM 有什么区别")]),a._v(" "),v("ol",[v("li",[a._v("InnoDB支持事物，MyISAM不支持事物")]),a._v(" "),v("li",[a._v("InnoDB支持行级锁，MyISAM支持表级锁，所以在高并发的场景下，MyISAM的性能比较差")]),a._v(" "),v("li",[a._v("InnoDB需要占用比较大的磁盘空间，因为需要存储各种日志；而MyISAM没有这么多日志文件，并且支持表压缩")]),a._v(" "),v("li",[a._v("InnoDB支持外健，MyISAM不支持外健")])]),a._v(" "),v("h3",{attrs:{id:"布隆过滤器的原理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#布隆过滤器的原理"}},[a._v("#")]),a._v(" 布隆过滤器的原理")]),a._v(" "),v("p",[a._v("布隆过滤器是为了解决某个元素是否存在的一种解决办法，常常是由于整体数据过大而导致全局遍历比较导致的性能问题，是执行业务逻辑之前的一种过滤方式。")]),a._v(" "),v("p",[a._v("布隆过滤器的实现是基于一定长度的bit数组和k个hash函数组成；")]),a._v(" "),v("ol",[v("li",[a._v("在写入阶段，会根据key的k次hash将得到的这k个hash值存储到数组的k个位置")]),a._v(" "),v("li",[a._v("在读取阶段，仍然用同样的方法计算k个hash，去和数组对应的位置进行比较，如果都为1，代表该元素可能存在；如果其中1个或多个位置为0，则代表该元素一定不存在")])]),a._v(" "),v("h3",{attrs:{id:"什么是类的加载"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#什么是类的加载"}},[a._v("#")]),a._v(" 什么是类的加载")]),a._v(" "),v("p",[a._v("类加载是指将.class文件中的二进制数据读取到内存中，将其放在运行时数据区的方法区中，然后在堆内存中创建一个Class对象。简单说就是吧.class文件中的二进制转换为描述类对象的Class对象放在堆内存中的过程")]),a._v(" "),v("h3",{attrs:{id:"类的生命周期"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#类的生命周期"}},[a._v("#")]),a._v(" 类的生命周期")]),a._v(" "),v("ol",[v("li",[a._v("加载： 根据类的全限定名获取对应的.class二进制文件，然后根据.class文件生成一个Class对象存放到方法区中")]),a._v(" "),v("li",[a._v("连接\n"),v("ol",[v("li",[a._v("验证：做一些安全验证，验证Class是否符合JVM的要求")]),a._v(" "),v("li",[a._v("准备：对一些static修饰的静态变量分配内存设置初始值(默认值)")]),a._v(" "),v("li",[a._v("解析：常量池中的符号饮用替换成直接引用")])])]),a._v(" "),v("li",[a._v("初始化：执行类的构造器的方法，分配内存空间。")]),a._v(" "),v("li",[a._v("使用")]),a._v(" "),v("li",[a._v("卸载")])]),a._v(" "),v("h3",{attrs:{id:"类加载器"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#类加载器"}},[a._v("#")]),a._v(" 类加载器")]),a._v(" "),v("ol",[v("li",[a._v("BootStrap ClassLoader 加载 JAVA_HOME/lib 下的jar文件，如 rt.jar")]),a._v(" "),v("li",[a._v("ExtClassLoader  加载 JAVA_HOME/lib/ext 下的jar文件")]),a._v(" "),v("li",[a._v("AppClassLoader 加载classpath指定的类库")]),a._v(" "),v("li",[a._v("自定义类加载器")])]),a._v(" "),v("h3",{attrs:{id:"类加载的过程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#类加载的过程"}},[a._v("#")]),a._v(" 类加载的过程")]),a._v(" "),v("p",[a._v("类加载请求将类加载请求传给父类加载器去加载，只有当父类加载器无法完成加载时才尝试自己加载")]),a._v(" "),v("h3",{attrs:{id:"双亲委派"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#双亲委派"}},[a._v("#")]),a._v(" 双亲委派")]),a._v(" "),v("p",[a._v("双亲委派是指 从最下层的自定义类加载器开始，将请求委派给上级的类加载器进行加载，如果上级类加载器已经加载过，则直接加载完成，如果没有加载过，则继续向上委托，直到BootStrap加载器，如果上级类加载器无法加载，则向下委派给子加载器进行加载。")]),a._v(" "),v("p",[v("strong",[a._v("双亲委派的目的：")])]),a._v(" "),v("ol",[v("li",[a._v("防止同一个.class被重复加载")]),a._v(" "),v("li",[a._v("保证上级的类加载器的核心类不被子类加载器加载而篡改，即使被篡改了，那么jvm也认为被篡改的类与核心类不是同一个class对象。")])]),a._v(" "),v("h3",{attrs:{id:"mysql-rc和rr隔离级别的区别"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#mysql-rc和rr隔离级别的区别"}},[a._v("#")]),a._v(" MySQL RC和RR隔离级别的区别")]),a._v(" "),v("ul",[v("li",[a._v("RR支持 gap lock(间隙锁)， 而RC不支持gap lock；因为RR需要使用gap lock解决幻读问题，而RC是支持幻读的；")]),a._v(" "),v("li",[a._v("对非索引列进行条件过滤时，RC会将不符合条件的行锁释放，而RR会将不符合条件的数据也加上行锁，所以RR隔离级别的并发更差。")]),a._v(" "),v("li",[a._v("对binlog而言，RC隔离级别不支持statement格式的binlog，会造成主从不一致的情况（statement格式下，binlog是按照commit顺序记录的，而row和mixed在记录commit顺序的同时，还会记录修改前的数据）")]),a._v(" "),v("li",[a._v("RC隔离级别下，在同一个事物中，多次进行select查询，每次select都会生成一个Read View，而RR隔离级别在同一个事物中，多次select查询都是用的是同一个ReadView。")])]),a._v(" "),v("h3",{attrs:{id:"最左匹配的原理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#最左匹配的原理"}},[a._v("#")]),a._v(" 最左匹配的原理")]),a._v(" "),v("p",[a._v("比如某张表中的两个字段a和b，对应的创建了一个联合索引idx_a_b, 在生成索引时，索引中的数据是根据a和b字段的值进行分级排序的，当a的值相等时，才根据b字段的值进行排序，所以在索引数据中，整体数据是按照a字段的值进行排序的，b的值不是顺序的，所以查询时如果不按a字段进行查询，就不会走这个联合索引。")]),a._v(" "),v("h3",{attrs:{id:"kafka为什么不支持读写分离"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#kafka为什么不支持读写分离"}},[a._v("#")]),a._v(" kafka为什么不支持读写分离")]),a._v(" "),v("p",[a._v("Kafka生产者将数据写入partion的Leader节点，消费者也会从partition的Leader节点拉取消息，如果使用读写分离，即生产者写入Leader，消费者从Follower拉取消息，可能会出现如下问题：")]),a._v(" "),v("ol",[v("li",[a._v("数据不一致问题，比如在这样的场景下，Leader和Follower的数据是一样的，当Leader数据进行了修改，但是还没有同步到Follower，此时如果消费者从Follower拉取数据，这个数据是错误的。")]),a._v(" "),v("li",[a._v("实时性问题，Leader和Follower之间数据同步不是实时的，这个同步需要经过网络IO，磁盘多次IO的操作，比较耗时，所以如果从Follower拉取消息，实时性无法保证。")])]),a._v(" "),v("h3",{attrs:{id:"es数据写入的流程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#es数据写入的流程"}},[a._v("#")]),a._v(" ES数据写入的流程")]),a._v(" "),v("p",[v("img",{attrs:{src:"/images/interview/ES%E6%95%B0%E6%8D%AE%E5%86%99%E5%85%A5%E6%B5%81%E7%A8%8B.png",alt:"ES数据写入流程"}})])])}),[],!1,null,null,null);v.default=e.exports}}]);
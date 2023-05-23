# AQS

AQS是 AbstractQueuedSynchronizer 的缩写，是juc包下的一个基类，是很多实现都是基于AQS实现的部分功能，比如 ReentrantLock、ThreadPoolExecutor的Worker、CountDownLatch等。

## AQS的核型结构及属性

![AQS结构](/images/java_basics/JUC/AQS结构.png)

### 1. AQS的属性
```java
/**
 * 头节点
 */
private transient volatile Node head;

 /**
  * 尾节点
  */
 private transient volatile Node tail;

 /**
  * 同步状态
  * 代表同步状态，state = 0代表没有被加锁，state = 1代表已被一个线程加锁，state > 1代表被同一个线程多次加锁（可重入）
  */
 private volatile int state;
```

### 2. Node节点，也叫CLH队列

```java
static final class Node {
    /**
    * waitStatus 对应的4个常量值
    */
    static final int CANCELLED =  1;
    static final int SIGNAL    = -1;
    static final int CONDITION = -2;
    static final int PROPAGATE = -3;

     /**
      *   SIGNAL:     后继节点线程需要被唤醒时的当前节点状态。
      *   当队列中加入后继节点被挂起(block)时，其前驱节点会被设置为SIGNAL状态，表示该节点需要被唤醒。
      *               
      *   CANCELLED:  节点引用线程由于等待超时或被打断时的状态。
      *   
      *   PROPAGATE:  仅在释放共享锁releaseShared时对头节点使用。
      *   
      *   0:          节点初始化的状态
      *
      *   CONDITION:    当节点线程进入condition队列时的状态。
      *
      * 这些值按数字排列以简化使用。非负值意味着节点不需要发出信号。因此，大多数代码只需要比较大小即可。
      */
     volatile int waitStatus;

     /**
      * 前驱节点
      */
     volatile Node prev;

     /**
      * 后置节点
      */
     volatile Node next;

     /**
      * 当前节点等待的线程，头节点不包含线程
      */
     volatile Thread thread;

     /**
      * condition条件队列
      */
     Node nextWaiter;

 }
```

### 3. 模板方法

```java
//尝试获取独占锁
protected boolean tryAcquire(int arg) {
    throw new UnsupportedOperationException();
}

//尝试释放独占锁
protected boolean tryRelease(int arg) {
    throw new UnsupportedOperationException();
}

//尝试获取共享锁
protected int tryAcquireShared(int arg) {
    throw new UnsupportedOperationException();
}

//尝试释放共享锁
protected boolean tryReleaseShared(int arg) {
    throw new UnsupportedOperationException();
}

//判断是否为独占锁
protected boolean isHeldExclusively() {
    throw new UnsupportedOperationException();
}
```

## 独占锁和共享锁定

### 独占锁

1. acquire()

acquire()方法内部调用3个函数：
+ 其中tryAcquire()需要在实现类中自行实现，如果返回true，则代表获取锁成功，直接返回；如果返回false，则将当前线程包装后入队；所以acquire()方法默认为非公平锁
+ addWaiter()是将当前线程包装为一个Node节点，


```java
/**
 *  以独占模式获取锁，如果获取成功则直接返回，如果获取失败，则入队等待
 *  int arg 可以根据实现自行设计
 */
public final void acquire(int arg) {
    //tryAcquire(arg)方法由实现类实现
    if (!tryAcquire(arg) &&
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
        selfInterrupt();
}
```
# ConcurrentHashMap

本文以1.8版本为例

ConcurrentHashMap 是线程安全的 HashMap ，通过 CAS和 synchronied 实现线程安全

jdk1.7中是基于Segment分段存储，Segment 继承自 ReentrantLock, 在并发冲突的时候对Segment进行lock操作；

jdk1.8中去掉了Segment的概念，转为与HashMap相同的数据结构，并发时对hash槽的Node头节点进行锁定，并使用CAS操作。

### jdk1.8升级做了哪些优化？
1. 首先去除了Segment分段的概念，对hash槽中链表的头节点进行加锁保证数据同步，锁粒度更细，并发也更高；
2. 在出现并发的时候，synchonized会有自旋的行为，线程不会立刻挂起；而ReentrantLock在阻塞队列中的线程可能会直接挂起，因为线程的挂起和唤醒都是非常消耗资源的，所以jdk1.8选择了前者。

## 源码

### 一些常量值

```java
/**
 * 最大容量，2^30，与HashMap相同
 */
private static final int MAXIMUM_CAPACITY = 1 << 30;

/**
 * 默认的初始容量16，必须是2的次幂，与HashMap相同
 */
private static final int DEFAULT_CAPACITY = 16;

/**
 * 最大的数组长度
 */
static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

/**
 * The default concurrency level for this table. Unused but
 * defined for compatibility with previous versions of this class.
 * 兼容老版本，jdk8没有使用
 */
private static final int DEFAULT_CONCURRENCY_LEVEL = 16;

/**
 * 负载因子，默认0.75，与HashMap相同
 */
private static final float LOAD_FACTOR = 0.75f;

/**
 * 树化阈值，>=该值可能变为红黑树
 */
static final int TREEIFY_THRESHOLD = 8;

/**
 * 小于等于该值，红黑树变成链表，只在扩容阶段，从旧数组迁移到新数组时发生
 */
static final int UNTREEIFY_THRESHOLD = 6;

/**
 * 在链表达到树化阈值TREEIFY_THRESHOLD时，会先判断数组长度如果 < 64, 则直接进行扩容，而不会转换为红黑树
 */
static final int MIN_TREEIFY_CAPACITY = 64;

/**
 * Minimum number of rebinnings per transfer step. Ranges are
 * subdivided to allow multiple resizer threads.  This value
 * serves as a lower bound to avoid resizers encountering
 * excessive memory contention.  The value should be at least
 * DEFAULT_CAPACITY.
 * 扩容时，给线程分配迁移数组元素任务时的最小步长
 */
private static final int MIN_TRANSFER_STRIDE = 16;

/**
 * The number of bits used for generation stamp in sizeCtl.
 * Must be at least 6 for 32bit arrays.
 * 扩容时，在sizeCtl中用于生成戳记的数值
 */
private static int RESIZE_STAMP_BITS = 16;

/**
 * The maximum number of threads that can help resize.
 * Must fit in 32 - RESIZE_STAMP_BITS bits.
 * 帮助扩容的最大线程数
 */
private static final int MAX_RESIZERS = (1 << (32 - RESIZE_STAMP_BITS)) - 1;

/**
 * The bit shift for recording size stamp in sizeCtl.
 */
private static final int RESIZE_STAMP_SHIFT = 32 - RESIZE_STAMP_BITS;

/*
 * Encodings for Node hash fields. See above for explanation.
 */
static final int MOVED     = -1; // 代表节点正在移动
static final int TREEBIN   = -2; // 表示已经转换成红黑树,代表红黑树的根结点
static final int RESERVED  = -3; // 临时保留的节点
static final int HASH_BITS = 0x7fffffff; // usable bits of normal node hash
```

### 几个比较重要的内部类

#### TreeNode：红黑树节点

```java
static final class TreeNode<K,V> extends Node<K,V> {
    TreeNode<K,V> parent;  // red-black tree links
    TreeNode<K,V> left;
    TreeNode<K,V> right;
    TreeNode<K,V> prev;    // needed to unlink next upon deletion
    boolean red;
    
    TreeNode(int hash, K key, V val, Node<K,V> next,
             TreeNode<K,V> parent) {
        super(hash, key, val, next);
        this.parent = parent;
    }
    
    Node<K,V> find(int h, Object k) {
        return findTreeNode(h, k, null);
    }
    
    /**
     * Returns the TreeNode (or null if not found) for the given key
     * starting at given root.
     */
    final TreeNode<K,V> findTreeNode(int h, Object k, Class<?> kc) {...}
}
```

#### TreeBin: 树的root节点和first节点，不存储key、value
```java
static final class TreeBin<K,V> extends Node<K,V> {
    TreeNode<K,V> root;
    volatile TreeNode<K,V> first;
    volatile Thread waiter;
    volatile int lockState;
    // values for lockState
    static final int WRITER = 1; // set while holding write lock
    static final int WAITER = 2; // set when waiting for write lock
    static final int READER = 4; // increment value for setting read lock
}
```
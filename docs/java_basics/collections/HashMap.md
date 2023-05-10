# HashMap

HashMap是基于hash算法的一个K-V结构存储的容器，不支持顺序读写，不支持并发操作。本文以1.8版本为例。

继承关系
![继承关系](/images/java_basics/collections/HashMap.png)

## 结构

JDK1.8的HashMap是由数组+链表+红黑树的数据结构实现的，如下图

![结构](/images/java_basics/collections/1.8HashMap结构.png)

## Node源码

Node作为HashMap的静态内部类，是一个单向链表结构，用来存储存放数据。

```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash; //数组索引下标
    final K key;
    V value;
    Node<K,V> next; //只有next，代表是一个单向链表

    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }

    public final K getKey()        { return key; }
    public final V getValue()      { return value; }
    public final String toString() { return key + "=" + value; }
    public final int hashCode() {...}
    public final V setValue(V newValue) {...}
    public final boolean equals(Object o) {...}
}

```

## HashMap属性

```java
/**
 * 数组，在第一次put时初始化，并根据当前容量进行调整，该数组的长度必须时2的次幂
 * 默认值为 static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;
 */
transient Node<K,V>[] table;

/**
 * 存储 K-V 数据的个数，即 Node 对象的个数
 */
transient int size;

/**
 * 用来记录HashMap内部结构发生变化的次数
 *
 * This field is used to make iterators on Collection-views of the HashMap fail-fast.
 * 用于迭代的快速失败
 */
transient int modCount;

/**
 * 记录HashMap中达到负载的Node个数，当达到这个值之后，开始执行扩容
 * 计算方法： capacity * load factor
 */
int threshold;

/**
 * 负载因子，初始化容器时如果不指定，则使用 DEFAULT_LOAD_FACTOR
 */
final float loadFactor;
```

## 主要方法

### 1. hash方法：确定key在table中的数组下标

HashMap无论时在增、删、查的过程中都需要对key进行hash运算，定位到对应的哈希桶后再进行后续操作，所以hash方法很关键

```java
static final int hash(Object key) {
    int h;
    //key == null 代表这里的key可以为null
    // h = key.hashCode() 
    // 1. 先对key进行hash计算得到h
    // 2. 得到的结果h再右移16位 
    // 1和2 两步得到的结果异或运算最终的到数组位置下标
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```
如下图，n=16
![hash计算](/images/java_basics/collections/hash计算.png)

+ 为什么JDK1.8要用这种方式计算hash？
  
    是为了尽可能的将hash值散列到各个哈希桶中，利用高16位和低16位都参与到hash运算中，在保证性能的前提下，使计算结果分布的更均匀。

### 2. put方法

```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    if ((tab = table) == null || (n = tab.length) == 0) {
        //如果数组为空,直接扩容，如果是第一次添加元素，则resize内部是初始化table等属性的过程
        n = (tab = resize()).length;
    }
    if ((p = tab[i = (n - 1) & hash]) == null) {
        //tab[i = (n - 1) & hash] 计算出数组下标，如果下标位置的头节点为空，则为该下标new一个新节点作为头节点
        tab[i] = newNode(hash, key, value, null);
    } else {
        //如果下标位置的头节点不为空
        Node<K,V> e; K k;
        //p代表下标位置的头节点
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k)))) {
            //如果头节点的key和要插入的key相同，说明插入了重复的key
            //直接复用头节点的Node对象，key不变，value进行覆盖即可(覆盖的操作在后面)
            e = p;
        } else if (p instanceof TreeNode) {
            //如果头节点为红黑树，直接调用红黑树的插入方法新增节点即可
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        } else {
            //这里就时遍历链表，进行尾插
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    //尾插法，将新构建的Node放在链表尾端
                    p.next = newNode(hash, key, value, null);
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        //这里判断链表节点数量如果大于等于7(还没有++，其实已经是8个节点了)，转换成红黑树
                        treeifyBin(tab, hash);
                    break;
                }
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k)))) {
                    //这里和头节点判断相同，判断key是否重复，如果重复在后面的代码中进行value的覆盖操作
                    break;
                }
                p = e; //遍历到这里，p的指针指向链表最尾端的节点对象
            }
        }
        if (e != null) { // existing mapping for key
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null) {
                //覆盖value
                e.value = value;
            }
            afterNodeAccess(e);
            return oldValue;
        }
    }
    ++modCount; //操作数+1
    if (++size > threshold) {
        //如果当前HashMap中的节点数>阈值(容器容量*负载因子)，则进行扩容操作
        resize();
    }
    afterNodeInsertion(evict);
    return null;
}
```

### resize方法：扩容

```java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    if (oldCap > 0) {
        // oldCap > 0 代表原先已经有元素了，在插入之后进行扩容的场景
        if (oldCap >= MAXIMUM_CAPACITY) {
            //达到允许的最大值 2^30, 将阈值设置为int最大值2^31-1, 就不再扩容了
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                 oldCap >= DEFAULT_INITIAL_CAPACITY) {
            //这里左移1位，就是两倍扩容
            newThr = oldThr << 1; // double threshold
        }
    }
    else if (oldThr > 0) { // initial capacity was placed in threshold
        newCap = oldThr;
    }
    else {               // zero initial threshold signifies using defaults
        //这个else 代表是第一次put元素时，初始化容器中的一些默认值
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    if (newThr == 0) {
        //重新计算容器阈值
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;
    @SuppressWarnings({"rawtypes","unchecked"})
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap]; //初始化一个新的数组，准备开始移动元素
    table = newTab;
    if (oldTab != null) {
        for (int j = 0; j < oldCap; ++j) {//遍历旧的数组元素
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;
                if (e.next == null) {
                    //这里按照新的数组大小和hash值进行与运算得到新数组中的下标
                    newTab[e.hash & (newCap - 1)] = e;
                } else if (e instanceof TreeNode) {
                    //红黑树和链表的转换
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                }
                else { // preserve order
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```
# ThreadLocal

ThreadLocal是保证线程安全的一种实现方式，内部是通过Thread类的内部类【ThreadLocalMap】存储线程中变量的方式实现的线程安全的。

## 结构示意图

![ThreadLocal结构](/images/java_basics/thread/ThreadLocal结构.png)

## 源码

### ThreadLocalMap.Entry对象

```java
static class Entry extends WeakReference<ThreadLocal<?>> {
    Object value;

    Entry(ThreadLocal<?> var1, Object var2) {
        super(var1);
        this.value = var2;
    }
}
```

### set方法
```java
public void set(T value) {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t); //t.threadLocals
    if (map != null)
        map.set(this, value);
    else
        createMap(t, value);
}
```

### get方法
```java
public T get() {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value;
            return result;
        }
    }
    return setInitialValue();
}
```

## 内存泄漏问题

![ThreadLocal内存泄漏](/images/java_basics/thread/ThreadLocal内存泄漏.png)

如图，上图中如果将tl变量置为null，则ThreadLocal将不会被引用，正常情况下，如果Thread对象使用完成后JVM在发生GC时会对Thread进行回收，这种情况下时没有问题的。

但是我们平常在项目中，Thread的创建是使用线程池的，线程池的Thread对象是重复使用的，不会被回收，所以Thread对象引用ThreadMap，而ThreadLocalMap又引用Entry，所以不会回收Entry的key（也就是ThredLocal对象），但它是没有用的，会一直存在，无法被回收。

JDK也对其做了一些优化，使Entry继承自WeakReference，从而在GC发生时，如果Entry没有被其他对象所引用，那么就会对这个Entry的key进行回收，但是value仍然不会被回收。

### 如何避免
最普通的办法，也是一种开发规范，就是是在使用完ThreadLocal之后，对其进行一个remove操作，就能避免这种问题
```java
private static ThreadLocal<String> tl = new ThreadLocal<>();

public static void main(String[] args) {
    try {
        tl.set("hello");

        methodA();
    } finally {
        tl.remove(); //在finally块中执行remove操作
    }
}

private static void methodA() {
    System.out.println(tl.get());
}
```

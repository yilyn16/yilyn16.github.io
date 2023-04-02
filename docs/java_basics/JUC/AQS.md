# AQS

1. private volatile int state; 代表同步状态，state = 0代表没有被加锁，state = 1代表已被一个线程加锁，state > 1代表被同一个线程多次加锁（可重入）
2. Node 双向链表
    1. int waitStatus
    2. Node prev
    3. Node next
    4. Thread thread
    5. Node nextWaiter
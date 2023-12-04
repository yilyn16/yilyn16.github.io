(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{315:function(v,_,t){"use strict";t.r(_);var a=t(7),r=Object(a.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"jvm"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#jvm"}},[v._v("#")]),v._v(" JVM")]),v._v(" "),_("h2",{attrs:{id:"jvm运行时数据区的组成"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#jvm运行时数据区的组成"}},[v._v("#")]),v._v(" JVM运行时数据区的组成")]),v._v(" "),_("ol",[_("li",[_("p",[v._v("程序计数器: 简单的说，线程计数器就是为了记录每个线程执行到哪一行的一块非常小的区域，所以说每个线程都有一个程序计数器为线程服务。 如果线程执行java方法，则程序计数器存放的是java方法的指令地址；如果执行本地的native方法，程序计数器为空。")])]),v._v(" "),_("li",[_("p",[v._v("虚拟机栈: 线程私有的，虚拟机栈简称栈，是表示java方法执行的内存模型，每个java方法执行时都会创建一个栈帧，每个栈帧中存储了局部变量表、操作数栈、方法出口等信息，局部变量表在编译器就对其内存进行了分配。")]),v._v(" "),_("p",[_("strong",[v._v("异常情况")])]),v._v(" "),_("ul",[_("li",[v._v("栈深度大于虚拟机允许的最大深度抛出StackOverflowError")]),v._v(" "),_("li",[v._v("内存不足时抛出OutOfMemoryError")])])]),v._v(" "),_("li",[_("p",[v._v("本地方法栈: 与虚拟机栈类似，只是本地方法栈为本地方法服务。")])]),v._v(" "),_("li",[_("p",[v._v("方法区: 所有线程共享，存储已经被虚拟机加载的类信息、常量、静态变量等数据")])]),v._v(" "),_("li",[_("p",[v._v("堆: 所有线程共享，java内存中最大的一块区域，虚拟机启动时就被创建。堆内存中主要存放对象的实例和数据等信息。")])])]),v._v(" "),_("p",[_("strong",[v._v("下图为jdk1.7之前的内存数据区划分")])]),v._v(" "),_("p",[_("img",{attrs:{src:"/images/java_basics/jvm/%E8%BF%90%E8%A1%8C%E6%97%B6%E6%95%B0%E6%8D%AE%E5%8C%BAjdk7.jpeg",alt:"运行时数据区jdk7.jpeg"}})]),v._v(" "),_("p",[_("strong",[v._v("下图为jdk8以后的内存数据区结构")])]),v._v(" "),_("p",[_("img",{attrs:{src:"/images/java_basics/jvm/%E8%BF%90%E8%A1%8C%E6%97%B6%E6%95%B0%E6%8D%AE%E5%8C%BAjdk8.jpeg",alt:"运行时数据区jdk8.jpeg"}})]),v._v(" "),_("h2",{attrs:{id:"栈帧中对象的引用方式"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#栈帧中对象的引用方式"}},[v._v("#")]),v._v(" 栈帧中对象的引用方式")]),v._v(" "),_("p",[v._v("栈帧中的局部变量表存储的事对象的引用和一些基本的数据类型，但是栈帧中使用的对象实例则存储在堆内存中。局部变量表的对象引用一般有两种方式:")]),v._v(" "),_("ol",[_("li",[v._v("使用句柄方式: 在堆内存中有一块区域作为句柄池，用来存放对象实例的指针和对象类型数据的指针，指向堆中的对象实例和方法区的对象类型数据。 这种方式的优点是比较灵活，在gc过程中，对象移动时只改变句柄池的对象指针即可。")])]),v._v(" "),_("p",[_("img",{attrs:{src:"/images/java_basics/jvm/%E5%8F%A5%E6%9F%84%E6%96%B9%E5%BC%8F.png",alt:"句柄方式.png"}})]),v._v(" "),_("ol",{attrs:{start:"2"}},[_("li",[v._v("直接引用方式: 局部变量表的对象引用直接存储对象实例的指针，指向堆内存的对象实例，而对象类型数据则存在对象实例中。这种方式的优点是性能较句柄方式更好，节省了一次指针寻找地址的时间。")])]),v._v(" "),_("p",[_("img",{attrs:{src:"/images/java_basics/jvm/%E7%9B%B4%E6%8E%A5%E5%BC%95%E7%94%A8%E6%96%B9%E5%BC%8F.png",alt:"直接引用方式.png"}})]),v._v(" "),_("h2",{attrs:{id:"堆区"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#堆区"}},[v._v("#")]),v._v(" 堆区")]),v._v(" "),_("p",[v._v("堆区分为新生代和老年代。而新生代则分为Eden区和survivor1以及survivor2")]),v._v(" "),_("p",[v._v("新创建的对象被存放在新生代，但是如果对象超大的话，会直接存放到老年代（需要设置jvm参数：-XX:PretenureSizeThreshold）。")]),v._v(" "),_("p",[_("img",{attrs:{src:"/images/java_basics/jvm/%E5%AF%B9%E8%B1%A1%E5%88%9B%E5%BB%BA%E5%86%85%E5%AD%98%E5%88%86%E9%85%8D%E6%B5%81%E7%A8%8B.png",alt:"对象创建内存分配流程.png"}})]),v._v(" "),_("h2",{attrs:{id:"虚拟机参数"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#虚拟机参数"}},[v._v("#")]),v._v(" 虚拟机参数")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("参数")]),v._v(" "),_("th",[v._v("说明")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("-Xmx -Xms")]),v._v(" "),_("td",[v._v("堆内存的最大值和最小值，如果设置了最大和最小值，jvm启动后会开辟最小内存，经过数次GC后，还不能满足程序的运行需要，才会逐渐扩大内存.")])]),v._v(" "),_("tr",[_("td",[v._v("-Xms")]),v._v(" "),_("td",[v._v("默认为物理内存的1/64，最小为1M，-Xmx默认为物理内存的1/4或者1G，最小为2M，两者单位可自定义，若不置顶单位，默认为字节。")])]),v._v(" "),_("tr",[_("td",[v._v("-Xmn")]),v._v(" "),_("td",[v._v("新生代的内存大小，官方推荐新生代占java堆的3/8")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:NewSize")]),v._v(" "),_("td",[v._v("设置年轻代大小")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:MaxNewSize")]),v._v(" "),_("td",[v._v("设置年轻代最大值")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:NewRatio")]),v._v(" "),_("td",[v._v("新生代和老年代的比例")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:SurvivorRatio")]),v._v(" "),_("td",[v._v("两个survivor区和eden区的比例")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:PermSize -XX:MaxPermSize")]),v._v(" "),_("td",[v._v("设置永久代的内存大小和最大值。MaxPermSize默认为物理内存的1/4")])]),v._v(" "),_("tr",[_("td",[v._v("-Xss")]),v._v(" "),_("td",[v._v("栈的大小，默认1M")])]),v._v(" "),_("tr",[_("td",[v._v("-XXThreadStackSize")]),v._v(" "),_("td",[v._v("设置线程栈的大小")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:MaxTenuringThreshold")]),v._v(" "),_("td",[v._v("设置垃圾的最大年龄，如果为0，则年轻代对象不会在eden区生成后不经过survivor区，直接进入老年代")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:PretenureSizeThreshold")]),v._v(" "),_("td",[v._v("设置对象超过多大时直接在老年代进行内存分配，默认为0")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:+HeapDumpOnOutMemoryError")]),v._v(" "),_("td",[v._v("发生OOM错误时，以文件形式导出堆信息。")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:+HeapDumpPath")]),v._v(" "),_("td",[v._v("OOM错误时导出的文件路径")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:OnOutOfMemoryError")]),v._v(" "),_("td",[v._v("当系统产生OOM时，执行一个指定的脚本，这个脚本可以是任意功能的。比如生成当前线程的dump文件，或者是发送邮件和重启系统。")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:+UseSerialGC")]),v._v(" "),_("td",[v._v("使用串行垃圾回收器")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:+UseParNewGC")]),v._v(" "),_("td",[v._v("使用PartNew垃圾回收器")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:+UseConcMarkSweepGC")]),v._v(" "),_("td",[v._v("使用CMS垃圾回收器，如果新生代没有配置垃圾回收器，会默认选择ParNew作为新生代的垃圾回收器")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:ParallelGCThreads")]),v._v(" "),_("td",[v._v("设置垃圾收集器的线程数量，不设置的情况下默认与CPU核心数一致")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:MaxGCPauseMillis")]),v._v(" "),_("td",[v._v("设置Parallel Scavenge垃圾收集器运行时业务线程停顿的最大时间（STW的时间）")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:GCTimeRatio")]),v._v(" "),_("td",[v._v("设置Parallel Scavenge垃圾收集器垃圾收集的时间占总时间的比例，该参数可以明确体现出CPU的吞吐量。")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:+UseParallelOldGC")]),v._v(" "),_("td",[v._v("指定老年代使用Parallel Old垃圾收集器")])]),v._v(" "),_("tr",[_("td",[v._v("-XX:+UseConcMarkSweepGC")]),v._v(" "),_("td",[v._v("制定老年代使用CMS垃圾回收器")])])])]),v._v(" "),_("h2",{attrs:{id:"垃圾回收"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收"}},[v._v("#")]),v._v(" 垃圾回收")]),v._v(" "),_("h3",{attrs:{id:"判断对象是否已死"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#判断对象是否已死"}},[v._v("#")]),v._v(" 判断对象是否已死?")]),v._v(" "),_("ol",[_("li",[v._v("引用计数法")])]),v._v(" "),_("p",[v._v("对象会存一个引用计数器，每当有一个地方引用它，对象的计数器就+1，引用失效时，计数器-1；当计数器为0时，就代表对象不再被引用。")]),v._v(" "),_("p",[v._v("现在常用的JVM没有使用引用计数法，主要原因就是引用计数法无法解决对象的循环引用问题")]),v._v(" "),_("ol",{attrs:{start:"2"}},[_("li",[_("p",[v._v("可达性分析算法（JVM使用的）")]),v._v(" "),_("p",[_("strong",[v._v("GC Roots对象：")])]),v._v(" "),_("ul",[_("li",[v._v("虚拟机栈(栈桢中的本地变量表)中的引用的对象")]),v._v(" "),_("li",[v._v("方法区中的类静态属性引用的对象")]),v._v(" "),_("li",[v._v("方法区中的常量引用的对象")]),v._v(" "),_("li",[v._v("本地方法栈中（native方法）的引用的对象")])])])]),v._v(" "),_("p",[_("strong",[v._v("可达性分析算法")]),v._v("：通过一系列称为“GC Roots”的对象作为起始点，从这些节点开始向下搜索，当一个对象到GC Roots没有任何引用链连接时，说明该对象已死。")]),v._v(" "),_("h3",{attrs:{id:"垃圾回收算法"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收算法"}},[v._v("#")]),v._v(" 垃圾回收算法")]),v._v(" "),_("ol",[_("li",[v._v("标记-清除算法")])]),v._v(" "),_("p",[v._v("分为标记和清除两个阶段，先标记出所有需要需要回收的对象，标记完成后统一回收所有被标记的对象。标记-清除算法的缺点：")]),v._v(" "),_("ul",[_("li",[v._v("效率低")]),v._v(" "),_("li",[v._v("产生较多的内存碎片，在系统需要分配大内存对象时可能会无法找到足够内存而出发另一次GC")])]),v._v(" "),_("p",[_("img",{attrs:{src:"/images/java_basics/jvm/%E6%A0%87%E8%AE%B0-%E6%B8%85%E9%99%A4%E7%AE%97%E6%B3%95.jpg",alt:"标记-清除算法.jpg"}})]),v._v(" "),_("ol",{attrs:{start:"2"}},[_("li",[v._v("标记-整理算法(老年代回收算法)")])]),v._v(" "),_("p",[v._v("与标记-清除算法前期方式一致，标记完需要回收的对象后，将存活对象移向另一端，这样存活的对象就时一整块连续的内存，将这些存活对象以外的直接批量清除即可。")]),v._v(" "),_("p",[_("img",{attrs:{src:"/images/java_basics/jvm/%E6%A0%87%E8%AE%B0-%E6%95%B4%E7%90%86%E7%AE%97%E6%B3%95.jpg",alt:"标记-整理算法.jpg"}})]),v._v(" "),_("ol",{attrs:{start:"3"}},[_("li",[v._v("复制算法(新生代回收算法)")])]),v._v(" "),_("p",[v._v("每次使用时只使用Eden和其中的一块Survivor区，回收时将Eden和Survivor1中还存活的对象一次性复制到Survivor2区，再将Eden和Survivor1区的对象清除。该算法的好处：")]),v._v(" "),_("ul",[_("li",[v._v("简单高效（空间换时间）")]),v._v(" "),_("li",[v._v("不会出现内存碎片，每次只操作一半区域")])]),v._v(" "),_("p",[_("img",{attrs:{src:"/images/java_basics/jvm/%E5%A4%8D%E5%88%B6%E7%AE%97%E6%B3%95.jpg",alt:"复制算法.jpg"}})]),v._v(" "),_("h3",{attrs:{id:"垃圾回收器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收器"}},[v._v("#")]),v._v(" 垃圾回收器")]),v._v(" "),_("table",[_("thead",[_("tr",[_("th",[v._v("种类")]),v._v(" "),_("th",[v._v("GC方式")]),v._v(" "),_("th",[v._v("使用算法")]),v._v(" "),_("th",[v._v("适用区域")]),v._v(" "),_("th",[v._v("说明")])])]),v._v(" "),_("tbody",[_("tr",[_("td",[v._v("Serial")]),v._v(" "),_("td",[v._v("串行")]),v._v(" "),_("td",[v._v("复制")]),v._v(" "),_("td",[v._v("新生代")]),v._v(" "),_("td",[v._v("执行时会SWT")])]),v._v(" "),_("tr",[_("td",[v._v("Serial Old")]),v._v(" "),_("td",[v._v("串行")]),v._v(" "),_("td",[v._v("标记-整理")]),v._v(" "),_("td",[v._v("老年代")]),v._v(" "),_("td",[v._v("执行时会SWT")])]),v._v(" "),_("tr",[_("td",[v._v("ParNew")]),v._v(" "),_("td",[v._v("并行")]),v._v(" "),_("td",[v._v("复制")]),v._v(" "),_("td",[v._v("新生代")]),v._v(" "),_("td",[v._v("Serial的多线程版本，一般与老年代的CMS收集器公用，也会STW")])]),v._v(" "),_("tr",[_("td",[v._v("Parallel Scavenge")]),v._v(" "),_("td",[v._v("并行")]),v._v(" "),_("td",[v._v("复制")]),v._v(" "),_("td",[v._v("新生代")]),v._v(" "),_("td",[v._v("关注点为CPU吞吐量，吞吐量的计算方式：CPU执行代码的时间/（执行代码时间+垃圾收集时间），执行垃圾收集时会SWT")])]),v._v(" "),_("tr",[_("td",[v._v("Parallel Old")]),v._v(" "),_("td",[v._v("并行")]),v._v(" "),_("td",[v._v("标记-整理")]),v._v(" "),_("td",[v._v("老年代")]),v._v(" "),_("td",[v._v("Parallel Scavenge的老年代版本，STW")])]),v._v(" "),_("tr",[_("td",[v._v("CMS(Concurrent Mark Sweep)")]),v._v(" "),_("td",[v._v("并行")]),v._v(" "),_("td",[v._v("标记-清除")]),v._v(" "),_("td",[v._v("老年代")]),v._v(" "),_("td",[v._v("STW时间较短，需要内存较大，由于使用标记-清除算法（不整理），会产生内存碎片")])]),v._v(" "),_("tr",[_("td",[v._v("G1(Garbage-First)")]),v._v(" "),_("td",[v._v("并行")]),v._v(" "),_("td",[v._v("标记-整理+复制")]),v._v(" "),_("td",[v._v("整个堆内存都可以使用")]),v._v(" "),_("td",[v._v("其他垃圾回收器度需要两种一起配合使用，G1可以单独使用。")])])])]),v._v(" "),_("h4",{attrs:{id:"g1垃圾回收器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#g1垃圾回收器"}},[v._v("#")]),v._v(" G1垃圾回收器")]),v._v(" "),_("ol",[_("li",[v._v("特点")])]),v._v(" "),_("ul",[_("li",[v._v("其他垃圾回收器需要两种回收器一起配合使用，而单独使用G1回收器，就可以回收堆内存垃圾。")]),v._v(" "),_("li",[v._v("G1回收器将堆内存分为大小相同的独立区域（Region）")]),v._v(" "),_("li",[v._v("虽然新生代和老年代的概念还保留，但是他们两个不再进行物理上的划分，而是存在不同的Region中，这些Region可以是不连续的。")]),v._v(" "),_("li",[v._v("G1回收器在执行时可以预估系统停止运行的时间：G1会根据收集出的每个Region中垃圾的大小生成一个列表，优先回收价值大的Region，这也是G1名字的由来。")])]),v._v(" "),_("ol",{attrs:{start:"2"}},[_("li",[_("p",[v._v("回收过程")]),v._v(" "),_("ul",[_("li",[v._v("初始标记：只标记GC Root直接关联的对象，这个过程需要STW；")]),v._v(" "),_("li",[v._v("并发标记：根据初始标记获得的存活对象继续向下查找标记（可达性分析），标记出所有存活的对象。这个阶段会与用户线程并行，虽然时间长，但是不会影响用户线程，缺点是不能标记出所有的对象，因为在这同时，用户线程会产生新的对象。")]),v._v(" "),_("li",[v._v("最终标记：这时候需要STW，标记出并发标记过程中，用户线程继续运行而产生的新对象。")]),v._v(" "),_("li",[v._v("并发清理：将所有Region的回收价值进行排序，按配置的停顿时间制定一个回收计划，根据回收计划进行回收。Region垃圾的回收使用复制算法，将一个Region中存活下来的对象复制到一个空的Region中，删除原来的Region。")])])])])])}),[],!1,null,null,null);_.default=r.exports}}]);
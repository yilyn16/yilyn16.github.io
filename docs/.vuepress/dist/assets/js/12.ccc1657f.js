(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{291:function(_,t,v){"use strict";v.r(t);var a=v(7),e=Object(a.a)({},(function(){var _=this,t=_._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#什么是事务"}},[_._v("什么是事务")])]),t("li",[t("a",{attrs:{href:"#事务的特性-acid"}},[_._v("事务的特性（ACID）")])]),t("li",[t("a",{attrs:{href:"#mysql的事物隔离级别"}},[_._v("MySQL的事物隔离级别")]),t("ul",[t("li",[t("a",{attrs:{href:"#读取未提交-read-uncommitted"}},[_._v("读取未提交(READ UNCOMMITTED)")])]),t("li",[t("a",{attrs:{href:"#读取已提交-read-committed"}},[_._v("读取已提交（READ COMMITTED）")])]),t("li",[t("a",{attrs:{href:"#可重复读-repeatable-read"}},[_._v("可重复读（REPEATABLE READ）")])])])]),t("li",[t("a",{attrs:{href:"#mvcc如何解决不可重复读和幻读问题"}},[_._v("MVCC如何解决不可重复读和幻读问题")]),t("ul",[t("li",[t("a",{attrs:{href:"#快照读"}},[_._v("快照读")])]),t("li",[t("a",{attrs:{href:"#当前读"}},[_._v("当前读")])]),t("li",[t("a",{attrs:{href:"#mvcc的实现"}},[_._v("MVCC的实现")])])])])])]),t("p"),_._v(" "),t("h2",{attrs:{id:"什么是事务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是事务"}},[_._v("#")]),_._v(" 什么是事务")]),_._v(" "),t("p",[_._v("事务是逻辑上的一组操作，要么全执行，要么全不执行。")]),_._v(" "),t("h2",{attrs:{id:"事务的特性-acid"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#事务的特性-acid"}},[_._v("#")]),_._v(" 事务的特性（ACID）")]),_._v(" "),t("ol",[t("li",[_._v("原子性：事务最小的执行单位，不允许分割。事务的原子性确保动作要么全部执行，要么全部不执行。")]),_._v(" "),t("li",[_._v("一致性：执行事务的前后，数据保持一致。例如转账的业务中，无论事务是否成功，转账者和收款人的总额应该是不变的。")]),_._v(" "),t("li",[_._v("隔离性：并发访问数据库时，一个用户的事务不应该被其他事务所影响，各并发事务之间数据库是独立的。")]),_._v(" "),t("li",[_._v("持久性：一个事务被提交后，它对数据库中数据的改变是持久的，即使数据库发生故障也不应该对其有影响。")])]),_._v(" "),t("h2",{attrs:{id:"mysql的事物隔离级别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql的事物隔离级别"}},[_._v("#")]),_._v(" MySQL的事物隔离级别")]),_._v(" "),t("ol",[t("li",[_._v("在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。")]),_._v(" "),t("li",[_._v("事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。")]),_._v(" "),t("li",[_._v("事务用来管理 insert,update,delete 语句。")])]),_._v(" "),t("table",[t("thead",[t("tr",[t("th",[_._v("隔离级别")]),_._v(" "),t("th",[_._v("脏读")]),_._v(" "),t("th",[_._v("不可重复读")]),_._v(" "),t("th",[_._v("幻读")])])]),_._v(" "),t("tbody",[t("tr",[t("td",[_._v("读取未提交(RU)")]),_._v(" "),t("td",[_._v("是")]),_._v(" "),t("td",[_._v("是")]),_._v(" "),t("td",[_._v("是")])]),_._v(" "),t("tr",[t("td",[_._v("读取已提交(RC)")]),_._v(" "),t("td",[_._v("否")]),_._v(" "),t("td",[_._v("是")]),_._v(" "),t("td",[_._v("是")])]),_._v(" "),t("tr",[t("td",[_._v("可重复度(RR)")]),_._v(" "),t("td",[_._v("否")]),_._v(" "),t("td",[_._v("否")]),_._v(" "),t("td",[_._v("是")])]),_._v(" "),t("tr",[t("td",[_._v("串行化")]),_._v(" "),t("td",[_._v("否")]),_._v(" "),t("td",[_._v("否")]),_._v(" "),t("td",[_._v("否")])])])]),_._v(" "),t("h3",{attrs:{id:"读取未提交-read-uncommitted"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#读取未提交-read-uncommitted"}},[_._v("#")]),_._v(" 读取未提交(READ UNCOMMITTED)")]),_._v(" "),t("blockquote",[t("p",[_._v("事务A读取了事务B还未提交的数据")])]),_._v(" "),t("ol",[t("li",[_._v("如果B事物进行了回滚，此时A读到的数据就是脏数据，这种现象叫做"),t("strong",[_._v("脏读")])]),_._v(" "),t("li",[_._v("如果事务B又更新事务A读取的数据，那么事务A再次读取，读取到了事务B修改的结果，这种情况叫"),t("strong",[_._v("不可重复读")])]),_._v(" "),t("li",[_._v("如果事物B新增了数据，此时事务A再次读取，读到了事物B新增的数据，从而造成"),t("strong",[_._v("幻读")])])]),_._v(" "),t("h3",{attrs:{id:"读取已提交-read-committed"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#读取已提交-read-committed"}},[_._v("#")]),_._v(" 读取已提交（READ COMMITTED）")]),_._v(" "),t("blockquote",[t("p",[_._v("事务A读取了事务B已经提交的数据")])]),_._v(" "),t("ol",[t("li",[_._v("事务B更新了事物A读取到的数据，并且提交，当事物A再次读取时，就会读取到事物B更新的数据，产生"),t("strong",[_._v("不可重复读")])]),_._v(" "),t("li",[_._v("如果事物B新增了数据，此时事务A再次读取，读到了事物B新增的数据，从而造成"),t("strong",[_._v("幻读")])])]),_._v(" "),t("h3",{attrs:{id:"可重复读-repeatable-read"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#可重复读-repeatable-read"}},[_._v("#")]),_._v(" 可重复读（REPEATABLE READ）")]),_._v(" "),t("blockquote",[t("p",[_._v("InnoDB默认的隔离级别，事务A不会读取到事务B更新的数据，也不会读到事务B新增的数据")])]),_._v(" "),t("ol",[t("li",[_._v("可重复读不会出现脏读，不可重复读的问题，可能出现幻读（当使用当前读的时候就会读取到其他事物提交的数据）。")])]),_._v(" "),t("h2",{attrs:{id:"mvcc如何解决不可重复读和幻读问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mvcc如何解决不可重复读和幻读问题"}},[_._v("#")]),_._v(" MVCC如何解决不可重复读和幻读问题")]),_._v(" "),t("p",[_._v("MVCC是为了提高读-写并发处理能力，做到读-写冲突时不加锁。这里会引入两个锁的概念，一个是"),t("code",[_._v("当前读")]),_._v("，一个是"),t("code",[_._v("快照读")]),_._v("，MVCC使用的是"),t("code",[_._v("快照读")]),_._v("。")]),_._v(" "),t("h3",{attrs:{id:"快照读"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#快照读"}},[_._v("#")]),_._v(" 快照读")]),_._v(" "),t("ol",[t("li",[_._v("快照读的前提是非串行化的隔离级别，如果是串行化，则会变成当前读。")]),_._v(" "),t("li",[_._v("普通的select（不加锁）就是快照读，不会加锁，不阻塞。")])]),_._v(" "),t("h3",{attrs:{id:"当前读"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#当前读"}},[_._v("#")]),_._v(" 当前读")]),_._v(" "),t("ol",[t("li",[_._v("select lock in share mode(共享锁), select for update ; update, insert ,delete 这些操作都是当前读，读取到的数据是最新的，会对记录加锁。")])]),_._v(" "),t("h3",{attrs:{id:"mvcc的实现"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mvcc的实现"}},[_._v("#")]),_._v(" MVCC的实现")]),_._v(" "),t("p",[_._v("MVCC的实现是通过4个隐藏字段、undo log和Read View实现的")]),_._v(" "),t("ol",[t("li",[_._v("隐藏字段\n每行记录在存储数据的同时，会存在隐藏的字段：")])]),_._v(" "),t("ul",[t("li",[_._v("DB_ROW_ID：隐藏主键")]),_._v(" "),t("li",[_._v("DB_TRX_ID: 最新的一次修改对应的事物ID")]),_._v(" "),t("li",[_._v("DB_ROLL_PTR: 回滚指针，指向上一次修改的事物ID")]),_._v(" "),t("li",[_._v("DELETED_BIT: 删除flag")])]),_._v(" "),t("ol",{attrs:{start:"2"}},[t("li",[_._v("undo log\n记录了对数据增删改时的一些类似快照数据，分为"),t("code",[_._v("Insert undo log")]),_._v(","),t("code",[_._v("Update undo log")]),_._v(","),t("code",[_._v("Delete undo log")]),_._v(", 比如当前有一条刚刚被insert的记录：")])]),_._v(" "),t("ul",[t("li",[_._v("事物1修改这条数据，对这一行记录加锁，将当前行的DB_TRX_ID改为自己的事物ID，然后DB_ROLL_PTR指向insert时产生的undo log上，然后释放锁；")]),_._v(" "),t("li",[_._v("事物2修改这条记录，对这一行记录加锁，将当前行的DB_TRX_ID改为自己的事物ID，然后DB_ROLL_PTR指向事物1产生的undo log上，然后释放锁；")])]),_._v(" "),t("p",[_._v("这样就形成了一个版本链")]),_._v(" "),t("ol",{attrs:{start:"3"}},[t("li",[_._v("Read View\n事物进行快照读的时候产生的读视图，会记录事物在开始快照读之后还活跃的事物ids，还有up_limit_id（活跃事物中的最小事物id），low_limit_id（活跃事物中最大id的下一个事物id）。")])])])}),[],!1,null,null,null);t.default=e.exports}}]);
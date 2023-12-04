(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{324:function(t,e,a){"use strict";a.r(e);var r=a(7),_=Object(r.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"zookeeper选举机制"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#zookeeper选举机制"}},[t._v("#")]),t._v(" Zookeeper选举机制")]),t._v(" "),e("p",[t._v("Zookeeper为了保证各节点的协同，在工作时需要一个Leader，提供三种选举机制：")]),t._v(" "),e("ol",[e("li",[t._v("LeaderElection")]),t._v(" "),e("li",[t._v("AuthFastLeaderElection")]),t._v(" "),e("li",[t._v("默认采用FastLeaderElection算法")])]),t._v(" "),e("h2",{attrs:{id:"首先需要了解一些概念"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#首先需要了解一些概念"}},[t._v("#")]),t._v(" 首先需要了解一些概念")]),t._v(" "),e("h3",{attrs:{id:"_1-服务器id"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-服务器id"}},[t._v("#")]),t._v(" 1. 服务器ID")]),t._v(" "),e("p",[t._v("即myid，在服务器配置参数中配置，myid越大，选举权重越大")]),t._v(" "),e("h3",{attrs:{id:"_2-选举状态"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-选举状态"}},[t._v("#")]),t._v(" 2. 选举状态")]),t._v(" "),e("p",[t._v("选举过程中有4种状态")]),t._v(" "),e("ol",[e("li",[t._v("LOOKING（竞选状态），启动时默认的状态")]),t._v(" "),e("li",[t._v("FOLLOWING（随从状态），同步Leader状态，参与投票")]),t._v(" "),e("li",[t._v("OBSERVING（观察状态），同步Leader状态，不参与投票")]),t._v(" "),e("li",[t._v("LEADING（领导者状态），选举生出的状态")])]),t._v(" "),e("h3",{attrs:{id:"_3-数据id"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-数据id"}},[t._v("#")]),t._v(" 3. 数据ID")]),t._v(" "),e("p",[t._v("Zookeeper服务器中的数据版本号，值越大说明数据最新，所以权重也越高")]),t._v(" "),e("h3",{attrs:{id:"_4-逻辑时钟"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_4-逻辑时钟"}},[t._v("#")]),t._v(" 4. 逻辑时钟")]),t._v(" "),e("p",[t._v("用来判断多个投票是否在同一轮选举周期中，该值在服务端是一个自增序列，每次进入新一轮的投票后，都会对该值进行加1操作。")])])}),[],!1,null,null,null);e.default=_.exports}}]);
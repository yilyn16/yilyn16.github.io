[[toc]]

# Flink CDC

<a href=" ">官方文档</a >

## 什么是CDC

CDC是Change Data Capture（变更数据获取）的简称。核心思想是，监测并捕获数据库的变动（包括数据或数据表的插入、更新以及删除等），将这些变更按发生的顺序完整记录下来，写入到消息中间件中以供其他服务进行订阅及消费。

![flink解析](/images/flink/WX20230316-102545%402x.png)

mysql同步原理

![mysql同步原理](/images/flink/flink-cdc-streaming-etl.png)

### 优势

1. 支持丰富的数据源，已经支持MySQL、MariaDB、PG、Oracle、MongoDB；Oceanbase、TiDB、SQLServer也已经在规划中；
2. Flink CDC 的下游则更加丰富，支持写入 Kafka、Pulsar 消息队列，也支持写入 Hudi、Iceberg 等数据湖，还支持写入各种数据仓库；
3. Flink DataStream API支持用户自定义逻辑，可以由用户根据自身业务情况自由实现；
4. Flink CDC支持将表的全增量数据同步。

### 特性

#### 1. 通过增量快照读取算法，实现了无锁读取，并发读取，断点续传等功能

增量快照读取算法的核心思路就是在全量读取阶段把表分成一个个 chunk 进行并发读取，在进入增量阶段后只需要一个 task 进行单并发读取 binlog 日志，在全量和增量自动切换时，通过无锁算法保障一致性。

#### 2. 设计上对入湖友好，提升了 CDC 数据入湖的稳定性

Flink CDC 2.0 设计之初考虑了数据湖场景，是一种流式入湖友好的设计。设计上将全量数据进行分片，Flink CDC 可以将 checkpoint 粒度从表粒度优化到 chunk 粒度，大大减少了数据湖写入时的 Buffer 使用，对数据湖写入更加友好。

#### 3. 支持异构数据源的融合，能方便地做 Streaming ETL的加工

Flink CDC 区别于其他数据集成框架的一个核心点，就是在于 Flink 提供的流批一体计算能力。这使得 Flink CDC 成为了一个完整的 ETL 工具，不仅仅拥有出色的 E 和 L 的能力，还拥有强大的 Transformation 能力。

#### 4. 支持分库分表合并入湖

在分库分表的数据结构下，Flink CDC也能轻松支持，通过对database-name、table-name 使用正则表达式来匹配这些表。

## 基于DataStream API的demo

Flink CDC同步数据有两种方式，一种是使用flink Sql，一种是依赖DataStream API，下面使用DataStream API的方式模拟Mysql数据同步到ES的过程。

1. Mysql创建user表（mysq版本5.7）

```sql
CREATE TABLE `user` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `birthday` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `height` double DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

2. ES创建user索引（我这里使用的ES版本是7.6.2）

```json
PUT /user
{
    "mappings": {
        "properties": {
            "id": {
                "type": "long"
            },
            "name": {
              "type": "keyword"
          },
            "birthday": {
                "type": "date",
                "format": "yyyy-MM-dd HH:mm:ss"
            },
            "heidht": {
                "type": "double"
            }
        }
    }
}
```

3. 首先确定读取到数据之后是一个json字符串，格式如下：
```json
{
    "before": {
        "id": 1,
        "name": "a",
        "birthday": 1233230400000,
        "height": 1.68
    },
    "after": {
        "id": 1,
        "name": "asan",
        "birthday": 1678979090000,
        "height": 1.68
    },
    "source": {
        "version": "1.6.4.Final",
        "connector": "mysql",
        "name": "mysql_binlog_source",
        "ts_ms": 1678950290000,
        "snapshot": "false",
        "db": "yilyn",
        "sequence": null,
        "table": "user",
        "server_id": 1,
        "gtid": null,
        "file": "mysql-bin.000001",
        "pos": 10166,
        "row": 0,
        "thread": null,
        "query": null
    },
    "op": "u",
    "ts_ms": 1678950290663,
    "transaction": null
}
```

4. 构建普通maven项目，添加依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-connector-base</artifactId>
        <version>${flink.version}</version>
    </dependency>
    <dependency>
        <groupId>com.ververica</groupId>
        <artifactId>flink-sql-connector-mysql-cdc</artifactId>
        <version>2.3.0</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-streaming-java_2.12</artifactId>
        <version>${flink.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-clients_2.12</artifactId>
        <version>${flink.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-runtime-web_2.12</artifactId>
        <version>${flink.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-table-runtime_2.12</artifactId>
        <version>${flink.version}</version>
    </dependency>
    <dependency>
        <groupId>org.apache.flink</groupId>
        <artifactId>flink-connector-elasticsearch7_2.12</artifactId>
        <version>1.14.6</version>
    </dependency>

    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.2.11</version>
    </dependency>
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-api</artifactId>
        <version>1.7.36</version>
    </dependency>
</dependencies>
```

5. 启动入口和环境配置

```java
import com.ververica.cdc.connectors.mysql.source.MySqlSource;
import com.yilyn.flink.builder.Es7SinkBuilder;
import com.yilyn.flink.function.filter.Es7FilterFunction;
import com.yilyn.flink.function.map.Es7MapFunction;
import com.yilyn.flink.serialize.MysqlSourceData;
import com.yilyn.flink.serialize.MysqlSourceSerialization;
import org.apache.flink.api.common.eventtime.WatermarkStrategy;
import org.apache.flink.configuration.Configuration;
import org.apache.flink.configuration.RestOptions;
import org.apache.flink.streaming.api.environment.StreamExecutionEnvironment;

public class DataSyncMain {

    public static void main(String[] args) throws Exception {
        //数据源
        MySqlSource<MysqlSourceData> source = MySqlSource.<MysqlSourceData>builder() //MysqlSourceData是自定义数据
                .hostname("127.0.0.1")
                .port(3306)
                .databaseList("yilyn") //数据库
                .tableList("yilyn.user") //表名，必须是 数据库.表名
                .username("root")
                .password("root")
                //MysqlSourceSerialization实现DebeziumDeserializationSchema，从而自定义反序列化成MysqlSourceData
                .deserializer(new MysqlSourceSerialization())
                .includeSchemaChanges(true) //捕获表结构的变化
                .build();

        //配置环境 包括web
        Configuration configuration = new Configuration();
        configuration.setInteger(RestOptions.PORT, 8081); //可以通过该端口访问webUI
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment(configuration);

        //检查点
        env.enableCheckpointing(60000);

        //默认处理流程
//        DataStreamSink<String> sink = env.fromSource(source, WatermarkStrategy.noWatermarks(), "MySQL Source")
//                .setParallelism(4) // 设置4个并行源任务
//                .print() // 默认sink
//                .setParallelism(1); // 对接收器使用并行度 1 以保持消息顺序

        //自定义数据流处理
        env.fromSource(source, WatermarkStrategy.noWatermarks(), "MySQL Source") //创建数据流
                .filter(new Es7FilterFunction()).name("esFilter") //增加filter,对数据过滤
                .map(new Es7MapFunction()).name("esMap") //将源数据转换为目标map
                .addSink(Es7SinkBuilder.build()).name("esSink"); //将组装好的map，交给sink目标进行写入

        //启动环境
        env.execute();

    }

}
```

6. MysqlSourceData的实现，根据自身情况设置属性即可

```java
import java.io.Serializable;
import java.util.Map;

public class MysqlSourceData implements Serializable {

    //数据主键
    private String id;
    //操作标识
    private String op;
    //before
    private Map<String, Object> before;
    //after
    private Map<String, Object> after;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOp() {
        return op;
    }

    public void setOp(String op) {
        this.op = op;
    }

    public Map<String, Object> getBefore() {
        return before;
    }

    public void setBefore(Map<String, Object> before) {
        this.before = before;
    }

    public Map<String, Object> getAfter() {
        return after;
    }

    public void setAfter(Map<String, Object> after) {
        this.after = after;
    }
}
```

7. MysqlSourceSerialization实现自定义格式的数据反序列化

```java
import com.ververica.cdc.connectors.shaded.org.apache.kafka.connect.data.Field;
import com.ververica.cdc.connectors.shaded.org.apache.kafka.connect.data.Struct;
import com.ververica.cdc.connectors.shaded.org.apache.kafka.connect.source.SourceRecord;
import com.ververica.cdc.debezium.DebeziumDeserializationSchema;
import com.yilyn.flink.enums.DataFieldType;
import com.yilyn.flink.utils.DateTimeUtil;
import org.apache.flink.api.common.typeinfo.TypeInformation;
import org.apache.flink.util.Collector;

import java.util.HashMap;
import java.util.Map;


public class MysqlSourceSerialization implements DebeziumDeserializationSchema<MysqlSourceData> {

    //可以按配置的方式
    public static final Map<String, DataFieldType> dataFormat = new HashMap<>();
    static {
        dataFormat.put("id", DataFieldType.Long);
        dataFormat.put("name", DataFieldType.String);
        dataFormat.put("birthday", DataFieldType.DateTimeStr);
        dataFormat.put("height", DataFieldType.Double);
    }

    @Override
    public void deserialize(SourceRecord sourceRecord, Collector<MysqlSourceData> collector) throws Exception {
        MysqlSourceData mysqlSourceData = new MysqlSourceData();
        Struct value = (Struct) sourceRecord.value();
        mysqlSourceData.setOp(value.getString("op"));
        Struct before = (Struct) value.get("before");
        if (before != null) {
            Map<String, Object> beforeMap = genDataMap(before);
            mysqlSourceData.setBefore(beforeMap);
            mysqlSourceData.setId(String.valueOf(beforeMap.get("id")));
        }
        Struct after = (Struct) value.get("after");
        if (after != null) {
            Map<String, Object> afterMap = genDataMap(after);
            mysqlSourceData.setAfter(afterMap);
            mysqlSourceData.setId(String.valueOf(afterMap.get("id")));
        }
        collector.collect(mysqlSourceData);
    }

    @Override
    public TypeInformation<MysqlSourceData> getProducedType() {
        return TypeInformation.of(MysqlSourceData.class);
    }

    private Map<String, Object> genDataMap(Struct data) {
        Map<String, Object> dataMap = new HashMap<>();
        for (Field field : data.schema().fields()) {
            if (dataFormat.containsKey(field.name())) {
                dataMap.put(field.name(), transform(field.name(), data));
            }
        }
        return dataMap;
    }

    private Object transform(String key, Struct data) {
        DataFieldType fieldType = dataFormat.get(key);
        switch (fieldType) {
            case DateTimeStr:
                return DateTimeUtil.getDateTimeStr((Long) data.get(key));
        }
        return data.get(key);
    }
}
```

8. Es7FilterFunction，自定义filter，按自身要求对捕获到的数据进行过滤

```java
import com.yilyn.flink.enums.OpeEnum;
import com.yilyn.flink.serialize.MysqlSourceData;
import org.apache.flink.api.common.functions.RichFilterFunction;

public class Es7FilterFunction extends RichFilterFunction<MysqlSourceData> {
    @Override
    public boolean filter(MysqlSourceData data) {
        String op = data.getOp();
        //只对增、删、改操作进行处理
        return OpeEnum.C.opt.equalsIgnoreCase(op)
                || OpeEnum.D.opt.equalsIgnoreCase(op)
                || OpeEnum.U.opt.equalsIgnoreCase(op);
        /* OpeEnum内容如下：
        C("c", "新增"),
        U("u", "修改"),
        D("d", "删除"),
        ;

        public String opt;
        public String desc;
        */
    }
}
```

9. Es7MapFunction 对数据源进行Tuple的映射

+ Tuple 是flink 一个很特殊的类型（元组类型），是一个抽象类，共26个Tuple子类继承Tuple 他们是 Tuple0一直到Tuple25。
+ Tuple后的数字，代表每一个元组中可用空间（理解为插槽也行，每个字段对应一个插槽）

```java
import com.yilyn.flink.serialize.MysqlSourceData;
import org.apache.flink.api.common.functions.RichMapFunction;
import org.apache.flink.api.java.tuple.Tuple3;

import java.util.Map;

public class Es7MapFunction extends RichMapFunction<MysqlSourceData, Tuple3<String, String, Map<String, Object>>> {

    @Override
    public Tuple3<String, String, Map<String, Object>> map(MysqlSourceData data) {
        Tuple3<String, String, Map<String, Object>> tuple3 = new Tuple3<>();
        tuple3.f0 = data.getOp(); //存放op
        tuple3.f1 = data.getId(); //存放id
        tuple3.f2 = data.getAfter(); //存放afterMap
        return tuple3;
    }
}
```

10. Es7SinkBuilder构建ElasticsearchSink

```java
import com.yilyn.flink.failure.Es7FailureHandler;
import com.yilyn.flink.function.sink.Es7SinkFunction;
import org.apache.flink.streaming.connectors.elasticsearch.ElasticsearchSinkBase;
import org.apache.flink.streaming.connectors.elasticsearch.ElasticsearchSinkFunction;
import org.apache.flink.streaming.connectors.elasticsearch7.ElasticsearchSink;
import org.apache.http.HttpHost;
import org.apache.http.impl.client.BasicCredentialsProvider;

import java.util.ArrayList;
import java.util.List;

public class Es7SinkBuilder {

    //这里可以将配置的形式抽取到properties文件中
    private static final String host = "127.0.0.1";
    private static final Integer port = 9200;

    public static <T> ElasticsearchSink<T> build() {
        List<HttpHost> httpHosts = new ArrayList<>();
        httpHosts.add(new HttpHost(host, port, "http"));
        ElasticsearchSink.Builder<T> esSinkBuilder = new ElasticsearchSink.Builder<T>(httpHosts, (ElasticsearchSinkFunction<T>) new Es7SinkFunction());

        esSinkBuilder.setRestClientFactory(restClientBuilder -> {
                    restClientBuilder.setHttpClientConfigCallback(httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(new BasicCredentialsProvider()));
                    restClientBuilder.setRequestConfigCallback((c) -> {
                        c.setConnectTimeout(30000);
                        c.setSocketTimeout(30000);
                        c.setConnectionRequestTimeout(30000);
                        return c;
                    });
                }
        );

        esSinkBuilder.setBulkFlushBackoff(true);
        esSinkBuilder.setBulkFlushMaxActions(10000);
        esSinkBuilder.setBulkFlushInterval(5000);
        esSinkBuilder.setBulkFlushMaxSizeMb(25);
        esSinkBuilder.setBulkFlushBackoffDelay(100);
        esSinkBuilder.setBulkFlushBackoffRetries(5);
        esSinkBuilder.setBulkFlushBackoffType(ElasticsearchSinkBase.FlushBackoffType.CONSTANT);
        esSinkBuilder.setFailureHandler(new Es7FailureHandler());
        return esSinkBuilder.build();
    }
}
```

11. Es7SinkFunction，目标Sink写入

```java
import org.apache.flink.api.common.functions.RuntimeContext;
import org.apache.flink.api.java.tuple.Tuple3;
import org.apache.flink.streaming.connectors.elasticsearch.ElasticsearchSinkFunction;
import org.apache.flink.streaming.connectors.elasticsearch.RequestIndexer;
import org.elasticsearch.action.ActionRequest;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.update.UpdateRequest;

import java.util.Map;

public class Es7SinkFunction implements ElasticsearchSinkFunction<Tuple3<String, String, Map<String, Object>>> {

    private ActionRequest buildIndexRequest(Tuple3<String, String, Map<String, Object>> stringMapMapTuple3, String index) {

        String opt = stringMapMapTuple3.f0;
        String id = stringMapMapTuple3.f1;
        Map<String, Object> after = stringMapMapTuple3.f2;

        if ("c".equalsIgnoreCase(opt)) {
            IndexRequest indexRequest = new IndexRequest();
            indexRequest.index(index);
            indexRequest.id(id);
            indexRequest.source(after);
            return indexRequest;
        }
        if ("d".equalsIgnoreCase(opt)) {
            DeleteRequest indexRequest = new DeleteRequest();
            indexRequest.index(index);
            indexRequest.id(id);
            return indexRequest;
        }

        if ("u".equalsIgnoreCase(opt)) {
            UpdateRequest request = new UpdateRequest();
            request.index(index);
            request.id(id);
            request.doc(after);
            return request;
        }
        return null;
    }

    @Override
    public void process(Tuple3<String, String, Map<String, Object>> stringMapMapTuple3, RuntimeContext runtimeContext, RequestIndexer requestIndexer) {
        ActionRequest actionRequest = buildIndexRequest(stringMapMapTuple3, "user");
        if (actionRequest != null) {
            //写入目标es
            requestIndexer.add(actionRequest);
        }
    }
}
```

12. 启动main方法，通过对user表数据增、删、改的操作，可以实现数据同步。
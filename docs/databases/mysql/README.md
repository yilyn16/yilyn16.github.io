# MySQL

![MySQL架构](/images/databases/MySQL架构.png)

-- 最大连接数
SHOW VARIABLES LIKE 'max_connections';

-- 设置最大连接数，Mysql重启后就会失效
SET GLOBAL max_connections = 500;
-- 永久有效的方法：修改my.cnf文件，在该文件中设置max_connections = 500，然后重启mysql服务即可生效

-- 查看当前连接数
show global status like 'Max_used_connections';

-- 单次最大数据报文
SHOW VARIABLES LIKE 'max_allowed_packet';
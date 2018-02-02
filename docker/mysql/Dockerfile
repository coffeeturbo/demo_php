FROM mysql

ADD init.sh /docker-entrypoint-initdb.d/
ADD jet.cnf /etc/mysql/conf.d/
RUN chmod 0644 /etc/mysql/conf.d/jet.cnf 

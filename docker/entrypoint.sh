#!/bin/bash
###
 # @Author: yangxiaofeng
 # @Date: 2023-11-06 11:21:11
 # @LastEditors: yangxiaofeng
 # @LastEditTime: 2023-12-13 10:39:32
 # @FilePath: /jxrt-frontend-image-service/docker/entrypoint.sh
 # @Description: 
### 

logs_root="/mnt/logs/${APP_NAME}"

export NODE_ENV=$PRODUCT_ENV

[ -d $logs_root ] || mkdir -p $logs_root

node --version
echo `date` && node /app/main.js
# echo `date` && pm2-docker start pm2.json

# echo `date` && pm2 install pm2-intercom && pm2-docker start pm2.json
# echo "`date` start index.js env ${NODE_ENV}"
# forever -a index.js
# forever -l $logs_root/forever.log -o $logs_root/out.log -e $logs_root/err.log -a index.js

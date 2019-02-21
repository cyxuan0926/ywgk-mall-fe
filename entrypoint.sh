#!/bin/bash
if [ $NGINX_DEPLOY_CONTEXT ];then
  cd /usr/share/nginx/html/static/config
  \cp conf-$NGINX_DEPLOY_CONTEXT.js conf.js
fi

exec "$@"
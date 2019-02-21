FROM nginx:alpine
EXPOSE 80
ENV NGINX_DEPLOY_CONTEXT development
COPY nginx/default.conf /etc/nginx/conf.d/
COPY dist/ /usr/share/nginx/html/
COPY entrypoint.sh /
CMD ["nginx", "-g", "daemon off;"]
ENTRYPOINT ["sh","/entrypoint.sh"]
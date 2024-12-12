# Use a lightweight web server as base image
FROM nginx:alpine

# Copy our static files to the nginx html directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY fonts/ /usr/share/nginx/html/fonts/

# Expose port 80
EXPOSE 80

# nginx will start automatically, no need for CMD 
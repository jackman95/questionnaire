# REACT QUESTIONNNAIRE

## HOW TO INSTALL ON SERVER:

1. **Install modules**
    - Open terminal in the folder where you have the `src and public` file.
    - Run: `npm install --legacy-peer-deps`
        
2. **Create build for server**
    - In terminal, run `npm run build`

3. **Upload on server**
    - Upload `build` folder to the root on your server.

4. **Nginx settings on linux server**
    - To the config file Nginx on the server past following code: 

    ```
    server {
          listen 80;  # last 2 digits of your port
          server_name your_domain.com;  # change your domain name

          root /path/to/your/web/root;  # change your path to the app root on server
          index index.html;

          location / {
              try_files $uri $uri/ /index.html;  # location where public/index.html is located
          }
      }
      ```
    - Don't forget to rewrite important links
    - Restart Nginx

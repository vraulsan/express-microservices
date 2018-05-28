# Express Microservices

This is a sample microservices application.

**Services:**
- Gateway
- Spark
- Web
- Mongo

![visio](https://i.imgur.com/VO36vrl.png)

**Instructions**
```
git clone https://github.com/vraulsan/express-microservices.git
ngrok http 3001
```
Edit the `.env` file with your ngrok URL and your Spark bot token.

Make sure you have [docker-compose](https://docs.docker.com/compose/install/#install-compose) installed with `docker-compose -v`

Launch the containers:
```
docker-compose up
```

Got to http://localhost to access the web interface.
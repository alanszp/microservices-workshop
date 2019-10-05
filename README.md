# microservices-workshop

En este workshop vamos a explorar los pros & cons de los MicroServicios

[🎯 Presentación](./presentation)

[🤹‍♀️ Edge API Docs](./calculator/edge-doc)

[⚒ Executors API Docs](./calculator/executors-doc)

[📝 Features a implementar](./features)


# Como levantar la app con docker

```sh
cd calculator/edge-api
docker build -t workshop . 
docker run workshop -p 9443:9443 start development
```
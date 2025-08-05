npm init -y
npm install express

# Crear tarea
curl -X POST http://localhost:3001/tareas -H "Content-Type: application/json" -d '{"titulo": "Aprender DevOps"}'
# Obtener todas
curl http://localhost:3001/tareas
# Actualizar
curl -X PUT http://localhost:3001/tareas/1 -H "Content-Type: application/json" -d '{"completada": true}'
# Eliminar
curl -X DELETE http://localhost:3001/tareas/1
# Obtener la tarea con ID 1
curl http://localhost:3001/tareas/1


# Crear y correr el contenedor

# Construir la imagen:
docker build -t mi-crud-app .

# Ejecutar el contenedor:
docker run -p 3001:3001 mi-crud-app-reto

https://hub.docker.com/


# Commandos kubernetes


kubectl apply -f k8s-deployment.yaml
kubectl apply -f k8s-service.yaml

# Crear tarea
curl -X POST http://localhost:30080/tareas -H "Content-Type: application/json" -d '{"titulo": "Aprender DevOps"}'
# Obtener todas
curl http://localhost:30080/tareas
# Actualizar
curl -X PUT http://localhost:30080/tareas/1 -H "Content-Type: application/json" -d '{"completada": true}'
# Eliminar
curl -X DELETE http://localhost:30080/tareas/1
# Obtener la tarea con ID 1
curl http://localhost:30080/tareas/1

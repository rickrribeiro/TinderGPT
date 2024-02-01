# docker build ./api -t tindergpt-api:1.0
# docker build ./front -t tindergpt-front:1.0

# docker run --name tinderfront -d -p 3000:3000 tindergpt-front:1.0
# docker run --name tinderapi -d -p 3001:3001 tindergpt-api:1.0

docker-compose up -d
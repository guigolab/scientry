# Deployment Guide

This guide covers deploying SCIENTRY to both development and production environments, including proper configuration and setup.

## Prerequisites

- Docker and Docker Compose installed
- Git for cloning the repository
- Domain name (for production)
- SSL certificate (for production)

## Environment Configuration

### .env File Setup

Create a `.env` file in the root directory with the following variables:

```bash
# Database Configuration
DB_NAME=my-db
DB_USER=db-user
DB_PASS=db-password

# MongoDB Root Configuration
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root
MONGO_INITDB_DATABASE=admin

# MongoDB Data and Log Directories
MONGODB_DATA_DIR=/var/lib/mongodb-data
MONGODB_LOG_DIR=/dev/null

# Service Names (Docker Compose)
DB_HOST=LIMS_DB
DB_PORT=27017
API_HOST=lims_server
API_PORT=80

# Application Configuration
APP_NAME=LIMS
PROCESSES=4
THREADS=2

# Security
JWT_SECRET_KEY=your-secret-key-here

# Application Paths
BASE_PATH=/scientry
FILES_FOLDER=files
```

### Environment Variables Explanation

#### Database Configuration
- **DB_NAME**: Name of the database to use
- **DB_USER**: Database user for application access. This will
- **DB_PASS**: Database password for application access

##### When the app is launched the first time a user will be created using DB_USER AND DB_PASS

#### MongoDB Root Configuration
- **MONGO_INITDB_ROOT_USERNAME**: Root username for MongoDB
- **MONGO_INITDB_ROOT_PASSWORD**: Root password for MongoDB
- **MONGO_INITDB_DATABASE**: Initial database name

#### Service Configuration
- **DB_HOST**: Docker service name for the database
- **DB_PORT**: MongoDB port (default: 27017)
- **API_HOST**: Docker service name for the API server
- **API_PORT**: Port for the API server

#### Application Settings
- **APP_NAME**: Application name
- **PROCESSES**: Number of worker processes
- **THREADS**: Number of threads per process

#### Security
- **JWT_SECRET_KEY**: Secret key for JWT token generation

#### Paths
- **BASE_PATH**: Base URL path for the application (e.g., `/scientry` for `https://domain.com/scientry`)
- **FILES_FOLDER**: Directory where uploaded files will be stored

## Development Deployment

### Using docker-compose-DEV.yml

The development configuration uses local builds and volume mounts for hot reloading.

#### 1. Clone and Setup

```bash
git clone https://github.com/your-repo/lims.git
cd lims
```

#### 2. Configure .env for Development

```bash
# Database Configuration
DB_NAME=lims_dev
DB_USER=dev_user
DB_PASS=dev_password

# MongoDB Root Configuration
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=root
MONGO_INITDB_DATABASE=admin


DB_HOST=LIMS_DB
DB_PORT=27017
API_HOST=lims_server
API_PORT=80

# Application Configuration
APP_NAME=LIMS
PROCESSES=1
THREADS=1

# Security
JWT_SECRET_KEY=dev-secret-key

# Application Paths
BASE_PATH=
FILES_FOLDER=files
```

#### 3. Start Development Environment

```bash
# Start all services
docker-compose -f docker-compose-DEV.yml up -d

# View logs
docker-compose -f docker-compose-DEV.yml logs -f

# Stop services
docker-compose -f docker-compose-DEV.yml down
```

#### 4. Development Features

- **Hot Reloading**: Code changes are automatically reflected
- **Volume Mounts**: Local files are mounted into containers
- **Debug Ports**: Services are exposed on local ports
- **Development Database**: Separate database for development

### Development Docker Compose Configuration

The `docker-compose-DEV.yml` file includes:

```yaml
version: '3'

services:
  lims_db:
    image: mongo
    container_name: "${DB_HOST}"
    env_file:
      - .env
    volumes:
     - ./mongo-init.sh:/docker-entrypoint-initdb.d/mongo-init.sh
     - mongodb-data:/var/lib/mongodb-data
    ports:
      - "27013:${DB_PORT}"

  lims_server:
    build: ./server
    container_name: "${API_HOST}"
    restart: always
    ports:
     - 5010:5000
    volumes:
      - ./server:/server
      - ./project-spec.json:/server/project-spec.json
      - ./files:/server/files
    env_file:
      - .env

  lims_client:
    build:
      context: ./client
      dockerfile: Dockerfile
      args:
        - BASE_PATH=$BASE_PATH
    container_name: "lims_client"
    restart: always
    volumes:
      - node_modules:/client/node_modules
    environment:
      - API_PORT=${API_PORT}
      - API_HOST=${API_HOST}
      - BASE_PATH=${BASE_PATH}
    ports:
        - "93:${API_PORT}"

volumes:
  mongodb-data:
  node_modules:
```

## Production Deployment

### Using docker-compose.yml

The production configuration uses pre-built images and optimized settings.

#### 1. Server Setup

```bash
git clone https://github.com/your-repo/lims.git
cd lims
```

#### 2. Configure .env for Production

```bash
# Database Configuration
DB_NAME=lims_prod
DB_USER=prod_user
DB_PASS=strong_production_password

# MongoDB Root Configuration
MONGO_INITDB_ROOT_USERNAME=root
MONGO_INITDB_ROOT_PASSWORD=strong_root_password
MONGO_INITDB_DATABASE=admin

# MongoDB Data and Log Directories
MONGODB_DATA_DIR=/data/lims-data
MONGODB_LOG_DIR=/var/log/mongodb

# Service Names
DB_HOST=LIMS_DB
DB_PORT=27017
API_HOST=lims_server
API_PORT=80

# Application Configuration
APP_NAME=LIMS
PROCESSES=4
THREADS=2

# Security
JWT_SECRET_KEY=very-strong-production-secret-key

# Application Paths
BASE_PATH=/lims
FILES_FOLDER=files
```

#### 3. Production Docker Compose Configuration

The `docker-compose.yml` file includes:

```yaml
version: '3'

services:
  lims_db:
    image: mongo:6.0
    container_name: "${DB_HOST}"
    env_file:
      - .env
    volumes:
     - /data/lims-data:/data/db
     - ./mongo-init.sh:/docker-entrypoint-initdb.d/mongo-init.sh
    ports:
      - "27013:${DB_PORT}"
    networks:
      - monstre

  lims_server:
    image: gitlab.linux.crg.es:5005/monstre/lims/lims_server
    container_name: ${API_HOST}
    restart: always
    volumes:
      - ./project-spec.json:/server/project-spec.json
      - /data/lims-files:/server/files
    env_file:
      - .env
    networks:
      - monstre

  lims_client:
    image: gitlab.linux.crg.es:5005/monstre/lims/lims_client
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.lims_client.rule=Host(`genome.crg.es`) && PathPrefix(`/lims`)"
      - "traefik.http.routers.lims_client.tls=true"
      - "traefik.http.routers.lims_client.entrypoints=web_https"
      - "traefik.http.services.lims_client.loadBalancer.server.port=80"
    environment:
      - API_PORT=${API_PORT}
      - API_HOST=${API_HOST}
      - BASE_PATH=${BASE_PATH}
    networks:
      - monstre

networks:
  monstre:
    external:
      name: monstre
```

#### 4. Start Production Environment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 5. Reverse Proxy Setup (Nginx)

For production without Traefik, create an Nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Frontend
    location /lims {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # API
    location /lims/api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 6. SSL Certificate

For production, use Let's Encrypt:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Documentation Deployment (GitHub Pages)

### 1. Build the Documentation

```bash
cd docs
npm run docs:build
```

This creates a `dist` directory with the built documentation.

### Getting Help

For deployment issues:

1. **Check the logs**: `docker-compose logs` or `docker-compose -f docker-compose-DEV.yml logs`
2. **Review configuration**: Verify .env file and Docker Compose files
3. **Check documentation**: Review the [User Guide](/user-guide/) for application usage
4. **Contact support**: emilio.righi@crg.eu

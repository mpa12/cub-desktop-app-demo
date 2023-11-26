# Проект для КУБ 2.0

## Стэк

- Python 3.10
- React 18
- Bootstrap 5.3.2
- Node 20.9.0
- Yarn 1.22.19
- Docker
- Docker-compose
- Nginx
- Gunicorn
- PostgreSQL
- Celery
- Redis

## Инструкция по развертыванию

Создать `.env` из `.env.example` в директории `cub`.

Создать `.env` из `.env.example` в директории `frontend`.

Запуск проекта через docker:

в корне проекта

```shell
docker-compose up --build
```
## Создать superuser в контейнере
```shell
docker ps
docker exec -it <id контейнера с джангой> bash
python manage.py createsuperuser
```

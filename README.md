# Проект для КУБ 27

## Стэк

- Python 3.10
- React 18
- Bootstrap 5.3.2
- Node 20.9.0
- Yarn 1.22.19

## Инструкция по развертыванию

Создать .env из .env.example в директории `frontend`.

Установка зависимостей:

```shell
pip install -r requirements.txt
```
```shell
( cd frontend/src/ && yarn install )
```

Запуск миграций:

```shell
python ./cub/manage.py migrate
```

Запуск приложения:

```shell
python ./cub/manage.py runserver
```
```shell
( cd frontend/src/ && yarn start )
```

Админка доступна по адресу http://localhost:8000/admin/

Запуск бота:

```shell
python ./cub/manage.py bot
```
## ERD модель базы данных

![db.png](..%2F..%2F%D0%97%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B8%2Fdb.png)
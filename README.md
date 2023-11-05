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

Запуск приложения:

```shell
python ./cub/manage.py runserver
```
```shell
( cd frontend/src/ && yarn start )
```

Запуск бота:

```shell
python ./cub/manage.py bot
```

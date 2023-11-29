# Generated by Django 4.2.6 on 2023-11-29 13:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BotFAQ',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=255, verbose_name='Вопрос')),
                ('answer', models.CharField(blank=True, max_length=255, null=True, verbose_name='Ответ')),
                ('file', models.FileField(blank=True, null=True, upload_to='bot_files/', verbose_name='Файл')),
            ],
            options={
                'verbose_name': 'Вопрос-ответ',
                'verbose_name_plural': 'Вопросы-ответы',
            },
        ),
    ]

# Generated by Django 4.2.6 on 2023-11-25 13:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0012_alter_taskcomment_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='comments',
            field=models.ManyToManyField(blank=True, null=True, related_name='task_comments', to='tasks.taskcomment', verbose_name='Комментарии'),
        ),
        migrations.AlterField(
            model_name='taskcomment',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2023, 11, 25, 13, 0, 44, 401570, tzinfo=datetime.timezone.utc), null=True, verbose_name='Дата'),
        ),
    ]

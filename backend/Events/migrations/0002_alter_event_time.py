# Generated by Django 5.0.4 on 2024-04-26 21:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='time',
            field=models.CharField(max_length=200),
        ),
    ]

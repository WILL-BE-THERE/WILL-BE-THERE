# Generated migration file
from django.db import migrations, models
from django.utils import timezone


class Migration(migrations.Migration):

    dependencies = [
        ('Events', '0006_remove_event_accountname_remove_event_accountnumber_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=timezone.now, help_text='Timestamp when event was created'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='event',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, help_text='Timestamp when event was last updated'),
        ),
    ]

# Generated migration file
from django.db import migrations, models
from django.utils import timezone


class Migration(migrations.Migration):
    dependencies = [
        ("userProfile", "0005_alter_userprofile_verification_code"),
    ]

    operations = [
        migrations.AddField(
            model_name="userprofile",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True,
                default=timezone.now,
                help_text="Timestamp when profile was created",
            ),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name="userprofile",
            name="updated_at",
            field=models.DateTimeField(
                auto_now=True, help_text="Timestamp when profile was last updated"
            ),
        ),
    ]

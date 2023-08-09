import coreapi
import coreschema

from rest_framework.schemas import ManualSchema

LoginSchema = ManualSchema(fields=[
        coreapi.Field(
            "email",
            required=True,
            location="form",
            schema=coreschema.String()
        ),
        coreapi.Field(
            "password",
            required=True,
            location="form",
            schema=coreschema.String()
        ),
    ])


ResetPasswordEmailSchema = ManualSchema(fields=[
        coreapi.Field(
            "email",
            required=True,
            location="form",
            schema=coreschema.String()
        )
])


ConfirmPasswordLinkSchema = ManualSchema(fields=[
        coreapi.Field(
            "uidb64",
            required=True,
            location="path",
            schema=coreschema.String()
        ),
        coreapi.Field(
            "token",
            required=True,
            location="path",
            schema=coreschema.String()
        ),
    ])


ResetPasswordSchema = ManualSchema(fields=[
        coreapi.Field(
            "password",
            required=True,
            location="form",
            schema=coreschema.String()
        ),
        coreapi.Field(
            "confirm_password",
            required=True,
            location="form",
            schema=coreschema.String()
        ),
    ])


UpdatePasswordSchema = ManualSchema(fields=[
        coreapi.Field(
            "old_password",
            required=True,
            location="form",
            schema=coreschema.String()
        ),
        coreapi.Field(
            "new_password",
            required=True,
            location="form",
            schema=coreschema.String()
        ),
    ])


ChangeCompanyIdSchema = ManualSchema(fields=[
        coreapi.Field(
            "app_key",
            required=True,
            location="form",
            schema=coreschema.String()
        )
])


CompanyRefCodeSchema = ManualSchema(fields=[
        coreapi.Field(
            "ref_code",
            required=True,
            location="form",
            schema=coreschema.String()
        )
])


ConfirmResetTokenSchema = ManualSchema(fields=[
        coreapi.Field(
            "email",
            required=True,
            location="form",
            schema=coreschema.String()
        ),
        coreapi.Field(
            "token",
            required=True,
            location="form",
            schema=coreschema.String()
        ),
    ])
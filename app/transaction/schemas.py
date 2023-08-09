import coreapi
import coreschema

from rest_framework.schemas import ManualSchema



MealBookingSchema = ManualSchema(fields=[
        coreapi.Field(
            "orders",
            required=True,
            location="form",
            schema=coreschema.Array(description='It is an array taking : quantity, food, comment, delivery_date')
        ),

        coreapi.Field(
            "platform",
            required=True,
            location="form",
            schema=coreschema.String(description='WEB or IOS or AND or SEF')
        ),

    coreapi.Field(
        "place",
        required=True,
        location="form",
        schema=coreschema.String(description='It could either be company or market')
    ),
    ])


MealDeliveryBySelfServiceSchema = ManualSchema(fields=[
        coreapi.Field(
            "verification_type",
            required=True,
            location="form",
            schema=coreschema.String(description=' facial or fingerprint or qr  or card')
        ),

        coreapi.Field(
            "device_id",
            required=True,
            location="form",
            schema=coreschema.String(description='The device app id ')
        ),

    coreapi.Field(
        "user_id",
        required=True,
        location="form",
        schema=coreschema.String(description='The user id')
    ),
    ])

GetTopUpCodeSchema = ManualSchema(fields=[])

CashoutViewSchema= ManualSchema(fields=[
    coreapi.Field(
        "comp_id",
        required=False,
        location="query",
        schema=coreschema.Integer(description='Only pass the comp_id for SID cashout alone, if cashing out for a specific company, pass the company id  and  if cashing out all sid balance , pass 0 ')
    ),
])



TopUpHistoryViewSchema= ManualSchema(fields=[
    coreapi.Field(
        "date_start",
        required=True,
        location="query",
        schema=coreschema.Integer(description='Date  Start filter')
    ),
    coreapi.Field(
        "end_start",
        required=True,
        location="query",
        schema=coreschema.Integer(description='Date End filter')
    ),
])




VendorWithdrawalHistorySchema= ManualSchema(fields=[
    coreapi.Field(
        "date_start",
        required=True,
        location="query",
        schema=coreschema.Integer(description='Date  Start filter')
    ),
    coreapi.Field(
        "end_start",
        required=True,
        location="query",
        schema=coreschema.Integer(description='Date End filter')
    ),
])

CompanyWithdrawalHistorySchema= ManualSchema(fields=[
    coreapi.Field(
        "date_start",
        required=True,
        location="query",
        schema=coreschema.Integer(description='Date  Start filter')
    ),
    coreapi.Field(
        "end_start",
        required=True,
        location="query",
        schema=coreschema.Integer(description='Date End filter')
    ),
])

SIDWithdrawalHistorySchema= ManualSchema(fields=[
    coreapi.Field(
        "date_start",
        required=True,
        location="query",
        schema=coreschema.Integer(description='Date  Start filter')
    ),
    coreapi.Field(
        "end_start",
        required=True,
        location="query",
        schema=coreschema.Integer(description='Date End filter')
    ),
])

VoidTxnHistoryViewSchema = ManualSchema(fields=[
    coreapi.Field(
        "date_start",
        required=True,
        location="query",
        schema=coreschema.Integer(description='Date  Start filter')
    ),
    coreapi.Field(
        "end_start",
        required=True,
        location="query",
        schema=coreschema.Integer(description='Date End filter')
    ),
])


VoidTxnViewSchema = ManualSchema(fields=[
        coreapi.Field(
            "txn_id",
            required=True,
            location="form",
            schema=coreschema.String(description='Txn id ')
        )
    ])


GetDailyLimitLeftViewSchema = ManualSchema(fields=[
        coreapi.Field(
                "delivery_date",
                required=True,
                location="query",
                schema=coreschema.Integer(description='Delivery Date filter')
            )
])

VendorConfirmDeliverySchema = ManualSchema(fields=[
        coreapi.Field(
            "receipt_id",
            required=True,
            location="form",
            schema=coreschema.String(description='Receipt id ')
        )
    ])
import sys
from django.db import models
from six import BytesIO
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from account.models import User, Company
import cloudinary
from cloudinary.models import CloudinaryField

# Create your models here.
class CategoryType(models.Model):
    name = models.CharField(max_length=250)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
    time_created = models.TimeField(auto_now_add=True)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = [['name', 'company']]


class Category(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    category_type = models.ForeignKey(CategoryType, on_delete=models.SET_NULL, blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
    time_created = models.TimeField(auto_now_add=True)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = [['name', 'created_by', 'company']]


class Food(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='food', max_length=250, null=True, blank=True)
    # image = cloudinary.models.CloudinaryField('image', transformation={'width': '200', 'height': '200', 'crop':'fill', 'radius':'20'}, folder='/v2_food', null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, blank=True, null=True)
    unit_price = models.FloatField()
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, blank=True, null=True)
    time_created = models.TimeField(auto_now_add=True)
    date_created = models.DateField(auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True)

    def save(self, *args, **kwargs):
        self.unit_price = round(self.unit_price, 2)
        super(Food, self).save(*args, **kwargs)

    def __str__(self):
        return  self.name

    class Meta:
        unique_together = [['name', 'created_by', 'company']]

    # def save(self, *args, **kwargs):
    #     if self.image:
    #         #Opening the uploaded image
    #         im = Image.open(self.image)
    #         output = BytesIO()
    #         #Resize/modify the image
    #         im = im.resize((200,200))
    #         #after modifications, save it to the output
    #         im.save(output, format='JPEG', quality=100)
    #         output.seek(0)
    #         #change the imagefield value to be the newley modifed image value
    #         self.image = InMemoryUploadedFile(output,'ImageField', "%s.jpg" %self.image.name.split('.')[0], 'image/jpeg', sys.getsizeof(output), None)
    #         super(User,self).save()
    #     else:
    #         super().save(*args, **kwargs)


class MealType(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    time = models.TimeField(auto_now_add=True, null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name="meal_type_company")

    def __str__(self):
        return self.name

    class Meta:
        unique_together = [['name', 'company']]


class Inventory(models.Model):
    id = models.AutoField(primary_key=True)
    food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True, blank=True, related_name="inv_food")
    top_up_quantity = models.IntegerField(default=0)
    quantity_left = models.IntegerField(default=0)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    time = models.TimeField(auto_now_add=True, null=True, blank=True)
    meal_type = models.ForeignKey(MealType, on_delete=models.SET_NULL, null=True, blank=True, related_name="inv_meal_type")
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name="inv_company")
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="inv_user")
    delivery_date = models.DateField( null=True, blank=True)
    last_modified = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return str(self.id)


class Inventory_top_history(models.Model):
    id = models.AutoField(primary_key=True)
    inventory = models.ForeignKey(Inventory, on_delete=models.SET_NULL, null=True, blank=True, related_name="inv_top_hist_food")
    top_up_quantity = models.IntegerField(default=0)
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    time = models.TimeField(auto_now_add=True, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name="inv_top_hist_company")
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="inv_top_hist_user")

    def __str__(self):
        return str(self.id)


class Food_rating(models.Model):
    id = models.AutoField(primary_key=True)
    food = models.ForeignKey(Food, on_delete=models.SET_NULL, null=True, blank=True, related_name="food_rating_food")
    comment = models.TextField(blank=True, null=True)
    rating = models.IntegerField()
    date = models.DateField(auto_now_add=True, null=True, blank=True)
    time = models.TimeField(auto_now_add=True, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, null=True, blank=True, related_name="food_rating_company")
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="food_rating_user")

    def __str__(self):
        return str(self.id)



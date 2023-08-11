from account.filters import DateFilter
from .models import FoodReviewResponse



class FoodReviewResponseFilter(DateFilter):

    def __init__(self, **kwargs):
        super().__init__(start_field="created_at", end_field="created_at", **kwargs)    
    
    class Meta:
        model = FoodReviewResponse
        fields = ['vendor']
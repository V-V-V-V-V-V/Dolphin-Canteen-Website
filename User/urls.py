
from django.contrib import admin
from django.urls import path
from Signup import views
# url rooting from the user to the application named signup
urlpatterns = [
    path('admin/', admin.site.urls),
    path('signup/',views.SignupPage, name='signup'),
    path('login/',views.LoginPage, name='login'),
    path('',views.HomePage, name='home'),
    path('logout/',views.signout, name='logout'),
    path('dolphin/',views.dolphin,name='dolphin'),
    path('cart/',views.cart,name='cart'),
    path('northeast/',views.northeast,name='northeast'),
    path('mitticafe/',views.mitticafe,name='mitticafe'),
    path('checkout/',views.checkout,name='checkout')
]

# Importing python modules

from email import message
from multiprocessing import context
from django.shortcuts import render,HttpResponse,redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages


# Defining html requests to prticular templates
def HomePage(request):
    return render(request,'index.html')

def SignupPage(request):        #Defining html requests to prticular templates
    if request.method=='POST':   # Storing the data into respective variables inputing from signup page form
        u_name=request.POST.get('username')
        f_name=request.POST.get('firstname')
        l_name=request.POST.get('lastname')
        email=request.POST.get('email')
        pass1=request.POST.get('password1')
        pass2=request.POST.get('password2')

# Error specifications and checking conditions 
        if User.objects.filter(username=u_name):
            messages.error(request, "Username already exist! Please try some other username.")
            return redirect('signup')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email Already Registered!!")
            return redirect('signup')
        
        if len(u_name)>20:
            messages.error(request, "Username must be under 20 charcters!!")
            return redirect('signup')
        
        if pass1 != pass2:
            messages.error(request, "Passwords didn't matched!!")
            return redirect('signup')
           
    # creating user database 
        my_User=User.objects.create_user(u_name,email,pass1)
        my_User.first_name = f_name
        my_User.last_name = l_name
        my_User.save()
        my_User.is_active = False
        messages.success(request,"Your account has been successfully created!!")
        return redirect('login') 
    return render(request,'signup.html')

def LoginPage(request):   #Defining html requests to prticular templates
    
    if request.method=='POST':      # checking login credentials usinf my_user database 
        username=request.POST.get('username')
        pass3=request.POST.get('pass')
        user=authenticate(request,username=username,password=pass3)
        if user is not None:
            login(request,user)
            fname = user.first_name   
            return render(request,'index.html',{"fname":fname})
        else:
            messages.error(request,"Incorrect Login credentials!!")    
            return redirect('login')
       # print(username,pass3) 
    return render(request,'login.html')

def signout(request):  #Defining html requests to prticular templates
     logout(request)
     messages.success(request, "Logged Out Successfully!!")
     return redirect('login')

@login_required(login_url='login') # Checking for authenticated users
def dolphin(request):  #Defining html requests to prticular templates
    return render(request,'dolphin.html')

@login_required(login_url='login')   # Checking for authenticated users
def cart(request):   #Defining html requests to prticular templates
    return render(request,'cart.html')
    
@login_required(login_url='login')  # Checking for authenticated users
def northeast(request):   #Defining html requests to prticular templates
    return render(request,'northeast.html')

@login_required(login_url='login')   # Checking for authenticated users
def mitticafe(request):   #Defining html requests to prticular templates
    return render(request,'mitticafe.html')
    
@login_required(login_url='login')  # Checking for authenticated users
def checkout(request):   #Defining html requests to prticular templates
    return render(request,'checkout.html')
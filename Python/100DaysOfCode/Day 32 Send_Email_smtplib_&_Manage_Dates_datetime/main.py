# import smtplib #module to send email 

# my_email = "try.yogeshj@gmail.com"
# password = "lwwrhpwyodgafrgj" #app password generated for specific task, here it is for birthday wisher app

# with smtplib.SMTP("smtp.gmail.com") as connection:
#     connection.starttls() #to make the connection secure
#     connection.login(user=my_email,password=password)
#     connection.sendmail(
#         from_addr=my_email, 
#         to_addrs="yogeshjoshi1306@gmail.com", 
#         msg="Subject:Birthday wishes\n\npython smtplib check"
#     )

# import datetime as dt

# now = dt.datetime.now()
# year= now.year
# month=now.month
# day=now.weekday()
# print(day)


#defining custom datetime
# date_of_birth = dt.datetime(year=2000, month=7, day=13)
# print(date_of_birth)

# challenge 1: Send motivational quotes on monday via email
# import datetime as dt
# import smtplib
# import random

# today = dt.datetime.now()
# day_of_week=today.weekday()

# my_email = "try.yogeshj@gmail.com"
# password = "lwwrhpwyodgafrgj" #app password generated for specific task, here it is for birthday wisher app

# if day_of_week == 4:
#     with open('quotes.txt','r') as quote_file:
#         content = quote_file.readlines()
#         quote = random.choice(content)

#     with smtplib.SMTP("smtp.gmail.com") as connection:
#         connection.starttls()
#         connection.login(user=my_email,password=password)
#         connection.sendmail(
#             from_addr=my_email, 
#             to_addrs="yogeshjoshi1306@gmail.com", 
#             msg=f"Subject:Feeling low,Here's a quote to motivate you!\n\n{quote}"
#         )
#     print(random.choice(content))



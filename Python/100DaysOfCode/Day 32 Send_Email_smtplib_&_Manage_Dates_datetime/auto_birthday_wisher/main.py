##################### Extra Hard Starting Project ######################
import pandas as pd
import datetime as dt
import random
import os
import smtplib

# 1. Update the birthdays.csv
birthdates={
    'name':["Mummy",'Papa','Tannu','Rahul'],
    'email':['yogeshjoshi1306@gmail.com', 'yogeshjoshi1306@gmail.com', 'yogeshjoshi1306@gmail.com', 'yogeshjoshi1306@gmail.com'],
    'year':[1976, 1970, 2003, 1999],
    'month':[2, 2, 4, 1],
    'date':[3, 3, 3, 3],
}
df = pd.DataFrame(birthdates)
df.to_csv('auto_birthday_wisher/birthdays.csv', index=False)

# 2. Check if today matches a birthday in the birthdays.csv
today = dt.datetime.now()
date_today = (today.month, today.day)
birthday_df = pd.read_csv('auto_birthday_wisher/birthdays.csv')

MY_EMAIL = "try.yogeshj@gmail.com"
PASSWORD = "lwwrhpwyodgafrgj"

birthday_dict = {(data_row.month,data_row.date):data_row for (_, data_row) in birthday_df.iterrows()}

# 3. If step 2 is true, pick a random letter from letter templates and replace the [NAME] with the person's actual name from birthdays.csv

if date_today in birthday_dict:
    birthday_person = birthday_dict[date_today]

    wish_letter = random.choice(os.listdir('auto_birthday_wisher/letter_templates'))
    with open(f'auto_birthday_wisher/letter_templates/{wish_letter}','r') as letter:
        content = letter.read().replace('[NAME]',birthday_person['name'])

# # 4. Send the letter generated in step 3 to that person's email address.
    with smtplib.SMTP("smtp.gmail.com") as connection:
        connection.starttls()
        connection.login(user=MY_EMAIL,password=PASSWORD)
        connection.sendmail(
            from_addr=MY_EMAIL, 
            to_addrs=birthday_person['email'], 
            msg=f"Subject:Happy Birthday!!\n\n{content}"
        )




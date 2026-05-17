from tkinter import *
from tkinter import messagebox
from random import randint, choice, shuffle
import os
import json
import pyperclip #module to automatically copy something to clipboard

# ---------------------------- CONSTANTS ------------------------------- #
script_dir = os.path.dirname(__file__)
data_file_path = os.path.join(script_dir, "data.json")
logo_file_path = os.path.join(script_dir, "logo.png")
# ---------------------------- PASSWORD GENERATOR ------------------------------- #
def generate_pass():
    letters = list('abcdefghijklmnopqrstuvwxyz')
    numbers = list('0123456789')
    symbols = list('!#$%&*()+')

    password_letter = [choice(letters) for _ in range(randint(8,10))]
    password_symbols = [choice(symbols) for _ in range(randint(2,4))]
    password_numbers = [choice(numbers) for _ in range(randint(2,4))]

    password_list = password_letter + password_symbols + password_numbers
    shuffle(password_list)

    password = ''.join(password_list)

    password_input.insert(0,password)
    pyperclip.copy(password)

# ---------------------------- SAVE PASSWORD ------------------------------- #
def save():
    website = website_input.get()
    username = email_input.get()
    password = password_input.get()

    new_data = {
        website: {
            'email': username,
            'password': password,
        }
    }
    
    if len(website) == 0 or len(username) == 0 or len(password) == 0:
        messagebox.showinfo(title="Oops", message="Please don't leave any fields empty!")
    else:
        is_ok = messagebox.askokcancel(f"Password Confirmation", f"The password for website: {website} \nusername: {username}\npassword: {password}\nIs it ok to save?")

        if is_ok:
            try:
                with open(data_file_path, 'r') as data_file:
                    #reading old data
                    data = json.load(data_file)
            except FileNotFoundError:
                with open(data_file_path,'w') as data_file:
                    json.dump(new_data, data_file, indent=4)
            else:
                #updating the old data with new data 
                data.update(new_data)
                with open(data_file_path,'w') as data_file:
                    #saving updated data
                    json.dump(data, data_file, indent=4)
            finally:
                website_input.delete(0,END)
                email_input.delete(0,END)
                password_input.delete(0,END)

#-----------------Search Database for existing website and its details---------------------------------#
def search_password():
    website = website_input.get()
    try:
        with open(data_file_path, 'r') as data_file:
            #reading data
            data = json.load(data_file)
    except FileNotFoundError:
        messagebox.showinfo(title='',message='No Data file found')
    else:
        if website in data:
            website_email = data[website]['email']
            website_pswrd = data[website]['password']
            messagebox.showinfo(title=website, message=f"Email/username: {website_email}\nPassword: {website_pswrd}")
            pyperclip.copy(website_pswrd)
        else:
            messagebox.showinfo(title=website, message='No Details for the website exists')
    

# ---------------------------- UI SETUP ------------------------------- #
window = Tk()
window.title("Password Manager")
window.config(padx=20, pady=20)


canvas = Canvas(width=200, height=200, highlightthickness=0)
logo_img = PhotoImage(file=logo_file_path)
canvas.create_image(100, 100, image=logo_img)
canvas.grid(column=1,row=0)

website_label = Label(text="Website: ")
website_label.grid(column=0,row=1)

email_label = Label(text="Email/Username: ")
email_label.grid(column=0,row=2)

password_label = Label(text="Password: ")
password_label.grid(column=0,row=3)

website_input = Entry(width=21)
website_input.focus()
website_input.grid(column=1,row=1, sticky= 'W' + 'E')

email_input = Entry(width=35)
email_input.grid(column=1,row=2, columnspan=2, sticky= 'W' + 'E')

password_input = Entry(width=21)
password_input.grid(column=1,row=3, columnspan=1, sticky= 'W' + 'E')

search_btn = Button(text='Search',width=15, command=search_password)
search_btn.grid(column=2, row=1)

generate_pass_btn = Button(text="Generate Password",command=generate_pass)
generate_pass_btn.grid(column=2,row=3)

add_btn = Button(text="Add", width=36)
add_btn.config(command=save)
add_btn.grid(column=1, row=4, columnspan=2, sticky= 'W' + 'E')




window.mainloop()
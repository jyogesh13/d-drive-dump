from tkinter import *
from tkinter import messagebox
from random import randint, choice, shuffle
import pyperclip #module to automatically copy something to clipboard

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
    
    if len(website) == 0 or len(username) == 0 or len(password) == 0:
        messagebox.showinfo(title="Oops", message="Please don't leave any fields empty!")
    else:
        is_ok = messagebox.askokcancel(f"Password Confirmation", f"The password for website: {website} \nusername: {username}\npassword: {password}\nIs it ok to save?")

        if is_ok:
            with open('data.txt','a') as file:
                file.write(f"{website} | {username} | {password}\n")
                password_input.delete(0,END)
                email_input.delete(0,END)
                website_input.delete(0,END)


# ---------------------------- UI SETUP ------------------------------- #
window = Tk()
window.title("Password Manager")
window.config(padx=20, pady=20)


canvas = Canvas(width=200, height=200, highlightthickness=0)
logo_img = PhotoImage(file="logo.png")
canvas.create_image(100, 100, image=logo_img)
canvas.grid(column=1,row=0)

website_label = Label(text="Website: ")
website_label.grid(column=0,row=1)

email_label = Label(text="Email/Username: ")
email_label.grid(column=0,row=2)

password_label = Label(text="Password: ")
password_label.grid(column=0,row=3)


website_input = Entry(width=35)
website_input.focus()
website_input.grid(column=1,row=1, columnspan=2, sticky= 'W' + 'E')

email_input = Entry(width=35)
email_input.grid(column=1,row=2, columnspan=2, sticky= 'W' + 'E')

password_input = Entry(width=21)
password_input.grid(column=1,row=3, columnspan=1, sticky= 'W' + 'E')

generate_pass_btn = Button(text="Generate Password",command=generate_pass)
generate_pass_btn.grid(column=2,row=3)

add_btn = Button(text="Add", width=36)
add_btn.config(command=save)
add_btn.grid(column=1, row=4, columnspan=2, sticky= 'W' + 'E')




window.mainloop()
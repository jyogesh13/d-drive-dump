from tkinter import *
import pandas as pd
import random

BACKGROUND_COLOR = "#B1DDC6"
current_card = {}
wrds_to_learn = {}

try: 
    data = pd.read_csv('data/words_to_learn.csv')
except FileNotFoundError:
    original_data = pd.read_csv('data/french_words.csv')
    wrds_to_learn = original_data.to_dict(orient="records") #this will convert data to list of dictionaries
else:
    wrds_to_learn = data.to_dict(orient="records") #this will convert data to list of dictionaries


def next_card():
    global current_card, flip_timer
    window.after_cancel(flip_timer)
    current_card = random.choice(wrds_to_learn)
    canvas.itemconfig(card_title, text = "French",fill = 'black')
    canvas.itemconfig(card_word, text = current_card['French'], fill='black')
    canvas.itemconfig(card_bg_img, image= card_img_front)
    flip_timer = window.after(3000,flip_card)

def flip_card():
    canvas.itemconfig(card_title, text = "English", fill='white')
    canvas.itemconfig(card_word, text = current_card['English'], fill='white')
    canvas.itemconfig(card_bg_img, image=card_img_back)

def to_learn():
    wrds_to_learn.remove(current_card)
    df = pd.DataFrame(wrds_to_learn)
    df.to_csv('data/words_to_learn.csv', index=False)
    next_card()





window = Tk()
window.title('Flash cards')
window.config(padx=50, pady=50, bg=BACKGROUND_COLOR)

flip_timer= window.after(3000, flip_card)


canvas = Canvas(width=800, height=526, bg=BACKGROUND_COLOR, highlightthickness=0)
card_img_back = PhotoImage(file='images/card_back.png')
card_img_front = PhotoImage(file='images/card_front.png')
card_bg_img = canvas.create_image(400, 263, image=card_img_front)
card_title = canvas.create_text(400, 158, text="French", fill="Black", font=('Courier', 30, "italic"))
card_word = canvas.create_text(400, 263, text="Word", fill="Black", font=('Courier', 50 , "bold"))
canvas.grid(row=0, column=0, columnspan=2)


cross_img = PhotoImage(file="images/wrong.png")
check_img = PhotoImage(file="images/right.png")

wrong_btn = Button(image=cross_img, bg=BACKGROUND_COLOR, command=next_card)
wrong_btn.grid(row=1, column=0)
right_btn = Button(image=check_img, bg=BACKGROUND_COLOR, command=to_learn)
right_btn.grid(row=1,column=1)

next_card()

window.mainloop()
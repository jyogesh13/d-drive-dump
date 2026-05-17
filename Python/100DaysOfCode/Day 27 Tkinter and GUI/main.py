from tkinter import *

#creating a window object 
window = Tk()
window.title("My First GUI")
window.minsize(width=500,height=300)
window.config(padx=20,pady=20) #adds padding to the window

def button_clicked():
    print("Button clicked")
    new_text = input.get()
    my_label.config(text=new_text)


'''first label'''
my_label = Label(text="New Text")
my_label.config(padx=20,pady=20)
my_label.grid(column=0,row=0)

'''first button'''
button_1 = Button(text="click me")
button_1["command"] = button_clicked
button_1.config(padx=20,pady=20)
button_1.grid(column=1, row=1)

'''second button'''
button_2 = Button(text="click me")
button_2["command"] = button_clicked
button_2.config(padx=20,pady=20)
button_2.grid(column=2, row=0)

'''input field'''
input = Entry(width=30)
input.insert(END, "Example text")
input.grid(column=3,row=2)













window.mainloop()
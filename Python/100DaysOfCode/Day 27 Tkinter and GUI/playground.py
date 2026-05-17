'''Boiler code to create some of the widgets in tkinter'''

'''to place widgets onto the screen we can use: pack(), place(x,y), grid(column,row)'''

'''creating a label'''
# my_label = Label(text="I am test label",font=('Courier',18,'bold'))

#alternate way to access the attributes inside label
# my_label["text"] = "NEw Text"
# my_label.config(text="New text")

# my_label.pack()
# my_label.pack(side='left')
# my_label.pack(expand=1) #expands the label to the middle of the screen
# my_label.grid(column=0,row=0)

'''creating a Input field with some default text'''
# input = Entry(width=30)
# input.insert(END,string="example text") #default text
# print(input.get()) #to get text from input
# input.pack()

'''creating a button'''
# button = Button(text="click me")
# button["command"] = function_to_do_something_when_button_clicked
# button.pack()


'''creating a scale'''
# def scale_used(value):
#     '''function to print the current scale value'''
#     print(value)

# scale = Scale()
# scale.config(from_=0, to=10,command=scale_used)
# scale.pack()


'''creating a checkbox'''
# def checkbutton_used():
#     '''to print checkbutton state: 1 -> On ; 0 -> Off'''
#     print(checked_state.get())

# checked_state = IntVar() #variable to hold the checkbutton state
# checkbutton = Checkbutton(text="is_ON?",variable=checked_state,command=checkbutton_used)
# checkbutton.pack()



'''creating a radio button'''
# def radio_used():
#     '''function to get the input from radio buttons'''
#     print(radio_state.get())

# radio_state = IntVar() #variable to hold on to which radio button value is checked
# radio_btn_1 = Radiobutton(text="Option 1", value=1, variable=radio_state,command=radio_used)
# radio_btn_2 = Radiobutton(text="Option 2", value=2, variable=radio_state,command=radio_used)
# radio_btn_1.pack()
# radio_btn_2.pack()


'''creating a listbox'''
# def listbox_used(event):
#     '''Gets current selection from listBox'''
#     print(listbox.get(listbox.curselection()))

# listbox = Listbox(height=4)
# cities = ['New Delhi', 'Kolkata', 'Jaipur', 'Patna', 'Lucknow']
# for city in cities:
#     listbox.insert(cities.index(city), city)
# listbox.bind("<<ListboxSelect>>",listbox_used)
# listbox.pack()


'''creating a spinbox'''
# def spin_box_used():
#     '''function to get spinbox value'''
#     print(spinbox.get())

# spinbox = Spinbox(from_=0, to=10,width=5)
# spinbox.config(command=spin_box_used)
# spinbox.pack()




'''creating a text area'''
# text = Text(height=5,width=30)
# text.focus() #puts cursor in textarea
# text.insert(END,"Example text")
# print(text.get("1.0",END)) #gets current value in textbox at line 1, character 0
# text.pack()



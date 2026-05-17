from tkinter import * 

MILES = 1.60934

window = Tk()
window.title("Miles to Kilometer Converter")
window.minsize(width=300,height=100)
window.config(padx=20,pady=20) #adds padding to the window


def miles_to_km():
    miles = float(miles_input.get())
    in_km = miles * MILES
    km_calculated_value.config(text=f"{in_km}")


'''input field'''
miles_input = Entry(width=7)
miles_input.grid(column=1,row=0)

'''Label 1'''
label_1 = Label(text="Miles")
label_1.grid(column=2,row=0)

'''Label 2'''
is_equal_label = Label(text="is equal to")
is_equal_label.grid(column=0,row=1)

'''Label 3'''
km_calculated_value = Label(text="0")
km_calculated_value.grid(column=1,row=1)

'''Label 4'''
km_label = Label(text="Km")
km_label.grid(column=2,row=1)

''' Calculate Button'''
calc_btn = Button(text="Calculate", command=miles_to_km)
calc_btn.grid(column=1,row=2)

window.mainloop()
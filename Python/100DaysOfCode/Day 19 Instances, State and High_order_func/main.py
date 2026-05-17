'''Higher order functions: functions that takes another function as an argument'''
import turtle as t


'''challenge 1: Etch a sketch'''
'''way1'''
# Initialize the turtle and screen
# tim = t.Turtle()
# screen = t.Screen()

# #dictionary to keep track of keys pressed
# keys_pressed = {
#     'w': False,
#     's': False,
#     'a': False,
#     'd': False,
# }

# #move function to control movement
# def move():
#     if keys_pressed['w']:
#         tim.forward(10)
#     if keys_pressed['s']:
#         tim.backward(10)
#     if keys_pressed['a']:
#         tim.left(20)
#     if keys_pressed['d']:
#         tim.right(20)
#     screen.ontimer(move,10)
    
# def key_press(key):
#     keys_pressed[key] = True

# def key_release(key):
#     keys_pressed[key] = False

# def clear():
#     tim.clear()
#     tim.penup()
#     tim.home()
#     tim.pendown()

# screen.onkeypress(key = 'w', fun= lambda: key_press('w'))
# screen.onkeypress(key = 's', fun= lambda: key_press('s'))
# screen.onkeypress(key = 'a', fun= lambda: key_press('a'))
# screen.onkeypress(key = 'd', fun= lambda: key_press('d'))
# screen.onkey(key = 'c', fun= lambda: tim.clear())

# screen.onkeyrelease(key='w', fun=lambda: key_release('w'))
# screen.onkeyrelease(key='s', fun=lambda: key_release('s'))
# screen.onkeyrelease(key='a', fun=lambda: key_release('a'))
# screen.onkeyrelease(key='d', fun=lambda: key_release('d'))

# screen.listen()
# move()
# screen.exitonclick()


'''way2'''
# def move_f():
#     tim.forward(10)
# def move_back():
#     tim.backward(10)
# def move_right():
#     tim.right(10)
# def move_left():
#     tim.left(10)
# def clear():
#     tim.clear()
#     tim.penup()
#     tim.home()
#     tim.pendown()



# screen.listen()
# screen.onkey(key='w',fun=move_f)
# screen.onkey(key='s',fun=move_back)
# screen.onkey(key='d',fun=move_right)
# screen.onkey(key='a',fun=move_left)
# screen.onkey(key='c',fun=clear)
# screen.exitonclick()




'''challenge 2: Turtle race game'''
import random as rnd
screen = t.Screen()
screen.setup(width=500, height=400) #set the screen size
usr_bet = screen.textinput(title='Make your bet',prompt="Who will win the race?Enter a color:") #takes text input from user

is_race_on = False
colors = ['violet','indigo','blue','green','yellow','orange','red']
all_turtles = []
y_cod = [-120,-80,-40,0,40,80,120]

for turtle_index in range(6):
    new_turtle = t.Turtle(shape='turtle')
    new_turtle.penup()
    new_turtle.goto(-230,y_cod[turtle_index])
    new_turtle.color(colors[turtle_index]) 
    all_turtles.append(new_turtle)

if usr_bet:
    is_race_on = True

while is_race_on:
    for turtle in all_turtles:
        if turtle.xcor() > 230:
            is_race_on = False

            winning_color = turtle.pencolor()
            if winning_color == usr_bet:
                print(f"You won!!, {winning_color} is the winner!!")
            else:
                print(f"You lost!!, {winning_color} is the winner!!")

        random_dist = rnd.randint(0,10)
        turtle.forward(random_dist)



    




screen.exitonclick()
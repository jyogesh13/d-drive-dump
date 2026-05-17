import turtle as t

tim = t.Turtle()
t.colormode(255)
# tim.shape("arrow")
# tim.color("blue")
# tim.pencolor('#556B2F') #sets the outline
# tim.fillcolor('#556B2F') #fills the color 
# tim.forward(100) 
# tim.right(90) #.right(angle)


'''challenge 1: Draw a square'''
# for _ in range(4):
#     tim.forward(100) 
#     tim.right(90) #.right(angle)

'''challenge 2: Draw a dashed line'''
#way1
# for _ in range(10):
#     tim.forward(10)
#     tp_x = tim.pos()[0]
#     tim.teleport(tp_x+10)

#way2
# for _ in range(15):
#     tim.forward(10)
#     tim.penup()
#     tim.forward(10)
#     tim.pendown()

'''Challenge 3: Draw different shapes'''
# import random
# color = ['#556B2F', '#7FFF00', '#800000', '#0000FF', '#FFA07A']

# def draw_shape(sides):
#     angle = 360 / side
#     for _ in range(sides):
#         tim.forward(100)
#         tim.right(angle)

# for side in range(3,11):
#     shape_color = random.choice(color)
#     tim.color(shape_color)
#     draw_shape(side)
    
'''Challenge 4: Generate a random walk'''
#way1
# import random
# tim.pensize(15)
# tim.speed('fast')
# direction = ['forward','backward','right','left']
# colors = ['#00FFFF', '#87CEFA', '#008B8B', '#7FFFD4', '#00FA9A', '#7FFF00', '#FFD700', '#B8860B', '#A0522D', '#FF4500']
# while True:
#     go_towards = random.choice(direction)
#     line_color = random.choice(colors)
#     tim.pencolor(line_color)
#     if go_towards == 'forward':
#         tim.forward(30)
#     elif go_towards == 'backward':
#         tim.backward(30)
#     elif go_towards == 'right':
#         tim.right(90)
#         tim.forward(30)
#     else:
#         tim.left(90)
#         tim.forward(30)

#way2
# import random as rnd

# def random_color():
#     r = rnd.randint(0,255)
#     g = rnd.randint(0,255)
#     b = rnd.randint(0,255)
#     return r,g,b

# tim.pensize(15)
# tim.speed('fastest') # vReturn or set the turtle's speed.
# direction = [0,90,180,270]

# #shape generationv
# for _ in  range(200):
#     color = random_color()
#     tim.pencolor(color)
#     tim.forward(30)
#     tim.setheading(rnd.choice(direction)) # Set the orientation of the turtle to to_angle.

'''Challenge 5: make a spirograph'''
import random as rnd
tim.speed('fastest')
def random_color():
    r = rnd.randint(0,255)
    g = rnd.randint(0,255)
    b = rnd.randint(0,255)
    return r,g,b

def draw_shape(tilt_size):
    for _ in range(int(360/tilt_size)):
        tim.color(random_color())
        tim.circle(100)
        # tim.left(tilt_size) or
        tim.setheading(tim.heading() + tilt_size)

draw_shape(1)







screen = t.Screen()
screen.exitonclick()

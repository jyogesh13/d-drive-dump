'''for picking colors from an image'''
# import colorgram
# colors = colorgram.extract('python/100DaysOfCode/Day 18 Turtle_nd_GUI/image.jpg', 30)
# rgb_color = []
# for color in colors:
#     r = color.rgb.r
#     g = color.rgb.g
#     b = color.rgb.b
#     print(color.proportion)
#     rgb_color.append((r,g,b))
#     # print(type(colors[i]))
# print(rgb_color)

'''Hirst painting code'''
import turtle as t
import random as rnd

color_list = [(202, 164, 110), (240, 245, 241), (236, 239, 243), (149, 75, 50), (222, 201, 136), (53, 93, 123), (170, 154, 41), (138, 31, 20), (134, 163, 184), (197, 92, 73), (47, 121, 86), (73, 43, 35), (145, 178, 149), (14, 98, 70), (232, 176, 165), (160, 142, 158), (54, 45, 50), (101, 75, 77), (183, 205, 171), (36, 60, 74), (19, 86, 89), (82, 148, 129), (147, 17, 19), (27, 68, 102), (12, 70, 64), (107, 127, 153), (176, 192, 208), (168, 99, 102)]

tim = t.Turtle()
t.colormode(255)
tim.speed('fastest')
tim.hideturtle()

tim.penup()
tim.setheading(225)
tim.forward(300)
tim.setheading(0)

#way 1
# number_of_dots = 100
# for i in range(1, number_of_dots + 1):
#     tim.dot(20,rnd.choice(color_list))
#     tim.forward(50)
#     if i % 10 == 0:
#         tim.setheading(90)
#         tim.forward(50)
#         tim.setheading(180)
#         tim.forward(500)
#         tim.setheading(0)

#way 2
for i in range(1,11):
    for _ in range(10):
        tim.dot(20,rnd.choice(color_list))
        tim.forward(50)
    
    if i % 2 != 0:
        tim.setheading(90)
        tim.forward(50)
        tim.setheading(180)
        tim.forward(50)
    else:
        tim.setheading(90)
        tim.forward(50)
        tim.setheading(0)
        tim.forward(50)







screen = t.Screen()
screen.exitonclick()
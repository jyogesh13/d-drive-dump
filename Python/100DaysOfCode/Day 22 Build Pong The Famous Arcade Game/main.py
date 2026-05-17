from turtle import Screen
import turtle as t
import time
from paddle import Paddle
from ball import Ball
from scoreboard import Scoreboard


#step1: create the screen
screen = Screen()
screen.setup(width=800, height=600)
screen.bgcolor('black')
screen.tracer(0) #to turn off the animation
screen.title('Pong')

#step2 and step 3: create and move a paddle (width=20,height=100,x_pos=350,y_pos=0)
r_paddle = Paddle((350,0))
l_paddle = Paddle((-350,0))

#step 4: create a ball and make it move
ball = Ball()

#step 8: keep score 
scoreboard = Scoreboard()


screen.listen()
screen.onkeypress(key= 'Up', fun= r_paddle.go_up)
screen.onkeypress(key= 'Down', fun= r_paddle.go_down)
screen.onkeypress(key= 'w', fun= l_paddle.go_up)
screen.onkeypress(key= 's', fun= l_paddle.go_down)

is_game_on = True
while is_game_on:
    
    screen.update() #to mannually update the screen and refresh it everytime 
    time.sleep(ball.ball_speed)
    ball.move()

    # step5: detecting collision with wall and bounce
    if ball.ycor() > 280 or ball.ycor() < -280: 
        ball.bounce_y()
    
    #step 6: detect collision with paddles
    if ball.distance(r_paddle) < 50 and ball.xcor() > 320 or ball.distance(l_paddle) < 50 and ball.xcor() < -320:
        ball.bounce_x()

    #step 7: detecting when the ball misses the paddle
    #for r_paddle
    if ball.xcor() > 380:
        ball.missed()
        scoreboard.l_point()
    #for l_paddle
    if ball.xcor() < -380:
        ball.missed()
        scoreboard.r_point()

screen.exitonclick() 
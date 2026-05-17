from turtle import Turtle


class Ball(Turtle):
    def __init__(self):
        super().__init__()
        self.create_ball()
        self.x_move = 10
        self.y_move = 10
        self.ball_speed = 0.07

    def create_ball(self):
        self.shape('circle')
        self.color('white')
        self.penup()

    def move(self):
        new_x = self.xcor() + self.x_move
        new_y = self.ycor() + self.y_move
        self.goto(new_x,new_y)

    def bounce_y(self):
        self.y_move *= -1

    def bounce_x(self):
        self.x_move *= -1
        self.ball_speed *= 0.9
    
    def missed(self):
        self.home()
        #as y_cord will be same as before collision hence only bounce_x is called
        self.bounce_x() 
        self.ball_speed = 0.07

        

            
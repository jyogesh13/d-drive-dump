from turtle import Turtle
FONT = ("Courier", 24, "normal")


class Scoreboard(Turtle):
    def __init__(self):
        super().__init__()
        self.penup()
        self.level = 1
        self.goto(-280 ,265)
        self.update_score()
        self.hideturtle()
        
    def update_score(self):
        self.clear()
        self.write(arg=f'Level: {self.level}', align='left', font=FONT)
    
    def increase_score(self):
        self.level += 1
        self.update_score()
    
    def game_over(self):
        self.home()
        self.write(arg='Game Over!!', align='center', font=FONT)

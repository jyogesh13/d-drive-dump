from turtle import Turtle

ALIGNMENT = "center"
FONT = ('Courier', 24, 'normal')

class Scoreboard(Turtle):
    def __init__(self):
        super().__init__()
        self.score = 0
        self.high_score = self.read_highscore()
        self.color('white')
        self.penup()
        self.goto(0,265)
        self.hideturtle()
        self.update_scoreboard()

    def update_scoreboard(self):
        self.clear()
        self.write(arg = f"Score: {self.score} High score: {self.high_score}", align = ALIGNMENT, font = FONT)
    
    def update_score(self):
        self.score += 1
        self.update_scoreboard()
    
    def reset(self):
        if self.score > self.high_score:
            self.high_score = self.score
        self.score = 0
        self.save_highscore()
        self.update_scoreboard()
    
    def save_highscore(self):
        with open("./high_score.txt",'w') as file:
            content = self.high_score
            file.write(str(content))
    
    def read_highscore(self):
        with open("./high_score.txt",'r') as file:
            content = file.read().strip()
            if content:
                return int(content)
            
            else:
                return 0
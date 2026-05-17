import time
from turtle import Screen
from player import Player
from car_manager import CarManager
from scoreboard import Scoreboard

screen = Screen()
screen.setup(width=600, height=600)
screen.tracer(0)
game_is_on = True

#step 1
player = Player()

#step2 creating cars
car_manager = CarManager()

scoreboard = Scoreboard()

#moving the player
screen.listen()
screen.onkeypress(key='Up',fun=player.go_up)

while game_is_on:
    time.sleep(0.1)
    screen.update()
    car_manager.generate_car()
    car_manager.move_cars()

    #detect collision with the car
    for car in car_manager.all_cars:
        if car.distance(player) < 20:
            scoreboard.game_over()
            game_is_on = False

    
    #detect when turtle reaches the other side
    if player.is_player_at_finish_line():
        player.go_to_start()
        car_manager.increase_speed()
        scoreboard.increase_score()



screen.exitonclick()

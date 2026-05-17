import turtle as t
import pandas as pd
import time

screen = t.Screen()
screen.title('U.S. States Game')
image = './us-states_quiz/blank_states_img.gif'
screen.addshape(image)
t.shape(image)


df = pd.read_csv('./us-states_quiz/50_states.csv')
all_states = df.state.to_list()
guessed_states = []


while len(guessed_states) < 50:
    time.sleep(0.1)
    ask_user = t.textinput(title=f"{len(guessed_states)}/{len(all_states)} states correct",prompt="Enter name of the state: ").title()

    if ask_user == 'Exit':
        missed_states = [state for state in all_states if state not in guessed_states]
        df = pd.DataFrame(missed_states)
        df.to_csv('./us-states_quiz/states_to_learn.csv')
        break

    if ask_user in all_states:
        guessed_states.append(ask_user)
        tim = t.Turtle()
        tim.penup()
        tim.hideturtle()
        state_data = df[df.state == ask_user]
        tim.goto((int(state_data.x.iloc[0]), int(state_data.y.iloc[0])))
        # tim.write(state_data.state.item()) or
        tim.write(ask_user)

t.mainloop()

import requests as req
import json
from datetime import datetime as dt

API_KEY = "99862d9af51f240fe7edddf3b4dee73a" #put this in environment variable
APP_ID = "9953414d" #put this in environment variable
SHEETY_AUTH = "eW9nZXNoMTM6QFlvZ2VzaDEyMzQ=" #put this in environment variable
WEIGHT = 76
HEIGHT = 170
AGE = 25


ENDPOINT = "https://trackapi.nutritionix.com/v2/natural/exercise"
SHEETY_ENDPOINT = "https://api.sheety.co/f3c099714a7c3bbc0d85d1039db27b7a/workoutList/workouts" #put this in environment variable

header_data = {
    "x-app-id": APP_ID,
    "x-app-key": API_KEY,
}

data = {
    "query": input("What exercise did you do? "),
    "weight_kg": WEIGHT,
    "height_cm": HEIGHT,
    "age": AGE,
}

response = req.post(url=ENDPOINT, json=data, headers=header_data)
data = response.json()
with open("data.json", "w") as file:
    json.dump(response.json(), file, indent=4)

today = dt.now()
date_today = today.strftime("%Y/%m/%d")
curr_time = today.strftime("%H:%M:%S")

header_data_sheets = {
    "Authorization": f"Basic {SHEETY_AUTH}" 
}

for exercise in data["exercises"]:
    exercise_data = {
        "workout": {
            "date": date_today,
            "time": curr_time,
            "exercise": exercise["name"].title(),
            "durationInMinutes": exercise["duration_min"],
            "calories": exercise["nf_calories"],
        }
    }
    print(exercise_data)
    response = req.post(url=SHEETY_ENDPOINT, json=exercise_data, headers=header_data_sheets)
    print(response.text)
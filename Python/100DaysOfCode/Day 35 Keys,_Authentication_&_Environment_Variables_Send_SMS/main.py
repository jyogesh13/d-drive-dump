import requests as req
import json
import os
from twilio.rest import Client

LATITUDE = "-19.376367442816843"
LONGITUDE = "146.4157620830477"
# API_KEY =  "308ff52660d9de86c0039eade84e6c65"
API_KEY = os.environ.get("API_KEY")
ACCOUNT_SID = "AC5ffcefa5a0ed2019af6ab079732d8d18"
# AUTH_TOKEN = "d3e4a03320a0316df5ca436368367924"
AUTH_TOKEN = os.environ.get("AUTH_TOKEN")


def send_sms():
    client = Client(ACCOUNT_SID, AUTH_TOKEN)

    message = client.messages.create(
    body="It's going to rain today, Remember to bring an umbrella",
    from_="+17542982109",
    to="+918447326048",
    )
    print(message.status)

def get_hourly_forcast_data():
    '''to get hourly forcast data for next 48 hours'''
    url = "https://api.openweathermap.org/data/3.0/onecall"
    parameters = {
        "lat": LATITUDE,
        "lon": LONGITUDE,
        "appid": API_KEY,
        "exclude": "current,minutely,daily,alerts",
    }
    response = req.get(url, params=parameters)
    print(response.status_code)
    hourly_data= response.json()['hourly']

    # with open("hourly_forcast_data.json", "w") as file:
    #     json.dump(hourly_data, file, indent=4)

    is_raining = False
    for data in hourly_data[:12]:
        weather_id = int(data['weather'][0]['id'])
        if weather_id < 700:
            is_raining = True
        
    if is_raining:
        send_sms()


get_hourly_forcast_data()

# print(API_KEY)


'''Set the environment variable:
        $Env:API_KEY = "your_api_key_value"
    To get the value of environment variable: 
        $Env:API_KEY
    To list all the environment variables:
        Get-ChildItem Env:
                
'''
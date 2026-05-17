'''
    An API  (Application programming interface) is a set of commands, functions, protocols, and objects that programmers can use to create software or interact with an external system.
'''
import requests as req
from datetime import datetime
import smtplib 
import time

MY_LAT = 28.65107707827665
MY_LONG = 77.41681686994292
MY_EMAIL = "try.yogeshj@gmail.com"
MY_PASSWORD = "lwwrhpwyodgafrgj"

def is_iss_above_me():
    '''function to check if ISS is around our location'''

    # getting iss position from api
    iss_response = req.get(url='http://api.open-notify.org/iss-now.json')
    iss_response.raise_for_status()
    iss_data = iss_response.json()["iss_position"]

    # ISS latitude and longitude
    iss_latitude = float(iss_data['latitude'])
    iss_longitude = float(iss_data['longitude'])

    
    if (MY_LAT-5 <= iss_latitude <= MY_LAT+5) and (MY_LONG - 5 <= iss_longitude <= MY_LONG + 5):
        return True
    
def is_night():
    '''function to check if it is night time'''

    # getting sunrise and sunset data from api
    parameters = {
        'lat': MY_LAT,
        'lng': MY_LONG,
        'formatted': 0,
    }
    daytiming_response = req.get(url="https://api.sunrise-sunset.org/json",params=parameters)
    data = daytiming_response.json()

    # sunrise and sunset timing of my location
    sunrise = int(data['results']['sunrise'].split('T')[1].split(':')[0])
    sunset = int(data['results']['sunset'].split('T')[1].split(':')[0])
     
    # getting current timing
    current_hour = datetime.now().hour

    if current_hour <= sunrise or current_hour >= sunset:
        return True


def send_mail():
    '''function to send mail to notify me when iss is above me'''
    with smtplib.SMTP("smtp.gmail.com") as connection:
        connection.starttls()
        connection.login(user=MY_EMAIL, password= MY_PASSWORD)
        connection.sendmail(
            from_addr=MY_EMAIL,
            to_addrs="yogeshjoshi1306@gmail.com",
            msg="Subject:ISS notification\n\nInternational space station is going from your location..Look Up!!"
        )
    

while True:
    if is_night and is_iss_above_me:
        send_mail()
    time.sleep(60)

    

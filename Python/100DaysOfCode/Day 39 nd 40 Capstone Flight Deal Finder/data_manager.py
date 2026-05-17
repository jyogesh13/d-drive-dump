import requests as req

SHEETY_URL = "https://api.sheety.co/f3c099714a7c3bbc0d85d1039db27b7a/flightDeals/prices"

class DataManager:
    #This class is responsible for talking to the Google Sheet.
    def __init__(self):
        self.cities_data = {}
        self.get_data()
    
    def get_data(self):
        response = req.get(SHEETY_URL)
        data = response.json()
        self.cities_data = data['prices']
        return self.cities_data
        
    def update_data(self,code):
        for city in self.cities_data:
            parameters = {
                "price":{
                    'iataCode': code,
                }
            }
            response = req.put(f"{SHEETY_URL}/{city['id']}", json=parameters)
            print(response.text)

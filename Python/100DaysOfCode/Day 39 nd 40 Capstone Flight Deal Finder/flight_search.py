import requests as req
from flight_data import FlightData

API_KEY = "xd5WQhpDe34zlamC3yTLGH6UVkYHUJJo"
API_SECRET = "Ms4xgWIt4AYaGKBD"


class FlightSearch:
    #This class is responsible for talking to the Flight Search API.
    def get_iata_codes(self, city_name):
        url = "https://test.api.amadeus.com/v1/reference-data/locations"

        parameters = {
            "subType": "CITY",
            "keyword": city_name,
        }
        header_data = {
            "Authorization": f"Bearer 75bp4uendmtTrH3n9eEzZUQ6Guue",
        }
        response = req.get(url, params=parameters, headers=header_data).json()
        data = response['data']
        code = data[0]['iataCode']
        return response

    def search_flight(self):
        pass

# obj1 = FlightSearch()
# print(obj1.get_iata_codes('Paris'))
# print(obj1.get_iata_codes())

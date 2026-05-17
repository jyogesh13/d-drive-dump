#This file will need to use the DataManager,FlightSearch, FlightData, NotificationManager classes to achieve the program requirements.
from data_manager import DataManager
from flight_search import FlightSearch
from flight_data import FlightData
from notification_manager import NotificationManager


sheet_data = DataManager()
flight_search = FlightSearch()

for city in sheet_data.cities_data:
    if city['iataCode'] == "":
        city['iataCode'] = flight_search.get_iata_codes(city['city'])
        sheet_data.update_data(city['iataCode'])
print(sheet_data.cities_data)
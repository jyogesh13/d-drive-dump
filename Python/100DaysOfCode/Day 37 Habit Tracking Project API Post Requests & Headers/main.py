import requests as req
from datetime import datetime

USERNAME = "yogesh13"
TOKEN = "hj4kale6ksdkwll3sshe2ui"
GRAPHID = "graph1"


pixela_endpoint = "https://pixe.la/v1/users"

post_parameters = {
    "token": TOKEN,
    "username": USERNAME,
    "agreeTermsOfService": "yes",
    "notMinor": "yes",
}

'''creating new user'''
# response = req.post(url=pixela_endpoint, json=post_parameters)
# print(response.text)

'''creating a graph'''
graph_endpoint = f"{pixela_endpoint}/{USERNAME}/graphs"

graph_config = {
    "id": GRAPHID,
    "name": "Coding graph",
    "unit": "hours",
    "type": "float",
    "color": "ichou",
}

header_data = {
    "X-USER-TOKEN": TOKEN,
}

# response = req.post(url=graph_endpoint, json=graph_config, headers=header_data)
# print(response.text)

'''mapping pixel data onto graph'''

today = datetime.now()


pixel_endpoint = f"{pixela_endpoint}/{USERNAME}/graphs/{GRAPHID}"
pixel_config = {
    "date": today.strftime("%Y%m%d"),
    "quantity": input("How many hours you code today? "),
}

response = req.post(url=pixela_endpoint, json=pixel_config, headers=header_data)
print(response.text)


'''deleting the user'''
# url = "https://pixe.la/v1/users/yogesh13"
# response = req.delete(url=url,headers=header_data)
# print(response.text)

'''updating a pixel data'''
# url = "https://pixe.la/v1/users/{username}/graphs/{graphId}/{date}"
# updated_data = {
#     "quantity": "2.4",
# }
# response = req.put(url=url, json=updated_data, headers=header_data)
# print(response.text)
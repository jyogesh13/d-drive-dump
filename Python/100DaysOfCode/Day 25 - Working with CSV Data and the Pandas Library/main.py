'''reading temp column from csv file'''
# import csv
# with open("weather-data.csv",'r') as data_file:
#     data = csv.reader(data_file)
#     temperature = []
#     for row in data:
#         try:
#             row_value = int(row[1])
#             temperature.append(row_value)
#         except ValueError:
#             pass   
# print(temperature)


'''using pandas to do above task'''
import pandas as pd
data = pd.read_csv("weather-data.csv")
# print(data)

#Getting data in a column
# print(data['temp'])
# print(data.temp)

'''
    Dataframe(2-D): a table in pandas
    Series(1-D): a single column in a dataframe  
'''

'''challenge 1: Calculate average temperature'''
# temp_list = data['temp'].to_list()
# avg_temp = round(data['temp'].mean(),2)
# max_temp = data.temp.max()
# print(temp_list)
# print(avg_temp)
# print(max_temp)


#accessing row (dataframe_name[dataframe_name.column_name == value])
'''challenge 2: print the row of data which had the highest temperature'''
# print(data[data.temp == max_temp])

#accessing row and then a particular column of that row
monday = data[data.day == 'Monday']
print(monday.temp)
monday_temp_F = (monday.temp * 9/5) + 32
print(monday_temp_F)


#creating a dataframe from scratch
# data_dict = {
#     "Players":['Rohit','Kohli','Ronaldo','Messi'],
#     "Country":['India','India','Portugal','Argentina'],
#     "Sport":['Cricket','Cricket','Football','Football'],
# }
# data = pd.DataFrame(data_dict)
# data.to_csv('new_csv.csv')

# data = pd.read_csv('new_csv.csv')
# new_data = data.drop(axis=1,columns=data.columns[0:1])
# print(new_data)


# data = pd.read_csv('2018-Central-Park-Squirrel-Census-Squirrel-Data.csv')
# squirrel_count = {
#     'Fur color':['gray','red','black'],
#     'count':[],
# }
# grey_squirrel_count = len(data[data['Primary Fur Color'] == 'Gray'] )

# red_squirrel_count = len(data[data['Primary Fur Color'] == 'Cinnamon'])

# black_squirrel_count = len(data[data['Primary Fur Color'] == 'Black'])



# squirrel_count['count'] = [grey_squirrel_count, red_squirrel_count, black_squirrel_count]


# df = pd.DataFrame(squirrel_count)
# df.to_csv('squirrel_count.csv')

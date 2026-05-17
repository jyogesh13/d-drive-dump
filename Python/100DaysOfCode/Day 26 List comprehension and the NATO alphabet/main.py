#list comprehension: new_list = [new_item for item in iterable_sequence]
#list comprehension with condition: new_list = [new_item for item in iterable_sequence if condition]
'''challenge 1: squaring numbers'''
# numbers = [1,1,2,3,5,8,13,21,34,55]
# squared_numbers = [num ** 2 for num in numbers]
# print(squared_numbers)

'''challenge 2: new list should only contain the even numbers from the original list'''
# numbers = [1,1,2,3,5,8,13,21,34,55]
# result = [num for num in numbers if num % 2 == 0]
# print(result) 

'''challenge 3: you are going to create a list called result which contains the numbers that are common in both files'''
#way1
# with open('./file1.txt') as file:
#     file1_content = file.read().split('\n')
# with open('./file2.txt') as file:
#     file2_content = file.read().split('\n')

# common_num = set([int(num) for num in file1_content if num in file2_content])
# print(list(common_num))

#way2
# with open('./file1.txt') as file:
#     file1_content = file.readlines()
# with open('./file2.txt') as file:
#     file2_content = file.readlines()

# result = [int(num) for num in file1_content if num in file2_content]
# print(result)

#Dictionary comprehension from list: {new_key:new_value for item in list}
#Dictionary comprehension from dictionary: {new_key:new_value for (key,value) in dict.items()}
#Dictionary comprehension with condition: {new_key:new_value for (key,value) in dict.items() if condition}
'''example'''
# names = ['Alex','Beth','Caroline','Dave','Eleanor','Freddie']
# import random
# student_scores = {student:random.randint(1,100) for student in names}
# passed_students = {student:score for (student,score) in student_scores.items() if score > 40}
# print(student_scores)
# print(passed_students)

'''challenge 1: create a dictionary that takes word from a sentence and calculates the number of letters in each word'''
# sentence = "What is the Airspeed Velocity of an Unladen Swallow?"
# result = {word:len(word) for word in sentence.split()}
# print(result)

'''challenge 2: you are going to convert degree celsius to degree farenheight'''
weather_c = {
    'Monday':12,
    'Tuesdays':14,
    'Wednesday':15,
    'Thrusday':14,
    'Friday':21,
    'Saturday':22,
    'Sunday':24,
}
# weather_f = {day:(temp_c * 9/5)+32 for (day,temp_c) in weather_c.items()}
# print(weather_f)

# print(weather_c.items())  #.items() returns dic_items
import pandas
weather_df = pandas.DataFrame(list(weather_c.items()), columns=['Day','Temperature']) #as we have only scalar/non-iterable value in our dictionary
# print(weather_df)

'''looping through dataframe'''
#without pandas built-in function
# for (key,value) in weather_df.items():
#     print(key)
#     print(value)

# with pandas built-in function .iterrows()
for (index,row) in weather_df.iterrows():
    # print(index)
    # if index %2 == 0:
    #     # print(row.Day,'\n')
    #     print(row.Temperature,'\n')
    if row.Day == 'Thrusday':
        print(row.Temperature)
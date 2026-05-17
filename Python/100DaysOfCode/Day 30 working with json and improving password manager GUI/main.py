'''Error handling'''
#Challenge 1
'''
error code: for indexError print default value "fruit pie"
    fruits = ['Apple', 'Pear', 'Orange']
    def make_pie(index):
        fruit = fruits[index]
        print(fruit + 'pie')
    
    make_pie(4)
'''
# fruits = ['Apple', 'Pear', 'Orange']
# def make_pie(index):
#     try:
#         fruit = fruits[index]
#     except IndexError:
#         print("fruit pie")
#     else:
#         print(fruit + 'pie')

# make_pie(4)

'''
Challenge 2: detect the error and treat post without any likes as 0 likes
    facebook_posts = [
    {'likes': 21, 'comments':2},
    {'likes': 13, 'comments':2, 'shares': 1},
    {'likes': 33, 'comments':8, 'shares': 3},
    {'comments':2, 'shares': 2},
    {'comments':2, 'shares': 1},
    {'likes': 19, 'comments':3},
    ]

    total_likes = 0

    for post in facebook_posts:
        total_likes += post['likes']

    print(total_likes)
'''
# facebook_posts = [
#     {'likes': 21, 'comments':2},
#     {'likes': 13, 'comments':2, 'shares': 1},
#     {'likes': 33, 'comments':8, 'shares': 3},
#     {'comments':2, 'shares': 2},
#     {'comments':2, 'shares': 1},
#     {'likes': 19, 'comments':3},
#     ]

# total_likes = 0

# for post in facebook_posts:
#     try:
#         total_likes += post['likes']
#     except KeyError:
#         # total_likes += 0 or
#         pass

# print(total_likes)


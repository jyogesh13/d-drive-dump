from itertools import permutations
from math import factorial
from collections import defaultdict


def permutation_count(text: str) -> int:
    # letters = dict()
    # for letter in text:
    #     if letter in letters:
    #         letters[letter] += 1
    #     else:
    #         letters[letter] = 1
    letters = defaultdict(int)
    for letter in text:
        letters[letter] += 1
    numerator = factorial(len(text))
    factors = [factorial(count) for count in letters.values()]
    denominator = 1
    for factor in factors:
        denominator *= factor
    return numerator // denominator


perms = {"".join(i) for i in permutations("barbarian")}
# print(perms)
print(len(perms))

print(permutation_count("barbarian"))

'''
D:\course\Learning\Python\Discrete maths python implementation\permo01.py
'''
import pandas as pd

#TODO 1. Create a dictionary in this format:
df = pd.read_csv('./NATO-alphabet/nato_phonetic_alphabet.csv')
phonetic_names ={row.letter:row.code for (_,row) in df.iterrows()}

#TODO 2. Create a list of the phonetic code words from a word that the user inputs.
usr_input = input("Enter a word: ").upper()
phonetic_output = [phonetic_names[char] for char in usr_input]
print(phonetic_output)

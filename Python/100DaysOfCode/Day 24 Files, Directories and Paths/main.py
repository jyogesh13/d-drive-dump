#TODO: Create a letter using starting_letter.txt 
#for each name in invited_names.txt
#Replace the [name] placeholder with the actual name.
#Save the letters in the folder "ReadyToSend".
    
#Hint1: This method will help you: https://www.w3schools.com/python/ref_file_readlines.asp
    #Hint2: This method will also help you: https://www.w3schools.com/python/ref_string_replace.asp
        #Hint3: THis method will help you: https://www.w3schools.com/python/ref_string_strip.asp

PLACEHOLDER = '[name]'

#reading starting letter
with open('./Input/Letters/starting_letter.txt','r') as letter_file:
    letter = letter_file.read()

#importing the names from invited_names.txt
with open('./Input/Names/invited_names.txt','r') as name_file:
    names = name_file.readlines()

    #replacing [name] with every name in the invited_names.txt
    for name in names:
        stripped_name = name.strip()
        with open(f'./Output/ReadyToSend/Invitation_to_{stripped_name}','w') as file:
            content = letter.replace(PLACEHOLDER, f"{stripped_name}")
            file.write(content)

            

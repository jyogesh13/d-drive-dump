'''For questions like these visit opentrivia database'''
import requests

question_data = []

def generate_ques():
    url = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean' 
    response = requests.get(url)
    data = response.json()
    results = data.get('results',[])
    for result in results:
        question_data.append(
            {
                'text': result['question'],
                'answer': result['correct_answer']
            }
        )


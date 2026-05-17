import data
from question_model import Question
from quiz_brain import QuizBrain

question_bank = []

data.generate_ques()

for question in data.question_data:
    ques_text = question['text']
    ques_answer = question['answer']
    question_bank.append(Question(ques_text,ques_answer))

quiz = QuizBrain(question_bank)
while quiz.still_has_questions():
    quiz.next_question()

print(f"Congrats!! You have completed the quiz.")
print(f"Your final score was: {quiz.score}/{quiz.question_number}")

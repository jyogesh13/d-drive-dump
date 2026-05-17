from tkinter import *
from quiz_brain import QuizBrain

THEME_COLOR = "#375362"
FONT_NAME= 'Arial'

class QuizInterface:

    def __init__(self, quizbrain: QuizBrain):

        self.quiz = quizbrain

        self.window = Tk()
        self.window.title('Quizzler')
        self.window.config(padx=20, pady=20, background=THEME_COLOR)

        self.score_label = Label(text="Score: 0",fg='white',bg=THEME_COLOR)
        self.score_label.grid(column=1, row=0)

        self.canvas = Canvas(width=300, height=250, bg='white')
        self.ques_text = self.canvas.create_text(
            150, 
            125, 
            text="This is a sample text", 
            width=280,
            fill=THEME_COLOR,
            font=(FONT_NAME, 20, "italic"),
            )
        self.canvas.grid(column=0, row=1, columnspan=2, pady=50)

        true_photo_image = PhotoImage(file="images/true.png")
        self.tick_btn = Button(image=true_photo_image,highlightthickness=0, command=self.answer_true)

        self.tick_btn.grid(column=0, row=2)

        false_photo_image = PhotoImage(file="images/false.png")
        self.cross_btn = Button(image=false_photo_image, highlightthickness=0, command=self.answer_false)
        self.cross_btn.grid(column=1, row=2)

        self.gen_next_ques()

        self.window.mainloop()
    
    def gen_next_ques(self):
        self.canvas.config(bg='white')
        if self.quiz.still_has_questions():
            q_text = self.quiz.next_question()
            self.score_label.config(text=f"Score: {self.quiz.score}")
            self.canvas.itemconfig(self.ques_text, text= q_text)
        else:
            self.canvas.itemconfig(self.ques_text, text=f"You have reached the end\nYour final score is: {self.quiz.score}/{self.quiz.question_number}")
            self.tick_btn.config(state='disabled')
            self.cross_btn.config(state='disabled')
    
    def answer_true(self):
        self.give_feedback(self.quiz.check_answer("True"))

    def answer_false(self):
        is_right = self.quiz.check_answer("False")
        self.give_feedback(is_right)
        

    def give_feedback(self, is_right: bool):
        if is_right:
            self.canvas.config(bg='Green')
        else:
            self.canvas.config(bg='red')
        self.window.after(500, self.gen_next_ques)
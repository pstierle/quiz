import { useEffect, useMemo, useState } from "react";
import { fetchQuestions } from "../api/quiz";
import { IAnswer } from "../model/IAnswer";
import { IQuestion } from "../model/IQuestion";
import Question from "../Question";

function Quiz() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleAnswer = (answer: string, id: number) => {
    let updatedAnswers = [...answers];
    updatedAnswers.forEach((a) => {
      if (a.id === id) a.answer = answer;
    });
    setAnswers(updatedAnswers);
  };

  const results = useMemo(() => {
    let correctAnswers = 0;
    questions.forEach((question, i) => {
      if (
        answers.find((answer) => answer.id === i)?.answer ===
        question.correct_answer
      ) {
        correctAnswers++;
      }
    });
    return `You scored ${correctAnswers}/${questions.length} correct answers.`;
  }, [questions, answers]);

  const checkAnswers = () => {
    setShowResults(true);
  };

  const getQuestions = async () => {
    const questionsData = await fetchQuestions();
    setQuestions(questionsData);
    setShowResults(false);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    // whenerver questions change, reset answers
    let answers: IAnswer[] = [];
    questions.forEach((question, i) => {
      answers.push({ id: i });
    });
    setAnswers(answers);
  }, [questions, setAnswers]);

  return (
    <div className="min-h-full flex justify-center items-center">
      <div className="flex flex-col gap-4 w-1/2">
        {questions.map((question, i) => (
          <Question
            key={i}
            question={question}
            onSelectAnswer={(answer: string) => handleAnswer(answer, i)}
            selectedAnswer={answers.find((a) => a.id === i)?.answer}
            showResults={showResults}
          />
        ))}
        {showResults ? (
          <div className="flex justify-center items-center gap-3">
            <p className="text-indigo-800 font-bold text-xl">{results}</p>
            <button
              className="bg-indigo-800 rounded-2xl py-2 text-white w-1/3"
              onClick={getQuestions}
            >
              Play again
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              className="bg-indigo-800 rounded-2xl py-2 text-white w-1/3"
              onClick={checkAnswers}
            >
              Check answers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;

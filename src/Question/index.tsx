import { useEffect, useState } from "react";
import { IQuestion } from "../model/IQuestion";

interface Props {
  question: IQuestion;
  selectedAnswer?: string;
  showResults: boolean;
  onSelectAnswer: (answer: string) => void;
}

function Question({
  question,
  onSelectAnswer,
  selectedAnswer,
  showResults,
}: Props) {
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const allAnswers = [...question.incorrect_answers];
    const randomPosition = Math.floor(
      Math.random() * (question.incorrect_answers.length - 0 + 1) + 0
    );
    allAnswers.splice(randomPosition, 0, question.correct_answer);
    setAnswers(allAnswers);
  }, [question, setAnswers]);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl font-semibold">{question.question}</h1>
      <div className="flex gap-4">
        {answers.map((answer, i) => (
          <button
            disabled={showResults}
            key={i}
            onClick={() => {
              onSelectAnswer(answer);
            }}
            className={`rounded-xl py-1 px-2 transition-all ${
              selectedAnswer === answer
                ? "border-indigo-800 border-2"
                : "border-gray-600 border"
            } ${
              showResults && answer === question.correct_answer
                ? "bg-green-200"
                : showResults &&
                  answer !== question.correct_answer &&
                  selectedAnswer === answer
                ? "bg-red-200"
                : ""
            }`}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;

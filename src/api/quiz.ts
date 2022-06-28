import axios from "axios";
import { IQuestion } from "../model/IQuestion";

export const fetchQuestions = async () => {
  const { data } = await axios.get<IQuestion[]>(
    `https://opentdb.com/api.php?amount=5&type=multiple`
  );

  const questions = (data as any).results as IQuestion[];

  return questions;
};

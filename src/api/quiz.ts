import axios from "axios";
import { IQuestion } from "../model/IQuestion";

const token =
  "&token=d0f8fd06dcb556eb2d60ae6b304504d97f0169a44265f5ce974772079212374f";

export const fetchQuestions = async () => {
  const { data } = await axios.get<IQuestion[]>(
    `https://opentdb.com/api.php?amount=5&type=multiple${token}`
  );

  const questions = (data as any).results as IQuestion[];

  return questions;
};

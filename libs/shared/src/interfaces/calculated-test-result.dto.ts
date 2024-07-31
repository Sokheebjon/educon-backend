interface ICalculatedSingleTestResult {
  subject_id: string;
  correct_answers: number;
}
export interface ICalculatedTestResult {
  data: ICalculatedSingleTestResult[];
}

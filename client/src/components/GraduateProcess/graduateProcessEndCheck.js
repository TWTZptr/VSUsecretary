export const graduateProcessEndCheck = (students) => {
  for (const student of students) {
    if (
      !student.degreeWork.firstQuestion.length ||
      !student.degreeWork.secondQuestion.length ||
      !student.degreeWork.mark ||
      !student.degreeWork.firstQuestionAuthorId ||
      !student.degreeWork.secondQuestionAuthorId ||
      !student.degreeWork.notes.length ||
      !student.degreeWork.summary.length
    ) {
      console.log(student)
      return false;
    }
  }

  return true;
};

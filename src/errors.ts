interface ErrorsI {
  incorrectApi: string;
  incorrectParams: string
  sportAlreadyExists: string;
  sportDoesNotExist: string;
  userAlreadyExists: string;
  userDoesNotExist: string;
  highscoreNotAnNumber: string;
}

const errorCodes: ErrorsI = {
  incorrectApi: "incorrect_api",
  incorrectParams: "incorrect_parameters",
  sportAlreadyExists: "sport_already_exists",
  sportDoesNotExist: "sport_does_not_exist",
  userAlreadyExists: "user_already_exists",
  userDoesNotExist: "user_does_not_exist",
  highscoreNotAnNumber: "highscore_not_a_number",
};
export default errorCodes;

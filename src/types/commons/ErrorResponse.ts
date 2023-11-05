type ErrorReponse = {
  status: number;
  type: string;
  title: string;
  detail: string;
  message?: string;
};

export default ErrorReponse;

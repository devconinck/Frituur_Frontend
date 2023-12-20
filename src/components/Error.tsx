import { isAxiosError } from "axios";

interface ErrorProps {
  error: typeof isAxiosError;
}

export default function Error({ error }: ErrorProps) {
  if (isAxiosError(error)) {
    return (
      <div
        data-cy="error"
        className="flex flex-col items-center text-xl text-red-500"
      >
        <p className="text-xs">{error.response?.data.message}</p>
      </div>
    );
  } else {
    return null;
  }
}

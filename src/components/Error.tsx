import { isAxiosError } from "axios";

interface ErrorProps {
  error: typeof isAxiosError;
}

export default function Error({ error }: ErrorProps) {
  return (
    <div className="flex flex-col items-center text-xl text-red-500">
      <h4 className="text-xl text-red-500">An unexpected error occured</h4>
      <p className="text-xs">{error?.response?.data.message}</p>
    </div>
  );
}

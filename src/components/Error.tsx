import { isAxiosError } from "axios";
import Link from "next/link";
import { Button } from "./ui/button";

interface ErrorProps {
  error: typeof isAxiosError;
}

export default function Error({ error }: ErrorProps) {
  if (isAxiosError(error) && error.response?.data.statusCode === 401) {
    return (
      <div
        data-cy="error"
        className="flex flex-col items-center text-xl font-semibold text-red-500"
      >
        <p className="text-lg">Your session has expired</p>
        <Button className="mt-3" variant={"destructive"}>
          <Link href="/login"> Please login again</Link>
        </Button>
      </div>
    );
  } else if (isAxiosError(error)) {
    return (
      <div
        data-cy="error"
        className="flex flex-col items-center text-xl font-semibold text-red-500"
      >
        <p text-lg>{error.response?.data.message}</p>
      </div>
    );
  } else {
    return null;
  }
}

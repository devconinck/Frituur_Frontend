import { isAxiosError } from "axios";

interface ErrorProps {
  error: Error;
}

export default function Error({ error }: ErrorProps) {
  if (isAxiosError(error)) {
    return (
      <div className="flex flex-col items-center">
        <h4 className="text-xl text-red-500">Oops, something went wrong</h4>
        <p className="text-lg text-slate-500">
          {error.response?.data?.message || error.message}
          {error.response?.data?.details && (
            <>
              :
              <br />
              {JSON.stringify(error.response.data.details)}
            </>
          )}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-xl text-red-500">
        <h4 className="text-xl text-red-500">An unexpected error occured</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null;
}

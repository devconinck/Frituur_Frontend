import { isAxiosError } from "axios";

import { AxiosError } from "axios";

interface ErrorProps {
  error: Error | AxiosError;
}

export default function Error({ error }: ErrorProps) {
  if (isAxiosError(error)) {
    return (
      <div className="alert alert-danger">
        <h4 className="alert-heading">Oops, something went wrong</h4>
        <p>
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
      <div className="alert alert-danger">
        <h4 className="alert-heading">An unexpected error occured</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null;
}

import { get } from "http";
import useSWR from "swr";

export default function CustomerCardForm() {
  const { points } = useSWR("/customer-card", () => getCustomerCardById(1));
  return (
    <>
      <div>Here comes all the customer card settings and information</div>
      <div className=" h-72  w-96 rounded-lg  border-4 border-slate-500 bg-green-300 p-2">
        <span>Frituur d'Aa</span>
        <div className="flex grow"></div>
        <span>Points: {points}</span>
        <div
          style={{ backgroundImage: `url(/Logo.png)` }}
          className="min-w-fit-content h-32 w-32 bg-cover"
        ></div>
      </div>
    </>
  );
}

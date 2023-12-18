import { get } from "http";
import Image from "next/image";
import useSWR from "swr";

export default function CustomerCardForm() {
  return (
    <>
      <div>Customer Cards are coming soon</div>
      <div className="flex h-64 w-96 items-center  justify-center rounded-lg  border-4 border-slate-500 bg-green-300 p-2">
        <Image
          alt="Frituur d'Aa logo"
          src="/Logo.PNG"
          width={230}
          height={230}
        />
      </div>
    </>
  );
}

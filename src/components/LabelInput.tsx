import { useFormContext } from "react-hook-form";

interface LabelInputProps {
  label: string;
  name: string;
  type: string;
  validationRules: any;
}

export default function LabelInput({
  label,
  name,
  type,
  validationRules,
  ...rest
}: LabelInputProps) {
  const { register, isSubmitting, errors } = useFormContext();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        {...register(name, validationRules)}
        id={name}
        type={type}
        disabled={isSubmitting}
        autoComplete="off"
        className="mt-1 w-full rounded-md border border-slate-600 p-2"
        {...rest}
      />
    </div>
  );
}

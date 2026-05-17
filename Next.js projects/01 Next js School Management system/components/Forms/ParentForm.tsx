"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { parentSchema } from "@/lib/formValidationSchema";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
} from "react";
import { toast } from "react-toastify";
import {
  createParent,
  updateParent,
} from "@/lib/actions";


const ParentForm = ({
  type,
  setOpen,
  data,
}: {
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(parentSchema),
  });

  const label = type === "create" ? "Create" : "Update";

  const [state, formAction, isPending] = useActionState(
    type === "create" ? createParent : updateParent,
    {
      success: false,
      error: false,
    },
  );

  useEffect(() => {
    if (state.success) {
      toast(`Parent has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
    }
  }, [state, type, setOpen]);

  return (
      <form
        action={formAction}
        className="p-2 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-100px)]"
      >
        <h1 className="text-xl font-semibold">
          {type === "create"
            ? `Create a new parent`
            : `Update parent information`}
        </h1>
        {/* authentication information */}
        <h2 className="text-[14px] text-gray-400 font-medium">
          Authentication information
        </h2>
        <div className="flex justify-between flex-wrap gap-4 mb-4">
          {data && (
            <InputField
              label="Id"
              register={register}
              name="id"
              defaultValue={data?.id}
              error={errors?.id}
              hidden
            />
          )}
          <InputField
            label="Username"
            register={register}
            name="username"
            defaultValue={data?.username}
            error={errors?.username}
          />
          <InputField
            label="Email"
            type="email"
            register={register}
            name="email"
            defaultValue={data?.email}
            error={errors?.email}
          />
          <InputField
            label="Password"
            type="password"
            register={register}
            name="password"
            defaultValue={data?.password}
            error={errors?.password}
          />
        </div>
        {/* Personal information */}
        <h2 className="text-[14px] text-gray-400 font-medium">
          Personal information
        </h2>
        <div className="flex justify-between  flex-wrap gap-4">
          <InputField
            label="First Name"
            register={register}
            name="name"
            defaultValue={data?.name}
            error={errors?.name}
          />
          <InputField
            label="Last Name"
            register={register}
            name="surname"
            defaultValue={data?.surname}
            error={errors?.surname}
          />
          <InputField
            label="Phone"
            register={register}
            name="phone"
            defaultValue={data?.phone}
            error={errors?.phone}
          />
          <InputField
            label="Address"
            register={register}
            name="address"
            defaultValue={data?.address}
            error={errors?.address}
          />          
        </div>
        {state.error && (
          <p className={`text-sm text-red-600 `}>
            An error occurred while creating student
          </p>
        )}
        <button
          disabled={isPending}
          className="bg-blue-400 rounded-md w-full text-white p-2 "
        >
          {isPending ? `${label}ing...` : label}
        </button>
      </form>
  );
};

export default ParentForm;

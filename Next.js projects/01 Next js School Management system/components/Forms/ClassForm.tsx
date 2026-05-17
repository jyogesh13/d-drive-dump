"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  ClassSchema,
  classSchema,
  ClassSchemaInput,
} from "@/lib/formValidationSchema";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { createClass, updateClass } from "@/lib/actions";
import { toast } from "react-toastify";

type RelatedData = {
  teachers?: { id: string; name: string; surname: string }[];
  grades?: { id: number; level: number }[];
};

const ClassForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  relatedData?: RelatedData;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchemaInput, any, ClassSchema>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: data?.name ?? "",
      capacity: data?.capacity ?? 0,
      gradeId: data?.gradeId ?? 1,
      supervisorId: data?.supervisorId ?? "",
    },
  });

  const label = type === "create" ? "Create" : "Update";

  const [state, formAction, isPending] = useActionState(
    type === "create" ? createClass : updateClass,
    { success: false, error: false },
  );

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formAction(formData);
  });

  useEffect(() => {
    if (state.success) {
      toast(`Class has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
    }
  }, [state, type, setOpen]);

  const teachers = relatedData?.teachers || [];
  const grades = relatedData?.grades || [];

  return (
    <form
      onSubmit={onSubmit}
      className="p-2 flex flex-col gap-6 overflow-y-scroll max-h-[calc(100vh-100px)]"
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? `Create a new class` : `Update class information`}
      </h1>
      <div className="flex justify-between flex-wrap gap-4 mb-4">
        <InputField
          label="Class name"
          type="text"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          type="number"
          register={register}
          name="capacity"
          defaultValue={data?.capacity}
          error={errors?.capacity}
        />
        <InputField
          label="Id"
          type="text"
          register={register}
          name="id"
          defaultValue={data?.id}
          error={errors?.id}
          hidden
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="gradeId" className="text-xs text-gray-500">
            Grade
          </label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            id="gradeId"
            name="gradeId"
          >
            {grades.map((grade) => (
              <option value={grade.id} key={grade.id}>
                {grade.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors.gradeId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="supervisorId" className="text-xs text-gray-500">
            Supervisor
          </label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("supervisorId")}
            name="supervisorId"
            id="supervisorId"
            defaultValue={data?.teachers}
          >
            {teachers.map((teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name + " " + teacher.surname}
              </option>
            ))}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <p className={`text-sm text-red-600 `}>
          An error occurred while creating class
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

export default ClassForm;

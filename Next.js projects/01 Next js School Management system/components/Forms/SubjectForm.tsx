"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { subjectSchema } from "@/lib/formValidationSchema";
import { createSubject, updateSubject } from "@/lib/actions";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
} from "react";
import { toast } from "react-toastify";

const SubjectForm = ({
  type,
  setOpen,
  data,
  relatedData,
}: {
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  relatedData?: any;
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: data?.name ?? "",
    },
  });

  const [state, formAction, isPending] = useActionState(
    type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    },
  );

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
    }
  }, [state, type, setOpen]);

  const { teachers } = relatedData;

  return (
    <>
      <form
        action={formAction}
        className="p-2 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-100px)]"
      >
        <h1 className="text-xl font-semibold">
          {type === "create"
            ? `Create a new Subject`
            : `Update Subject information`}
        </h1>
        <div className="flex justify-between flex-wrap gap-4 mb-4">
          <InputField
            label="Subject name"
            register={register}
            name="name"
            error={errors?.name}
          />
          {data && (
            <InputField
              label="Id"
              register={register}
              name="id"
              defaultValue={data?.id}
              error={errors?.name}
              hidden
            />
          )}
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label htmlFor="teacher" className="text-xs text-gray-400">
              Teachers
            </label>
            <select
              multiple
              id="teacher"
              {...register("teachers")}
              name="teachers"
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
              defaultValue={data?.teachers}
            >
              {teachers.map(
                (teacher: { id: string; name: string; surname: string }) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name + " " + teacher.surname}
                  </option>
                ),
              )}
            </select>
            {errors.teachers?.message && (
              <p className="text-xs text-red-400">
                {errors.teachers.message.toString()}
              </p>
            )}
          </div>
        </div>
        {state.error && (
          <p className={`text-sm text-red-600 `}>
            An error occurred while creating subject
          </p>
        )}
        <button
          disabled={isPending}
          className="bg-blue-400 rounded-md w-full text-white p-2 "
        >
          {isPending
            ? type === "create"
              ? "Creating..."
              : "Updating..."
            : type === "create"
              ? "Create"
              : "Update"}
        </button>
      </form>
    </>
  );
};

export default SubjectForm;

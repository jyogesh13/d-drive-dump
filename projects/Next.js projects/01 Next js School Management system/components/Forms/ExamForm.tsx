"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { examSchema } from "@/lib/formValidationSchema";
import { createExam, updateExam } from "@/lib/actions";
import { toast } from "react-toastify";

type RelatedData = {
  lessons?: { id: number; name: string }[];
};

const ExamForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  relatedData?: RelatedData;
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(examSchema),
    defaultValues: {
      ...data,
    },
  });

  const label = type === "create" ? "Create" : "Update";

  const [state, formAction, isPending] = useActionState(
    type === "create" ? createExam : updateExam,
    {
      success: false,
      error: false,
    },
  );

  useEffect(() => {
    if (state.success) {
      toast(`Exam has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
    }
  }, [state, type, setOpen]);

  const lessons = relatedData?.lessons || [];

  return (
    <form
      action={formAction}
      className="p-2 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-100px)]"
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? `Create a new Exam` : `Update Exam information`}
      </h1>
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
          label="Title"
          register={register}
          name="title"
          defaultValue={data?.title}
          error={errors?.title}
        />
        <InputField
          label="Start Time"
          type="datetime-local"
          register={register}
          name="startTime"
          defaultValue={data?.startTime.toISOString().split("T")[0]}
          error={errors?.startTime}
        />
        <InputField
          label="End Time"
          type="datetime-local"
          register={register}
          name="datetime"
          defaultValue={data?.endTime.toISOString().split("T")[0]}
          error={errors?.endTime}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="lesson" className="text-xs text-gray-400">
            Lessons
          </label>
          <select
            id="lesson"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("lessonId")}
            defaultValue={data?.lessonId}
          >
            {lessons?.map((lesson) => (
              <option value={lesson.id} key={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          {errors.lessonId?.message && (
            <p className="text-xs text-red-400">
              {errors.lessonId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <p className={`text-sm text-red-600 `}>
          An error occurred while creating exam
        </p>
      )}
      <button className="bg-blue-400 rounded-md w-full text-white p-2 ">
        {isPending ? `${label}ing...` : label}
      </button>
    </form>
  );
};

export default ExamForm;

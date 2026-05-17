"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { lessonSchema } from "@/lib/formValidationSchema";
import { createLesson, updateLesson } from "@/lib/actions";
import { toast } from "react-toastify";

type RelatedData = {
  teachers?: { id: string; name: string; surname: string }[];
  classes?: { id: number; name: string }[];
  subjects?: { id: number; name: string }[];
};

const LessonForm = ({
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
    resolver: zodResolver(lessonSchema),
  });

  const [state, formAction, isPending] = useActionState(
    type === "create" ? createLesson : updateLesson,
    {
      success: false,
      error: false,
    },
  );

  useEffect(() => {
    if (state.success) {
      toast(`Lesson has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
    }
  }, [state, type, setOpen]);

  const teachers = relatedData?.teachers || [];
  const subjects = relatedData?.subjects || [];
  const classes = relatedData?.classes || [];

  return (
    <form
      action={formAction}
      className="p-2 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-100px)]"
    >
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? `Create a new Lesson`
          : `Update Lesson information`}
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
          label="Name"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors?.name}
        />
        <InputField
          label="Start Time"
          register={register}
          name="startTime"
          defaultValue={data?.startTime.toISOString().slice(0, 16)}
          error={errors?.startTime}
          type="datetime-local"
          min="08:00"
          max="17:00"
        />
        <InputField
          label="End Time"
          register={register}
          name="endTime"
          defaultValue={data?.endTime.toISOString().slice(0, 16)}
          error={errors?.endTime}
          type="datetime-local"
          min="08:00"
          max="17:00"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="day" className="text-xs text-gray-400">
            Day
          </label>
          <select
            id="day"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("day")}
            defaultValue={data?.day}
            name="day"
          >
            <option value="MONDAY">Monday</option>
            <option value="TUESDAY">Tuesday</option>
            <option value="WEDNESDAY">Wednesday</option>
            <option value="THURSDAY">Thursday</option>
            <option value="FRIDAY">Friday</option>
          </select>
          {errors.day?.message && (
            <p className="text-xs text-red-400">
              {errors.day.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="subject" className="text-xs text-gray-400">
            Subject
          </label>
          <select
            id="subject"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("subjectId")}
            defaultValue={data?.subjectId}
            name="subjectId"
          >
            {subjects.map((subject) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjectId?.message && (
            <p className="text-xs text-red-400">
              {errors.subjectId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="class" className="text-xs text-gray-400">
            Class
          </label>
          <select
            id="class"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("classId")}
            defaultValue={data?.classId}
            name="classId"
          >
            {classes.map((classItem) => (
              <option value={classItem.id} key={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="teacherId" className="text-xs text-gray-400">
            Teacher
          </label>
          <select
            id="teacherId"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("teacherId")}
            defaultValue={data?.lessonId}
            name="teacherId"
          >
            {teachers.map((teacher) => (
              <option value={teacher.id} key={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
          {errors.teacherId?.message && (
            <p className="text-xs text-red-400">
              {errors.teacherId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <p className={`text-sm text-red-600 `}>
          An error occurred while creating Lesson
        </p>
      )}
      <button className="bg-blue-400 rounded-md w-full text-white p-2 ">
        {isPending
          ? type === "create"
            ? "Creating..."
            : "Updating..."
          : type === "create"
            ? "Create"
            : "Update"}
      </button>
    </form>
  );
};

export default LessonForm;

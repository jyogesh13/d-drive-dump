"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createAttendance, updateAttendance } from "@/lib/actions";
import { toast } from "react-toastify";
import { attendanceSchema } from "@/lib/formValidationSchema";
import InputField from "../InputField";
import { formatDateTimeLocal } from "@/lib/utils";

type RelatedData = {
  students?: { id: string; name: string; surname: string }[];
  lessons?: { id: number; name: string }[];
};

const AttendanceForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: RelatedData;
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      studentId: data?.studentId ?? "",
      lessonId: data?.lessonId ?? undefined,
      date: data?.date ? formatDateTimeLocal(data.date) : "",
      present: data?.present ?? true,
    },
  });

  const label = type === "create" ? "Create" : "Update";

  const [state, formAction, isPending] = useActionState(
    type === "create" ? createAttendance : updateAttendance,
    { success: false, error: false },
  );

  useEffect(() => {
    if (state.success) {
      toast(
        `Attendance has been ${type === "create" ? "created" : "updated"}!`,
      );
      setOpen(false);
    }
  }, [state, setOpen, type]);

  const students = relatedData?.students ?? [];
  const lessons = relatedData?.lessons ?? [];

  return (
    <form
      // onSubmit={onSubmit}
      action={formAction}
      className="p-2 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-100px)]"
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new Attendance" : "Update Attendance"}
      </h1>

      <h2 className="text-[14px] text-gray-400 font-medium">
        Attendance information
      </h2>

      <div className="flex justify-between flex-wrap gap-4">
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
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="studentId" className="text-xs text-gray-400">
            Student
          </label>
          <select
            id="studentId"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("studentId")}
            name="studentId"
            defaultValue={data?.studentId ?? ""}
          >
            <option value="">Select student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} {student.surname}
              </option>
            ))}
          </select>
          {errors.studentId?.message && (
            <p className="text-xs text-red-400">
              {errors.studentId.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="lessonId" className="text-xs text-gray-400">
            Lesson
          </label>
          <select
            id="lessonId"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("lessonId")}
            name="lessonId"
            defaultValue={data?.lessonId ?? ""}
          >
            <option value="">Select lesson</option>
            {lessons.map((lesson) => (
              <option key={lesson.id} value={lesson.id}>
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

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="date" className="text-xs text-gray-400">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("date")}
            name="date"
            defaultValue={
              data?.date
            }
          />
          {errors.date?.message && (
            <p className="text-xs text-red-400">
              {errors.date.message.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="present" className="text-xs text-gray-400">
            Status
          </label>
          <select
            id="present"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("present")}
            name="present"
            defaultValue={String(data?.present ?? true)}
          >
            <option value="true">Present</option>
            <option value="false">Absent</option>
          </select>
          {errors.present?.message && (
            <p className="text-xs text-red-400">
              {errors.present.message.toString()}
            </p>
          )}
        </div>
      </div>

      <button
        disabled={isPending}
        className="bg-blue-400 rounded-md w-full text-white p-2"
      >
        {isPending ? `${label}ing...` : label}
      </button>
    </form>
  );
};

export default AttendanceForm;

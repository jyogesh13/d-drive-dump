"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useMemo,
} from "react";
import { resultSchema } from "@/lib/formValidationSchema";
import { createResult, updateResult } from "@/lib/actions";
import { toast } from "react-toastify";
import InputField from "../InputField";

type RelatedData = {
  students?: { id: string; name: string; surname: string }[];
  exams?: { id: number; title: string }[];
  assignments?: { id: number; title: string }[];
};

const ResultForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  setOpen: Dispatch<SetStateAction<boolean>>;
  data?: any;
  relatedData?: RelatedData;
}) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resultSchema),
    defaultValues: {
      score: data?.score ?? 0,
      studentId: data?.studentId ?? "",
      type: data?.examId ? "exam" : "assignment",
      examId: data?.examId ?? undefined,
      assignmentId: data?.assignmentId ?? undefined,
    },
  });

  const selectedType = watch("type");

  const students = relatedData?.students ?? [];
  const exams = relatedData?.exams ?? [];
  const assignments = relatedData?.assignments ?? [];

  const [state, formAction, isPending] = useActionState(
    type === "create" ? createResult : updateResult,
    {
      success: false,
      error: false,
    },
  );

  const title = useMemo(() => {
    return type === "create" ? "Create a new Result" : "Update Result";
  }, [type]);

  useEffect(() => {
    if (state.success) {
      toast(`Result has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
    }
  }, [state, type, setOpen]);

  return (
    <form
      action={formAction}
      className="p-2 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-100px)]"
    >
      <h1 className="text-xl font-semibold">{title}</h1>

      <h2 className="text-[14px] text-gray-400 font-medium">
        Result information
      </h2>

      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
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
          <label htmlFor="type" className="text-xs text-gray-400">
            Result Type
          </label>
          <select
            id="type"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("type")}
            defaultValue={data?.examId ? "exam" : "assignment"}
            name="type"
          >
            <option value="exam">Exam</option>
            <option value="assignment">Assignment</option>
          </select>
          {errors.type?.message && (
            <p className="text-xs text-red-400">
              {errors.type.message.toString()}
            </p>
          )}
        </div>

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

        <InputField
          label="Score"
          register={register}
          name="score"
          defaultValue={data?.score}
          error={errors?.score}
        />

        {selectedType === "exam" && (
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label htmlFor="examId" className="text-xs text-gray-400">
              Exam
            </label>
            <select
              id="examId"
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
              {...register("examId")}
              name="examId"
              defaultValue={data?.examId ?? ""}
            >
              <option value="">Select exam</option>
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.title}
                </option>
              ))}
            </select>
            {errors.examId?.message && (
              <p className="text-xs text-red-400">
                {errors.examId.message.toString()}
              </p>
            )}
          </div>
        )}

        {selectedType === "assignment" && (
          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label htmlFor="assignmentId" className="text-xs text-gray-400">
              Assignment
            </label>
            <select
              id="assignmentId"
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
              {...register("assignmentId")}
              name="assignmentId"
              defaultValue={data?.assignmentId ?? ""}
            >
              <option value="">Select assignment</option>
              {assignments.map((assignment) => (
                <option key={assignment.id} value={assignment.id}>
                  {assignment.title}
                </option>
              ))}
            </select>
            {errors.assignmentId?.message && (
              <p className="text-xs text-red-400">
                {errors.assignmentId.message.toString()}
              </p>
            )}
          </div>
        )}
      </div>

      <button className="bg-blue-400 rounded-md w-full text-white p-2">
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

export default ResultForm;

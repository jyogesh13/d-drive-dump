"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { announcementSchema } from "@/lib/formValidationSchema";
import { createAnnouncement, updateAnnouncement } from "@/lib/actions";
import { toast } from "react-toastify";
import { formatDateTimeLocal } from "@/lib/utils";

type RelatedData = {
  classes?: { id: number; name: string }[];
};

const AnnouncementForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: RelatedData;
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: data?.title ?? "",
      description: data?.description ?? "",
      date: data?.date ? formatDateTimeLocal(data.date) : "",
      classId: data?.classId ?? undefined,
    },
  });

  const label = type === "create" ? "Create" : "Update";

  const [state, formAction, isPending] = useActionState(
    type === "create" ? createAnnouncement : updateAnnouncement,
    { success: false, error: false },
  );

  useEffect(() => {
    if (state.success) {
      toast(
        `Announcement has been ${type === "create" ? "created" : "updated"}!`,
      );
      setOpen(false);
    }
  }, [state, setOpen, type]);

  const classes = relatedData?.classes ?? [];

  return (
    <form
      action={formAction}
      className="p-2 flex flex-col gap-6 overflow-y-scroll max-h-[calc(100vh-100px)]"
    >
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? `Create a new Announcement`
          : `Update Announcement details`}
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
        <div className="flex flex-col gap-2 w-full md:w-[48%]">
          <label htmlFor="description" className="text-xs text-gray-400">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("description")}
            defaultValue={data?.description}
          />
          {errors.description?.message && (
            <p className="text-xs text-red-400">
              {errors.description.message.toString()}
            </p>
          )}
        </div>
        <InputField
          label="Date"
          type="date"
          register={register}
          name="date"
          defaultValue={data?.date}
          error={errors?.date}
        />
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label htmlFor="classId" className="text-xs text-gray-400">
          Class
        </label>
        <select
          id="classId"
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
          {...register("classId")}
          defaultValue={data?.classId ?? ""}
          name="classId"
        >
          <option value="">All Classes / No Class</option>
          {classes.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
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
      <button className="bg-blue-400 rounded-md w-full text-white p-2 ">
        {isPending ? `${label}ing...` : label}
      </button>
    </form>
  );
};

export default AnnouncementForm;

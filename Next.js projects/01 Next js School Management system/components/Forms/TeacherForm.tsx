"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { TeacherSchema, teacherSchema } from "@/lib/formValidationSchema";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";

const TeacherForm = ({
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
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TeacherSchema>({
    resolver: zodResolver(teacherSchema),
  });

  const [img, setImg] = useState<any>();
  const label = type === "create" ? "Create" : "Update";

  const [state, formAction, isPending] = useActionState(
    type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    },
  );

  const onSubmit = handleSubmit((values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      if (key === "subjects" && Array.isArray(value)) {
        value.forEach((v) => formData.append("subjects", String(v)));
      } else {
        formData.append(
          key,
          value instanceof Date ? value.toISOString() : String(value),
        );
      }
    });

    formAction(formData);
  });

  useEffect(() => {
    if (state.success) {
      toast(`Teacher has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
    }
  }, [state, type, setOpen]);

  const { subjects } = relatedData;

  return (
    <form
      onSubmit={onSubmit}
      className="p-2 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-100px)]"
    >
      <h1 className="text-xl font-semibold">
        {type === "create"
          ? `Create a new Teacher`
          : `Update Teacher information`}
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
            error={errors?.name}
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
          type="text"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors?.name}
        />
        <InputField
          label="Last Name"
          type="text"
          register={register}
          name="surname"
          defaultValue={data?.surname}
          error={errors?.surname}
        />
        <InputField
          label="Phone"
          type="text"
          register={register}
          name="phone"
          defaultValue={data?.phone}
          error={errors?.phone}
        />
        <InputField
          label="Address"
          type="text"
          register={register}
          name="address"
          defaultValue={data?.address}
          error={errors?.address}
        />
        <InputField
          label="Blood Type"
          type="text"
          register={register}
          name="bloodType"
          defaultValue={data?.bloodType}
          error={errors?.bloodType}
        />
        <InputField
          label="Date of Birth"
          type="date"
          register={register}
          name="birthday"
          defaultValue={data?.birthday.toISOString().split("T")[0]}
          error={errors?.birthday}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="gender" className="text-xs text-gray-400">
            Gender
          </label>
          <select
            id="gender"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("gender")}
            defaultValue={data?.gender}
            name="gender"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.gender?.message && (
            <p className="text-xs text-red-400">
              {errors.gender.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label htmlFor="subjects" className="text-xs text-gray-400">
            Subjects
          </label>
          <select
            multiple
            id="subjects"
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm focus:outline-0"
            {...register("subjects")}
            name="subjects"
            defaultValue={data?.subjects}
          >
            {subjects.map((subject: { id: number; name: string }) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjects?.message && (
            <p className="text-xs text-red-400">
              {errors.subjects.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center cursor-pointer ">
          <CldUploadWidget
            uploadPreset="SchoolApp"
            onSuccess={(result, { widget }) => {
              const info = result.info as { secure_url: string };
              setImg(info);
              setValue("img", info.secure_url, { shouldValidate: true });
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <button
                  onClick={() => open()}
                  className="text-xs text-gray-400 flex items-center gap-2"
                >
                  {img ? (
                    <span className="text-sm flex justify-center items-center gap-2">
                      <Image
                        className="w-15 h-15 rounded-lg"
                        src={`${img.secure_url}`}
                        alt=""
                        width={44}
                        height={44}
                      />
                      {`${img.original_filename}.${img.format}`}
                    </span>
                  ) : (
                    <>
                      <Image
                        src={"/upload.png"}
                        alt="upload"
                        width={28}
                        height={28}
                      />
                      <span>Upload a photo</span>
                    </>
                  )}
                </button>
              );
            }}
          </CldUploadWidget>
          <input
            type="hidden"
            {...register("img")}
            name="img"
            value={data?.img}
          />
          {errors.img?.message && (
            <p className="text-xs text-red-400">
              {errors.img.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <p className={`text-sm text-red-600 `}>
          An error occurred while creating teacher
        </p>
      )}
      <button
        disabled={isPending}
        className="bg-blue-400 rounded-md w-full text-white p-2 "
      >
        {isPending ? `${label}ing` : label}
      </button>
    </form>
  );
};

export default TeacherForm;

import z from "zod";

export const optionalPositiveInt = z.preprocess((value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }
  return Number(value);
}, z.number().int().positive().optional());

const attendanceBooleanSchema = z.preprocess((value) => {
  if (value === true || value === "true" || value === "on") return true;
  if (value === false || value === "false") return false;
  return value;
}, z.boolean());

const dateSchema = z.preprocess(
  (value) => {
    if (!value) return undefined;
    return new Date(value as string);
  },
  z.date({ message: "Valid date and time is required" }),
);

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { error: "Subject name is required!" }),
  teachers: z.array(z.string()),
});

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { error: "Class name is required!" }),
  capacity: z.coerce.number().min(1, { error: "Capacity is required" }),
  gradeId: z.coerce.number().min(1, { error: "Grade name is required" }),
  supervisorId: z.coerce.string().optional(),
});
export type ClassSchemaInput = z.input<typeof classSchema>
export type ClassSchema = z.infer<typeof classSchema>

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 character long!")
    .max(20, "Username must be at most 20 character long!"),
  email: z.email("Invalid email address!").optional().or(z.literal("")),
  password: z
    .string()
    .min(8, "Password must be at least 8 character long!")
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, "First name is required!"),
  surname: z.string().min(1, "Last name is required!"),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, "Blood Type is required!"),
  birthday: z.string().min(1, "Birthday is required!"),
  gender: z.enum(["MALE", "FEMALE"], "Gender is required!"),
  subjects: z.array(z.string()).optional(),
});
export type TeacherSchema = z.output<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 character long!")
    .max(20, "Username must be at most 20 character long!"),
  email: z.email("Invalid email address!").optional().or(z.literal("")),
  password: z
    .string()
    .min(8, "Password must be at least 8 character long!")
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, "First name is required!"),
  surname: z.string().min(1, "Last name is required!"),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, "Blood Type is required!"),
  birthday: z.coerce.date("Birthday is required!"),
  gender: z.enum(["MALE", "FEMALE"], "Gender is required!"),
  parentUsername: z.string().min(1, { error: "Parent is required" }),
  classId: z.coerce.number().min(1, { error: "Class is required" }),
  gradeId: z.coerce.number().min(1, { error: "Grade is required" }),
});

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { error: "Subject name is required!" }),
  startTime: z.coerce.date({ error: "Start time is required" }),
  endTime: z.coerce.date({ error: "End time is required" }),
  lessonId: z.coerce.number({ error: "Lesson is required" }),
});

export const parentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 character long!")
    .max(20, "Username must be at most 20 character long!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 character long!")
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, "First name is required!"),
  surname: z.string().min(1, "Last name is required!"),
  email: z.email("Invalid email address!").optional().or(z.literal("")),
  phone: z.string(),
  address: z.string(),
});

export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { error: "Name is required" }),
  day: z.enum(
    ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"],
    "day is required!",
  ),
  startTime: z.coerce.date({ error: "Start time is required" }),
  endTime: z.coerce.date({ error: "End time is required" }),
  subjectId: z.coerce.number({ error: "Subject is required" }),
  classId: z.coerce.number({ error: "Lesson is required" }),
  teacherId: z.string().min(1, { error: "Teacher is required" }),
});

export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { error: "Subject name is required!" }),
  startDate: dateSchema,
  dueDate: dateSchema,
  lessonId: z.coerce.number({ error: "Lesson is required" }),
});

export const resultSchema = z
  .object({
    id: z.coerce.number().optional(),
    score: z.coerce.number().int().min(1, { error: "Score is required" }),
    type: z.enum(["exam", "assignment"]),
    examId: optionalPositiveInt,
    assignmentId: optionalPositiveInt,
    studentId: z.string().min(1, "Student ID is required"),
  })
  .superRefine((data, ctx) => {
    if (data.type === "exam" && !data.examId) {
      ctx.addIssue({
        code: "custom",
        path: ["examId"],
        message: "Exam is required",
      });
    }

    if (data.type === "assignment" && !data.assignmentId) {
      ctx.addIssue({
        code: "custom",
        path: ["assignmentId"],
        message: "Assignment is required",
      });
    }
  });

export const attendanceSchema = z.object({
  id: z
    .preprocess((value) => Number(value), z.number().int().positive())
    .optional(),
  studentId: z.string().min(1, "Student is required"),
  lessonId: z.preprocess(
    (value) => Number(value),
    z.number().int().positive("Lesson is required"),
  ),
  date: dateSchema,
  present: attendanceBooleanSchema,
});

export const eventSchema = z
  .object({
    id: z
      .preprocess((value) => Number(value), z.number().int().positive())
      .optional(),
    title: z.string().min(1, { error: "Title is required" }),
    description: z.string().min(1, { error: "Description is required" }),
    startTime: dateSchema,
    endTime: dateSchema,
    classId: optionalPositiveInt,
  })
  .superRefine((data, ctx) => {
    if (data.endTime <= data.startTime) {
      ctx.addIssue({
        code: "custom",
        path: ["endTime"],
        message: "End time must be after start time",
      });
    }
  });

export const announcementSchema = z.object({
  id: z
    .preprocess((value) => Number(value), z.number().int().positive())
    .optional(),
  title: z.string().min(1, { error: "Title is required" }),
  description: z.string().min(1, { error: "Description is required" }),
  date: dateSchema,
  classId: optionalPositiveInt,
});

"use server"
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { announcementSchema, assignmentSchema, attendanceSchema, classSchema, eventSchema, examSchema, lessonSchema, parentSchema, resultSchema, studentSchema, subjectSchema, teacherSchema } from "./formValidationSchema";
import { auth, clerkClient } from "@clerk/nextjs/server";

type FormState = {
    success: boolean;
    error: boolean;
};


export const createSubject = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        name: formData.get("name"),
        teachers: formData.getAll("teachers"),

    };
    const { name, teachers } = subjectSchema.parse(rawData);
    try {
        await prisma.subject.create({
            data: {
                name,
                teachers: {
                    connect: teachers.map(teacherId => ({ id: teacherId }))
                }
            }
        })
        revalidatePath("/list/subjects")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const updateSubject = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        id: formData.get("id"),
        name: formData.get("name"),
        teachers: formData.getAll("teachers"),

    };
    const { id, name, teachers } = subjectSchema.parse(rawData);
    try {
        await prisma.subject.update({
            where: { id },
            data: {
                name,
                teachers: {
                    set: teachers.map(teacherId => ({ id: teacherId }))
                }
            }
        })
        revalidatePath("/list/subjects")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const deleteSubject = async (
    _prevState: FormState,
    formData: FormData) => {
    const id = formData.get("id") as string
    try {
        await prisma.subject.delete({ where: { id: Number.parseInt(id) } })
        revalidatePath("/list/subjects")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}

export const createClass = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        name: formData.get("name"),
        capacity: formData.get("capacity"),
        gradeId: formData.get("gradeId"),
        supervisorId: formData.get("supervisorId"),
    };
    const data = classSchema.parse(rawData);
    try {
        await prisma.class.create({ data })
        revalidatePath("/list/class")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const updateClass = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        id: formData.get("id"),
        name: formData.get("className"),
        capacity: formData.get("capacity"),
        gradeId: formData.get("gradeId"),
        supervisorId: formData.get("supervisorId"),
    };
    const { id, ...data } = classSchema.parse(rawData);
    try {
        await prisma.class.update({
            where: { id },
            data
        })
        revalidatePath("/list/class")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const deleteClass = async (
    _prevState: FormState,
    formData: FormData) => {
    const id = formData.get("id") as string
    try {
        await prisma.class.delete({ where: { id: Number.parseInt(id) } })
        revalidatePath("/list/class")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}

export const createTeacher = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        username: formData.get("username"),
        password: formData.get("password"),
        name: formData.get("name"),
        surname: formData.get("surname"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        img: formData.get("img"),
        bloodType: formData.get("bloodType"),
        gender: formData.get("gender"),
        birthday: formData.get("birthday"),
        subjects: formData.getAll("subjects"),
    };
    const data = teacherSchema.parse(rawData);
    try {
        const client = await clerkClient();
        const user = await client.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "teacher" }

        })
        await prisma.teacher.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email,
                phone: data.phone,
                address: data.address,
                img: data.img,
                bloodType: data.bloodType,
                gender: data.gender,
                birthday: new Date(data.birthday),
                subjects: {
                    connect: data.subjects?.map(subjectId => (
                        {
                            id: Number.parseInt(subjectId)
                        }
                    ))
                },
            }
        })
        revalidatePath("/list/teachers")
        return {
            success: true,
            error: false,
        };
    } catch (error: any) {
        console.error("Prisma error:", error);
        console.error("Prisma message:", error.message);
        console.error("Clerk createUser error:", JSON.stringify(error, null, 2));
        return {
            success: false,
            error: true,
        };
    }
}
export const updateTeacher = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = Object.fromEntries(formData.entries())
    const { id, password, ...data } = teacherSchema.parse({ ...rawData, subjects: formData.getAll("subjects") });

    if (!id) {
        return { success: false, error: true }
    }
    try {
        (await clerkClient()).users.updateUser(id, {
            username: data.username,
            ...(password !== "" && { password: password }),
            firstName: data.name,
            lastName: data.surname,
        });
        await prisma.teacher.update({
            where: { id },
            data: {
                ...(password !== "" && { password: password }),
                ...data,
                subjects: {
                    set: data.subjects?.map(subjectId => ({
                        id: Number.parseInt(subjectId)
                    }))
                },
            }
        })
        revalidatePath("/list/teachers")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const deleteTeacher = async (
    _prevState: FormState,
    formData: FormData) => {
    const id = formData.get("id") as string
    try {
        (await clerkClient()).users.deleteUser(id);
        await prisma.teacher.delete({ where: { id } })
        revalidatePath("/list/teachers")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}

export const createStudent = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        username: formData.get("username"),
        password: formData.get("password"),
        name: formData.get("name"),
        surname: formData.get("surname"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        img: formData.get("img"),
        bloodType: formData.get("bloodType"),
        gender: formData.get("gender"),
        birthday: formData.get("birthday"),
        gradeId: formData.get("gradeId"),
        parentUsername: formData.get("parentUsername"),
        classId: formData.get("classId"),
    };

    const data = studentSchema.parse(rawData);
    try {
        const classItem = await prisma.class.findUnique({
            where: { id: data.classId },
            include: { _count: { select: { students: true } } }
        })
        if (classItem && classItem.capacity === classItem._count.students) {
            return { success: false, error: true }
        }
        const parent = await prisma.parent.findUnique({ where: { username: data.parentUsername } })
        if (!parent) {
            return { success: false, error: true }
        }

        const client = await clerkClient();
        const user = await client.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "student" }
        })
        await prisma.student.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email,
                phone: data.phone,
                address: data.address,
                img: data.img,
                bloodType: data.bloodType,
                gender: data.gender,
                birthday: data.birthday,
                gradeId: data.gradeId,
                parentId: parent.id,
                classId: data.classId
            }
        })
        revalidatePath("/list/students")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.error("Clerk createUser error:", JSON.stringify(error, null, 2));
        return {
            success: false,
            error: true,
        };
    }
}
export const updateStudent = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        id: formData.get("id"),
        username: formData.get("username"),
        password: formData.get("password"),
        name: formData.get("name"),
        surname: formData.get("surname"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
        img: formData.get("img"),
        bloodType: formData.get("bloodType"),
        gender: formData.get("gender"),
        birthday: formData.get("birthday"),
        gradeId: formData.get("gradeId"),
        parentUsername: formData.get("parentUsername"),
        classId: formData.get("classId"),
    };
    const { id, password, ...data } = studentSchema.parse({ ...rawData, subjects: formData.getAll("subjects") });

    if (!id) {
        return { success: false, error: true }
    }
    try {
        const parent = await prisma.parent.findUnique({ where: { username: data.parentUsername } })
        if (!parent) {
            return { success: false, error: true }
        }
        (await clerkClient()).users.updateUser(id, {
            username: data.username,
            ...(password !== "" && { password: password }),
            firstName: data.name,
            lastName: data.surname,
        });
        await prisma.student.update({
            where: { id },
            data: {
                ...(password !== "" && { password: password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email,
                phone: data.phone,
                address: data.address,
                img: data.img,
                bloodType: data.bloodType,
                gender: data.gender,
                birthday: data.birthday,
                gradeId: data.gradeId,
                parentId: parent.id,
                classId: data.classId
            }
        })
        revalidatePath("/list/students")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const deleteStudent = async (
    _prevState: FormState,
    formData: FormData) => {
    const id = formData.get("id") as string
    console.log({ id })
    try {
        (await clerkClient()).users.deleteUser(id);
        await prisma.student.delete({ where: { id } })
        revalidatePath("/list/students")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}

export const createExam = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        title: formData.get("title"),
        startTime: formData.get("startTime"),
        endTime: formData.get("endTime"),
        lessonId: formData.get("lessonId")
    };
    const data = examSchema.parse(rawData);
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    try {
        if (role === "teacher") {
            const teacherLesson = await prisma.lesson.findFirst({
                where: {
                    teacherId: userId!,
                    id: data.lessonId
                }
            })
            if (!teacherLesson) {
                return { success: false, error: true }
            }
        }

        await prisma.exam.create({
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            }
        })
        revalidatePath("/list/exams")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const updateExam = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        id: formData.get("id"),
        title: formData.get("title"),
        startTime: formData.get("startTime"),
        endTime: formData.get("endTime"),
        lessonId: formData.get("lessonId")
    };
    const data = examSchema.parse(rawData);
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    try {
        if (role === "teacher") {

            const teacherLesson = await prisma.lesson.findFirst({
                where: {
                    teacherId: userId!,
                    id: data.lessonId
                }
            })
            if (!teacherLesson) {
                return { success: false, error: true }
            }
        }

        await prisma.exam.update({
            where: { id: data.id },
            data: {
                title: data.title,
                startTime: data.startTime,
                endTime: data.endTime,
                lessonId: data.lessonId,
            }
        })
        revalidatePath("/list/exams")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const deleteExam = async (
    _prevState: FormState,
    formData: FormData) => {
    const id = formData.get("id") as string
    try {
        const { userId, sessionClaims } = await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role;
        await prisma.exam.delete({
            where: {
                id: Number.parseInt(id),
                ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {})
            }
        })
        revalidatePath("/list/exams")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}

export const createParent = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        username: formData.get("username"),
        password: formData.get("password"),
        name: formData.get("name"),
        surname: formData.get("surname"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
    };

    const data = parentSchema.parse(rawData);
    try {

        const client = await clerkClient();
        const user = await client.users.createUser({
            username: data.username,
            password: data.password,
            firstName: data.name,
            lastName: data.surname,
            publicMetadata: { role: "parent" }
        })
        await prisma.parent.create({
            data: {
                id: user.id,
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email,
                phone: data.phone,
                address: data.address
            }
        })
        revalidatePath("/list/parents")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.error("Clerk createUser error:", JSON.stringify(error, null, 2));
        return {
            success: false,
            error: true,
        };
    }
}
export const updateParent = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        id: formData.get("id"),
        username: formData.get("username"),
        password: formData.get("password"),
        name: formData.get("name"),
        surname: formData.get("surname"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
    };
    const { id, password, ...data } = parentSchema.parse(rawData);

    if (!id) {
        return { success: false, error: true }
    }
    try {
        (await clerkClient()).users.updateUser(id, {
            username: data.username,
            ...(password !== "" && { password: password }),
            firstName: data.name,
            lastName: data.surname,
        });
        await prisma.parent.update({
            where: { id },
            data: {
                ...(password !== "" && { password: password }),
                username: data.username,
                name: data.name,
                surname: data.surname,
                email: data.email,
                phone: data.phone,
                address: data.address,
            }
        })
        revalidatePath("/list/parents")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const deleteParent = async (
    _prevState: FormState,
    formData: FormData) => {
    const id = formData.get("id") as string
    console.log({ id })
    try {
        (await clerkClient()).users.deleteUser(id);
        await prisma.student.delete({ where: { id } })
        revalidatePath("/list/parents")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}

export const createLesson = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        name: formData.get("name"),
        subjectId: formData.get("subjectId"),
        classId: formData.get("classId"),
        teacherId: formData.get("teacherId"),
        startTime: formData.get("startTime"),
        endTime: formData.get("endTime"),
        day: formData.get("day")
    };
    const data = lessonSchema.parse(rawData);
    try {
        await prisma.lesson.create({
            data: {
                name: data.name,
                subjectId: data.subjectId,
                classId: data.classId,
                teacherId: data.teacherId,
                startTime: data.startTime,
                endTime: data.endTime,
                day: data.day
            }
        })
        revalidatePath("/list/lessons")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const updateLesson = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        id: formData.get("id"),
        name: formData.get("name"),
        subjectId: formData.get("subjectId"),
        classId: formData.get("classId"),
        teacherId: formData.get("teacherId"),
        startTime: formData.get("startTime"),
        endTime: formData.get("endTime"),
        day: formData.get("day")
    };
    const data = lessonSchema.parse(rawData);
    try {
        await prisma.lesson.update({
            where: {
                id: data.id
            },
            data: {
                name: data.name,
                subjectId: data.subjectId,
                classId: data.classId,
                teacherId: data.teacherId,
                startTime: data.startTime,
                endTime: data.endTime,
                day: data.day
            }
        })
        revalidatePath("/list/lessons")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const deleteLesson = async (
    _prevState: FormState,
    formData: FormData) => {
    const id = formData.get("id") as string
    try {
        await prisma.lesson.delete({
            where: {
                id: Number.parseInt(id),
            }
        })
        revalidatePath("/list/lessons")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}

export const createAssignment = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        title: formData.get("title"),
        startDate: formData.get("startDate"),
        dueDate: formData.get("dueDate"),
        lessonId: formData.get("lessonId")
    };
    const data = assignmentSchema.parse(rawData);
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    try {
        if (role === "teacher") {
            const teacherLesson = await prisma.lesson.findFirst({
                where: {
                    teacherId: userId!,
                    id: data.lessonId
                }
            })
            if (!teacherLesson) {
                return { success: false, error: true }
            }
        }

        await prisma.assignment.create({
            data: {
                title: data.title,
                startDate: data.startDate,
                dueDate: data.dueDate,
                lessonId: data.lessonId,
            }
        })
        revalidatePath("/list/assignments")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const updateAssignment = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        id: formData.get("id"),
        title: formData.get("title"),
        startDate: formData.get("startDate"),
        dueDate: formData.get("dueDate"),
        lessonId: formData.get("lessonId")
    };
    const data = assignmentSchema.parse(rawData);
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    try {
        if (role === "teacher") {

            const teacherLesson = await prisma.lesson.findFirst({
                where: {
                    teacherId: userId!,
                    id: data.lessonId
                }
            })
            if (!teacherLesson) {
                return { success: false, error: true }
            }
        }

        await prisma.assignment.update({
            where: { id: data.id },
            data: {
                title: data.title,
                startDate: data.startDate,
                dueDate: data.dueDate,
                lessonId: data.lessonId,
            }
        })
        revalidatePath("/list/assignments")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const deleteAssignment = async (
    _prevState: FormState,
    formData: FormData) => {
    const id = formData.get("id") as string
    try {
        const { userId, sessionClaims } = await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role;
        await prisma.assignment.delete({
            where: {
                id: Number.parseInt(id),
                ...(role === "teacher" ? { lesson: { teacherId: userId! } } : {})
            }
        })
        revalidatePath("/list/assignments")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}

export const createResult = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        score: formData.get("score"),
        studentId: formData.get("studentId"),
        examId: formData.get("examId"),
        assignmentId: formData.get("assignmentId"),
        type: formData.get("type")
    };

    const data = resultSchema.parse(rawData);
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    try {
        const student = await prisma.student.findUnique({
            where: { id: data.studentId },
            select: { id: true },
        });

        if (!student) {
            return { success: false, error: true };
        }

        if (data.type === "exam") {
            const exam = await prisma.exam.findUnique({
                where: { id: data.examId! },
                include: {
                    lesson: {
                        select: {
                            teacherId: true,
                        },
                    },
                },
            });

            if (!exam) {
                return { success: false, error: true };
            }

            if (role === "teacher" && exam.lesson.teacherId !== userId) {
                return { success: false, error: true };
            }

            await prisma.result.create({
                data: {
                    score: data.score,
                    studentId: data.studentId,
                    examId: data.examId,
                },
            });
        }
        if (data.type === "assignment") {
            const assignment = await prisma.assignment.findUnique({
                where: { id: data.assignmentId! },
                include: {
                    lesson: {
                        select: {
                            teacherId: true,
                        },
                    },
                },
            });

            if (!assignment) {
                return { success: false, error: true };
            }

            if (role === "teacher" && assignment.lesson.teacherId !== userId) {
                return { success: false, error: true };
            }

            await prisma.result.create({
                data: {
                    score: data.score,
                    studentId: data.studentId,
                    assignmentId: data.assignmentId,
                },
            });
        }

        revalidatePath("/list/results")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const updateResult = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        id: formData.get("id"),
        score: formData.get("score"),
        studentId: formData.get("studentId"),
        examId: formData.get("examId"),
        assignmentId: formData.get("assignmentId"),
        type: formData.get("type"),
    };
    const data = resultSchema.parse(rawData);
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    try {
        await prisma.$transaction(async (tx) => {
            // 1. Initial existence checks
            const existingResult = await tx.result.findUnique({ where: { id: data.id } });
            if (!existingResult) throw new Error("Result not found");

            const student = await tx.student.findUnique({ where: { id: data.studentId } });
            if (!student) throw new Error("Student not found");

            // 2. Determine the source (Exam vs Assignment)
            const isExam = data.type === "exam";
            const sourceId = isExam ? data.examId : data.assignmentId;
            const sourceTable = isExam ? tx.exam : tx.assignment;

            // 3. Single validation block for both types
            const source = await (sourceTable as any).findUnique({
                where: { id: sourceId },
                include: { lesson: { select: { teacherId: true } } },
            });

            if (!source) throw new Error(`${isExam ? "Exam" : "Assignment"} not found`);
            if (role === "teacher" && source.lesson.teacherId !== userId) throw new Error("Unauthorized");

            // 4. Check for duplicates
            const duplicateResult = await tx.result.findFirst({
                where: {
                    id: { not: data.id },
                    studentId: data.studentId,
                    ...(isExam ? { examId: sourceId } : { assignmentId: sourceId }),
                },
            });

            if (duplicateResult) throw new Error("Result already exists for this student");

            // 5. Unified update
            await tx.result.update({
                where: { id: data.id },
                data: {
                    score: data.score,
                    studentId: data.studentId,
                    examId: isExam ? data.examId : null,
                    assignmentId: isExam ? null : data.assignmentId,
                },
            });
        });

        revalidatePath("/list/results")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const deleteResult = async (
    _prevState: FormState,
    formData: FormData) => {
    const id = formData.get("id") as string
    const resultId = Number(id);
    try {
        const { userId, sessionClaims } = await auth();
        const role = (sessionClaims?.metadata as { role?: string })?.role;
        const existingResult = await prisma.result.findUnique({
            where: { id: resultId },
            include: {
                exam: {
                    include: {
                        lesson: {
                            select: {
                                teacherId: true,
                            },
                        },
                    },
                },
                assignment: {
                    include: {
                        lesson: {
                            select: {
                                teacherId: true,
                            },
                        },
                    },
                },
            },
        });

        if (!existingResult) {
            return {
                success: false,
                error: true,
            };
        }

        if (role === "teacher") {
            const teacherOwnsExam =
                existingResult.exam?.lesson.teacherId === userId;
            const teacherOwnsAssignment =
                existingResult.assignment?.lesson.teacherId === userId;

            if (!teacherOwnsExam && !teacherOwnsAssignment) {
                return {
                    success: false,
                    error: true,
                };
            }
        }

        await prisma.result.delete({
            where: {
                id: resultId
            },
        });
        revalidatePath("/list/results")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}

export const createAttendance = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        studentId: formData.get("studentId"),
        lessonId: formData.get("lessonId"),
        date: formData.get("date"),
        present: formData.get("present"),
    };

    const data = attendanceSchema.parse(rawData);
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    try {
        await prisma.$transaction(async (tx) => {
            const student = await tx.student.findUnique({
                where: { id: data.studentId },
                select: { id: true }
            })
            if (!student) {
                return {
                    success: false,
                    error: true
                }
            }

            const lesson = await tx.lesson.findUnique({
                where: { id: data.lessonId },
                select: { id: true, teacherId: true }
            })
            if (!lesson) {
                return {
                    success: false,
                    error: true
                }
            }

            if (role === "teacher" && lesson.teacherId !== userId) {
                return {
                    success: false,
                    error: true
                }
            }

            const existingAttendance = await tx.attendance.findFirst({
                where: {
                    studentId: data.studentId,
                    lessonId: data.lessonId,
                    date: data.date
                },
                select: { id: true }
            })
            if (existingAttendance) {
                return {
                    success: false,
                    error: true
                }
            }

            await tx.attendance.create({
                data: {
                    studentId: data.studentId,
                    lessonId: data.lessonId,
                    date: data.date,
                    present: data.present
                }
            })
        })

        revalidatePath("/list/attendance")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const updateAttendance = async (
    _prevState: FormState,
    formData: FormData) => {
    const rawData = {
        id: formData.get("id"),
        studentId: formData.get("studentId"),
        lessonId: formData.get("lessonId"),
        date: formData.get("date"),
        present: formData.get("present"),
    };
    const data = attendanceSchema.parse(rawData);
    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    try {
        await prisma.$transaction(async (tx) => {
            const existingAttendance = await tx.attendance.findUnique({
                where: { id: data.id },
                select: { id: true }
            })
            if (!existingAttendance) {
                return {
                    success: false,
                    error: true
                }
            }
            const student = await tx.student.findUnique({
                where: { id: data.studentId },
                select: { id: true }
            })
            if (!student) {
                return {
                    success: false,
                    error: true
                }
            }

            const lesson = await tx.lesson.findUnique({
                where: { id: data.lessonId },
                select: { id: true, teacherId: true }
            })
            if (!lesson) {
                return {
                    success: false,
                    error: true
                }
            }

            if (role === "teacher" && lesson.teacherId !== userId) {
                return {
                    success: false,
                    error: true
                }
            }

            await tx.attendance.update({
                where: { id: data.id },
                data: {
                    studentId: data.studentId,
                    lessonId: data.lessonId,
                    present: data.present,
                    date: data.date
                }
            })
        });

        revalidatePath("/list/attendance");

        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}
export const deleteAttendance = async (
    _prevState: FormState,
    formData: FormData) => {

    const id = formData.get("id") as string
    const attendanceId = Number(id);

    const { userId, sessionClaims } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    try {
        if (!(role === "admin" || role === "teacher")) {
            return {
                success: false,
                error: true
            }
        }

        const existingAttendance = await prisma.attendance.findUnique({
            where: { id: attendanceId },
            include: {
                lesson: {
                    select: { teacherId: true }
                }
            }
        });

        if (!existingAttendance) {
            return {
                success: false,
                error: true,
            };
        }

        if (role === "teacher" && existingAttendance.lesson.teacherId !== userId) {
            return {
                success: false,
                error: true
            }
        }

        await prisma.attendance.delete({
            where: {
                id: attendanceId
            },
        });
        revalidatePath("/list/attendance")
        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: true,
        };
    }
}

export const createEvent = async (
    _prevState: FormState,
    formData: FormData
): Promise<FormState> => {
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        startTime: formData.get("startTime"),
        endTime: formData.get("endTime"),
        classId: formData.get("classId"),
    };

    const data = eventSchema.parse(rawData)


    try {
        if (data.classId) {
            const existingClass = await prisma.class.findUnique({
                where: { id: data.classId },
                select: { id: true },
            });
            if (!existingClass) {
                return { success: false, error: true };
            }
        }

        await prisma.event.create({
            data: {
                title: data.title,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
                classId: data.classId ?? null,
            },
        });

        revalidatePath("/list/events");

        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: true,
        };
    }
};

export const updateEvent = async (
    _prevState: FormState,
    formData: FormData
): Promise<FormState> => {
    const rawData = {
        id: formData.get("id"),
        title: formData.get("title"),
        description: formData.get("description"),
        startTime: formData.get("startTime"),
        endTime: formData.get("endTime"),
        classId: formData.get("classId"),
    };

    const data = eventSchema.parse(rawData);

    try {
        const existingEvent = await prisma.event.findUnique({
            where: { id: data.id },
            select: { id: true },
        });

        if (!existingEvent) {
            return { success: false, error: true };
        }

        if (data.classId) {
            const existingClass = await prisma.class.findUnique({
                where: { id: data.classId },
                select: { id: true },
            });

            if (!existingClass) {
                return { success: false, error: true };
            }
        }

        await prisma.event.update({
            where: { id: data.id },
            data: {
                title: data.title,
                description: data.description,
                startTime: data.startTime,
                endTime: data.endTime,
                classId: data.classId ?? null,
            },
        });

        revalidatePath("/list/events");

        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: true,
        };
    }
};

export const deleteEvent = async (
    _prevState: FormState,
    formData: FormData
): Promise<FormState> => {
    const id = formData.get("id");

    if (!id || Number.isNaN(Number(id))) {
        return {
            success: false,
            error: true,
        };
    }

    const eventId = Number(id);

    try {
        const existingEvent = await prisma.event.findUnique({
            where: { id: eventId },
            select: { id: true },
        });

        if (!existingEvent) {
            return {
                success: false,
                error: true,
            };
        }

        await prisma.event.delete({
            where: { id: eventId },
        });

        revalidatePath("/list/events");

        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: true,
        };
    }
};

export const createAnnouncement = async (
    _prevState: FormState,
    formData: FormData
): Promise<FormState> => {
    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        date: formData.get("date"),
        classId: formData.get("classId"),
    };

    const data = announcementSchema.parse(rawData)

    try {
        if (data.classId) {
            const existingClass = await prisma.class.findUnique({
                where: { id: data.classId },
                select: { id: true }
            });
            if (!existingClass) {
                return { success: false, error: true };
            }
        }

        await prisma.announcement.create({
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                classId: data.classId ?? null,
            },
        });

        revalidatePath("/list/announcements");

        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: true,
        };
    }
};

export const updateAnnouncement = async (
    _prevState: FormState,
    formData: FormData
): Promise<FormState> => {
    const rawData = {
        id: formData.get("id"),
        title: formData.get("title"),
        description: formData.get("description"),
        date: formData.get("date"),
        classId: formData.get("classId"),
    };

    const data = announcementSchema.parse(rawData);

    try {
        const existingAnnouncement = await prisma.announcement.findUnique({
            where: { id: data.id },
            select: { id: true },
        });

        if (!existingAnnouncement) {
            return { success: false, error: true };
        }

        if (data.classId) {
            const existingClass = await prisma.class.findUnique({
                where: { id: data.classId },
                select: { id: true },
            });

            if (!existingClass) {
                return { success: false, error: true };
            }
        }

        await prisma.announcement.update({
            where: { id: data.id },
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                classId: data.classId ?? null,
            },
        });

        revalidatePath("/list/announcements");

        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: true,
        };
    }
};

export const deleteAnnouncement = async (
    _prevState: FormState,
    formData: FormData
): Promise<FormState> => {
    const id = formData.get("id");

    if (!id || Number.isNaN(Number(id))) {
        return {
            success: false,
            error: true,
        };
    }

    const announcementId = Number(id);

    try {
        const existingAnnouncement = await prisma.announcement.findUnique({
            where: { id: announcementId },
            select: { id: true },
        });

        if (!existingAnnouncement) {
            return {
                success: false,
                error: true,
            };
        }

        await prisma.announcement.delete({
            where: { id: announcementId },
        });

        revalidatePath("/list/announcements");

        return {
            success: true,
            error: false,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: true,
        };
    }
};
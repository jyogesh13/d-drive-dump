const getLatestMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    const latestMonday = today;
    latestMonday.setDate(today.getDate() - daysSinceMonday)
    return latestMonday
}

export const adjustScheduleToCurrentWeek = (lessons: { title: string; start: Date; end: Date }[]): { title: string; start: Date; end: Date }[] => {
    const latestMonday = getLatestMonday()
    return lessons.map(lesson => {
        const lessonDayOfWeek = lesson.start.getDay()
        const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;
        const adjustedStartDate = new Date(latestMonday)
        adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday)
        adjustedStartDate.setHours(lesson.start.getHours(), lesson.start.getMinutes(), lesson.start.getSeconds())

        const adjustedEndDate = new Date(adjustedStartDate);
        adjustedEndDate.setHours(lesson.end.getHours(), lesson.end.getMinutes(), lesson.end.getSeconds())
        return {
            title: lesson.title,
            start: adjustedStartDate,
            end: adjustedEndDate
        }
    })
}

export const formatDateTimeLocal = (date?: string | Date) => {
  if (!date) return "";
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
};
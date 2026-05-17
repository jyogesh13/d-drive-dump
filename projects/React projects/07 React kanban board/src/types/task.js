const User = {
    id:String,
    name: String
}

const Task = {
    id: String,
    title: String,
    desc: String,
    assignedTo: User,
    status: "TODO" | "IN_PROGRESS" | "DONE",
    createdAt: String,
}

export default Task;
import "animate.css";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
} from "antd";
import { Delete, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlanner } from "./store/usePlanner";
import { useForm } from "antd/es/form/Form";
import TaskCard from "./components/TaskCard";
import moment from "moment";

export type valueType = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: string;
  status: string;
};

const App = () => {
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());
  const { tasks, addTasks, deleteAllTask } = usePlanner();
  const [selectedPriority, setSelectedPriority] = useState("highest");
  const [filterDate, setFilterDate] = useState<string | null>(null);

  const filteredTasks = tasks.filter((task) => {
    if (filterDate === null) return true; // Show all if no filter is selected
    return moment(task.createdAt).format("YYYY-MM-DD") === filterDate;
  });

  const pendingTasks = filteredTasks.filter(
    (item) => item.status === "pending",
  );
  const inProgressTasks = filteredTasks.filter(
    (item) => item.status === "inProgress",
  );
  const completedTasks = filteredTasks.filter(
    (item) => item.status === "completed",
  );

  const handleAddTask = (priority: string) => {
    setSelectedPriority(priority);
    form.setFieldsValue({ priority: priority });
    setOpen(true);
  };

  const createTask = (value: valueType) => {
    const newTask: valueType = {
      ...value,
      status: "pending",
      id: crypto.randomUUID(),
    };
    addTasks(newTask);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="bg-[linear-gradient(133deg,#667eea,#764ba2,hsl(333.2,79.28165155118388%,54.38429505668472%))] h-screen overflow-hidden">
      <nav className="bg-inherit h-15 fixed top-0 left-0 w-[98%] flex items-center justify-between p-4 shadow-md shadow-green-300 rounded-xl mx-3">
        <div className="text-white font-bold text-3xl ml-4">Task Planner</div>
        <div className="text-white font-bold text-3xl ml-4 flex items-center gap-3">
          <h1>{timer}</h1>
          <DatePicker
            size="large"
            onChange={(_, dateString) => {
              setFilterDate(dateString as string);
            }}
            placeholder="Filter by date"
          />
          <button
            className="bg-linear-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex items-center px-3 py-2 rounded hover:scale-105 transition-transform duration-300 text-sm"
            onClick={() => handleAddTask(selectedPriority)}
          >
            <Plus className="w-4 h-4" />
            Add task
          </button>
          <Popconfirm
            title="Do you want to delete all the tasks"
            onConfirm={() => deleteAllTask()}
          >
            <button className="bg-linear-to-tr from-rose-600 via-rose-500 to-rose-600 text-white flex items-center gap-1 px-3 py-2 rounded hover:scale-105 transition-transform duration-300 text-sm">
              <Delete className="w-4 h-4" />
              Delete all tasks
            </button>
          </Popconfirm>
        </div>
      </nav>
      <section className="fixed top-15 left-0 min-w-screen h-[calc(100vh-120px)] overflow-x-auto  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overflow-y-visible flex gap-4 p-4">
        <TaskCard
          priority={"highest"}
          onAdd={handleAddTask}
          tasks={filteredTasks}
        />
        <TaskCard
          priority={"medium"}
          onAdd={handleAddTask}
          tasks={filteredTasks}
        />
        <TaskCard
          priority={"lowest"}
          onAdd={handleAddTask}
          tasks={filteredTasks}
        />
      </section>
      <footer className="bg-inherit h-15 fixed bottom-0 left-0 w-full flex items-center justify-between px-5">
        <div className="flex items-center text-white font-medium gap-1">
          <span>@Copyright</span>
          <p className="border border-white w-px h-4" />
          <span>All Rights Reserved</span>
        </div>
        <div className="flex items-center justify-center gap-4 mx-2 font-medium">
          <span className="text-white ">Total: {filteredTasks.length}</span>
          <span className="text-amber-400">Pending: {pendingTasks.length}</span>
          <span className="text-blue-300">
            InProgress: {inProgressTasks.length}
          </span>
          <span className="text-emerald-300">
            Completed: {completedTasks.length}
          </span>
        </div>
      </footer>
      <Modal
        open={open}
        footer={null}
        onCancel={handleClose}
        mask={{ closable: false }}
      >
        <h1 className="text-lg font-medium mb-3">New task</h1>
        <Form
          onFinish={createTask}
          form={form}
          initialValues={{ priority: selectedPriority }}
        >
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="Task name" size="large" />
          </Form.Item>
          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Task description goes here" rows={5} />
          </Form.Item>
          <Form.Item name="priority" rules={[{ required: true }]}>
            <Select
              size="large"
              options={[
                { value: "highest", label: "Highest" },
                { value: "medium", label: "Medium" },
                { value: "lowest", label: "Lowest" },
              ]}
            />
          </Form.Item>
          <Form.Item name="createdAt" rules={[{ required: true }]}>
            <DatePicker
              showTime
              size="large"
              className="w-full"
              placement="bottomLeft"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;

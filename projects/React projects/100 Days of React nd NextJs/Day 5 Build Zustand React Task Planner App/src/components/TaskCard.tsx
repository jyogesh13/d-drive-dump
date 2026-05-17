import { Badge, Card, Empty, Popconfirm, Select, Tag } from "antd";
import { Edit, Plus } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { usePlanner } from "../store/usePlanner";
import type { valueType } from "../App";

const TaskCard = ({
  priority,
  onAdd,
  tasks,
}: {
  priority: string;
  onAdd: (priority: string) => void;
  tasks: valueType[];
}) => {
  const { changeTaskStatus, deleteTask } = usePlanner();
  const [filterValue, setFilterValue] = useState<string>("all");

  const statusColor = {
    pending: "text-rose-600!",
    inProgress: "text-indigo-600!",
    completed: "text-emerald-600!",
  } as const;

  const gradientColor = {
    highest: "from-rose-500! via-pink-500! to-rose-500!",
    medium: "from-indigo-500! via-blue-500! to-indigo-500!",
    lowest: "from-amber-500! via-orange-500! to-amber-500!",
  };

  const taskArray = tasks.filter((item) => item.priority === priority);

  const filterArray = taskArray.filter((item) => {
    if (filterValue === "all") return true;
    return item.status === filterValue;
  });

  return (
    <div className="h-full min-h-0 w-full relative">
      <Badge.Ribbon
        text={priority.slice(0, 1).toUpperCase() + priority.slice(1)}
        className={`bg-linear-to-br! ${gradientColor[priority as keyof typeof gradientColor]} font-medium! z-2`}
      />
      <div className="bg-white rounded-2xl h-full min-h-0 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-4">
        <div className="flex flex-col items-center gap-6 mt-6">
          {taskArray.length === 0 ? (
            <>
              <Empty
                description={`There is no task added as ${priority} priority`}
              />
              <button
                className="bg-linear-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex items-center px-3 py-2 rounded hover:scale-105 transition-transform duration-300 text-sm"
                onClick={() => onAdd(priority)}
              >
                <Plus className="w-4 h-4" />
                Add task
              </button>
            </>
          ) : (
            <>
              <div className="w-full flex items-center justify-between gap-4 px-1">
                <h1>Filter status</h1>
                <div>
                  <Select
                    size="small"
                    className="w-30"
                    defaultValue={"all"}
                    options={[
                      { value: "all", label: "All" },
                      { value: "pending", label: "Pending" },
                      { value: "inProgress", label: "In Progress" },
                      { value: "completed", label: "Completed" },
                    ]}
                    onChange={(v) => setFilterValue(v)}
                  />
                </div>
              </div>
              {filterArray.length > 0 ? (
                filterArray.map((item) => (
                  <>
                    <Card hoverable key={item.id} className="w-full!">
                      <Card.Meta
                        title={item.title}
                        description={item.description}
                      />
                      <div className="mt-4 flex items-center justify-between">
                        <div className="space-x-1!">
                          <Tag
                            className={`${statusColor[item.status as keyof typeof statusColor]} w-18!`}
                          >
                            {item.status}
                          </Tag>
                          <Popconfirm
                            title="Do you want to delete this task"
                            onConfirm={() => deleteTask(item.id)}
                          >
                            <Tag className="bg-rose-500! text-white! border-rose-500!">
                              Delete
                            </Tag>
                          </Popconfirm>
                        </div>
                        <div className="flex items-center">
                          <Edit className="w-8 h-4" />
                          <Select
                            size="small"
                            placeholder="Change status"
                            onChange={(status) => {
                              changeTaskStatus(item.id, status);
                            }}
                            options={[
                              { value: "pending", label: "Pending" },
                              { value: "inProgress", label: "In Progress" },
                              { value: "completed", label: "Completed" },
                            ]}
                          />
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-600 mt-3 px-1">
                        {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                      </p>
                    </Card>
                  </>
                ))
              ) : (
                <Empty description={` No ${filterValue} tasks found`} />
              )}
              <button
                className="bg-linear-to-tr from-blue-600 via-blue-500 to-blue-600 text-white flex items-center px-2 py-2 rounded hover:scale-105 transition-transform duration-300 text-sm w-fit mx-auto "
                onClick={() => onAdd(priority)}
              >
                <Plus className="w-4 h-4" />
                Add task
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

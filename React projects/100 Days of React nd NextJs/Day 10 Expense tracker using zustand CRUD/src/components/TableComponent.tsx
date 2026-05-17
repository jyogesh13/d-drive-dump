import { Table, type TableProps } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { useExpense } from "../store/useExpense";

export interface DataType {
  key: string;
  title: string;
  description: string;
  amount: number;
  date: string;
}

const TableComponent = ({
  expenses,
  handleEdit,
}: {
  expenses: DataType[];
  handleEdit: (item: DataType) => void;
}) => {
  const { removeExpense } = useExpense();
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Edit
            className="w-4 h-4 text-green-500"
            onClick={() => handleEdit(record)}
          />
          <Trash2
            className="w-4 h-4 text-rose-500"
            onClick={() => removeExpense(record.key)}
          />
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={expenses} />;
};

export default TableComponent;

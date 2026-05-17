import { IndianRupee, Plus, Search } from "lucide-react";
import TableComponent, { type DataType } from "./components/TableComponent";
import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { useExpense } from "./store/useExpense";

const App = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const { expenses, addExpense, editExpense } = useExpense();
  const [editId, setEditId] = useState("");

  const handleClose = () => {
    setEditId("")
    setOpen(false);
    form.resetFields();
  };

  const createExpense = (values: DataType) => {
    values.key = crypto.randomUUID();
    values.date = dayjs(values.date).format("MMM DD, YYYY");
    addExpense(values);
    handleClose();
  };

  const saveExpense = (values: DataType) => {
    values.date = dayjs(values.date).format("MMM DD, YYYY");
    editExpense(editId, values);
    handleClose();
  };

  const handleEdit = (item: DataType) => {
    setOpen(true);
    setEditId(item.key);
    form.setFieldsValue({ ...item, date: dayjs(item.date) });
  };

  return (
    <div className="w-full bg-slate-900 h-screen flex py-10">
      <div className="w-9/12 mx-auto bg-white p-8 rounded-2xl shadow-sm shadow-gray-300 relative ">
        {/* top bar */}
        <header className="flex items-center justify-between ">
          <h1 className="text-3xl md:text-3xl font-bold">
            <span>Ex</span>
            <span className="hidden md:inline">pense Tracker</span>
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 md:border border-gray-400 rounded-2xl p-2">
              <Search className="w-6 h-6 md:w-4 md:h-4" />
              <input
                type="text"
                placeholder="Search these expenses"
                className="outline-none hidden md:block"
              />
            </div>
            <button
              className="flex items-center border-none border bg-linear-to-r from-indigo-600 via-blue-600 to-indigo-600 p-2 rounded-lg hover:scale-105 transition-transform duration-300 text-white "
              onClick={() => setOpen(true)}
            >
              <Plus className="" /> <span className="">Add new</span>
            </button>
          </div>
        </header>
        {/* expense table */}
        <main className="w-full h-137  mt-5 overflow-y-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <TableComponent expenses={expenses} handleEdit={handleEdit} />
        </main>
        {/* footer */}
        <footer className="flex items-center justify-between absolute bottom-2 right-10 w-full">
          <h1 className="text-3xl md:text-3xl font-bold text-end w-full">
            Total expenses: <IndianRupee className="inline mb-1" />
            {expenses.reduce((sum, item) => sum + item.amount, 0)}
          </h1>
        </footer>
      </div>
      <Modal open={open} onCancel={handleClose} footer={false}>
        <Form
          layout="vertical"
          form={form}
          onFinish={editId ? saveExpense : createExpense}
        >
          <Form.Item
            label="Expense title"
            name={"title"}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Title.." />
          </Form.Item>
          <Form.Item
            label="Description"
            name={"description"}
            rules={[{ required: true }]}
          >
            <Input.TextArea
              size="large"
              placeholder="Description goes here..."
              rows={4}
            />
          </Form.Item>
          <Form.Item
            label="Amount"
            name={"amount"}
            rules={[{ required: true }]}
          >
            <InputNumber
              size="large"
              placeholder="Amount"
              className="w-full!"
            />
          </Form.Item>
          <Form.Item label="Date" name={"date"} rules={[{ required: true }]}>
            <DatePicker
              size="large"
              placeholder="Choose expense date"
              className="w-full"
            />
          </Form.Item>
          <Form.Item>
            {editId ? (
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                className="w-full"
                danger
              >
                Save
              </Button>
            ) : (
              <Button
                htmlType="submit"
                size="large"
                type="primary"
                className="w-full"
              >
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;

import "animate.css";
import {
  Button,
  Card,
  Form,
  InputNumber,
  message,
  Select,
  Switch,
  Tooltip,
} from "antd";
import { Copy, Download } from "lucide-react";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import ReactJsonView from "@microlink/react-json-view";
import {
  generateEmployee,
  generatePayments,
  generateProducts,
  generateUser,
} from "./lib/data";
import { useDummyData } from "./store/useDummyData";

type formDataType = {
  data: "users" | "products" | "payments" | "employees";
  noOfData: number;
};

const data = {
  users: generateUser,
  products: generateProducts,
  payments: generatePayments,
  employees: generateEmployee,
};

function App() {
  const { payload, setPayload } = useDummyData();
  const [mongoFormat, setMongoFormat] = useState(false);
  const [valuesSelected, setValuesSelected] = useState({
    data: "users",
    noOfItem: 1,
  });

  const handleSubmit = async (values: formDataType) => {
    setValuesSelected({ data: values.data, noOfItem: values.noOfData });
    const temp = Array.from({ length: values.noOfData }, () => {
      return data[values.data]();
    });
    setPayload(temp);
    message.success("Payload generated");
  };

  const copyData = () => {
    navigator.clipboard.writeText(JSON.stringify(payload));
    message.success("Data copied !");
  };

  const downloadData = () => {
    if (payload.length === 0) {
      message.warning("No data generated");
      return;
    }
    const payloadString = JSON.stringify(payload, null, 2);
    const blob = new Blob([payloadString], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${valuesSelected.data}-dummy-data.json`;
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    message.success(`Download Started!`);
  };

  const displayData = payload.map((item) => {
    if (!mongoFormat) return item;
    return {
      _id: {
        $oid: faker.database.mongodbObjectId(),
      },
      ...item,
      id: undefined,
      createdAt: {
        $date: faker.date.anytime(),
      },
    };
  });

  return (
    <main className="bg-gray-100 min-h-screen py-10">
      <div className="w-9/12 mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <div className="text-start w-[55%]">
            <h1 className="text-3xl font-bold">
              Dummy Data Generator - Premium Dev Tool
            </h1>
            <p className="text-sm">
              Generate up to 100 realistic JSON records for development, seeding
              databases, or API testing — with MongoDB-ready ObjectId & $date
              support.
            </p>
          </div>
          <div className="flex flex-col border w-fit p-2 rounded-xl items-start">
            <span className="text-xl">{valuesSelected.data}</span>
            <span className="text-sm">
              {valuesSelected.noOfItem} items • Apr 13, 12:27 PM{" "}
            </span>
          </div>
        </div>

        <div className="w-full h-200 lg:h-140 flex flex-col lg:flex-row items-center gap-4">
          <Card className="flex-1 border! w-full h-full">
            <Form
              className="flex flex-col"
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{ data: "users", noOfData: 1 }}
            >
              <Form.Item
                label="Data Type"
                name="data"
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { value: "users", label: "User" },
                    { value: "products", label: "Products" },
                    { value: "payments", label: "Payments" },
                    { value: "employees", label: "Employees" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Number of items (max 100)"
                name="noOfData"
                rules={[{ required: true }]}
              >
                <InputNumber
                  size="large"
                  className="w-full!"
                  placeholder="Enter number of data"
                  max={100}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  size="large"
                  htmlType="submit"
                  type="primary"
                  className="w-full"
                >
                  Generate
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card className="flex-3 border w-full h-full p-2 rounded-2xl overflow-y-auto ">
            <div className="flex items-center justify-between">
              <p className="text-lg lg:text-xl font-medium">Payload Preview</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-sm lg:text-lg text-gray-400">
                    MongoDB JSON
                  </span>
                  <Switch
                    size="small"
                    checked={mongoFormat}
                    onChange={(checked) => setMongoFormat(checked)}
                  />
                </div>
                <Tooltip title="copy data">
                  <Copy className="w-3 lg:w-7" onClick={copyData} />
                </Tooltip>
                <Tooltip title="download">
                  <Download className="w-3 lg:w-7" onClick={downloadData} />
                </Tooltip>
              </div>
            </div>
            <div
              className="h-115 mt-3 border rounded-2xl overflow-y-auto 
                [&::-webkit-scrollbar]:hidden 
                [scrollbar-width:none] 
                [-ms-overflow-style:none]"
            >
              <ReactJsonView
                src={displayData}
                theme="codeschool"
                style={{ padding: "10px", minHeight: "100%" }}
              />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default App;

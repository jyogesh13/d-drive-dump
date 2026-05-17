import { Button, Form, Input, message, Modal, QRCode } from "antd";
import { Download } from "lucide-react";
import { useRef, useState } from "react";

interface ValuesProps {
  url: string;
  bgColor: string;
  color: string;
  icon: File;
}

const App = () => {
  const [form] = Form.useForm();
  const qrRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("");
  const [qrValues, setQrValues] = useState({
    url: "http://google.com/",
    bgColor: "white",
    color: "black",
    icon: "",
  });

  const handleSubmit = (values: ValuesProps) => {
    setOpen(false);
    setQrValues((prev) => ({
      ...prev,
      url: values.url,
      bgColor: values.bgColor || "white",
      color: values.color || "black",
      icon: icon,
    }));
  };

  const handleDownload = () => {
    const div = qrRef.current;
    const canvas = div?.querySelector("canvas");
    if (!canvas) {
      message.warning("No QR generated");
      return;
    }
    try {
      const base64String = canvas?.toDataURL("image/jpg");
      const a = document.createElement("a");
      a.href = base64String;
      a.download = "qr-code.jpg";
      a.click();
      a.remove();
    } catch (error) {
      console.error("Download failed: ", error);
      message.warning("Unable to download QR-code");
    }
  };

  const chooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const iconUrl = URL.createObjectURL(file);
      setIcon(iconUrl);
    }
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setIcon("");
  };

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center ">
      <div className=" space-y-8">
        <h1 className="text-3xl font-bold text-center">Generate - QR CODE</h1>
        <div
          ref={qrRef}
          className="w-full p-8 rounded-xl bg-white shadow-lg  flex justify-center hover:scale-115 transition-transform duration-300"
        >
          <QRCode
            value={qrValues.url}
            bgColor={qrValues.bgColor}
            color={qrValues.color}
            icon={qrValues.icon}
            size={220}
          />
        </div>
        <div className="flex items-center gap-2 w-fit mx-auto">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => setOpen(true)}
          >
            Generate new QR
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            icon={<Download className="w-4 h-4" />}
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>
      </div>
      <Modal open={open} footer={false} onCancel={handleClose}>
        <h1 className="text-xl font-medium mb-4">Generate your QR</h1>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, type: "url" }]}
          >
            <Input placeholder="domain@domail.com" size="large" />
          </Form.Item>
          <Form.Item label="Bg Color" name="bgColor">
            <Input type={"color"} size="large" />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Input type={"color"} size="large" />
          </Form.Item>
          <Form.Item label="Icon" name="icon">
            <Input type={"file"} size="large" onChange={chooseFile} />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Generate
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;

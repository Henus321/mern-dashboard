import React from "react";
import { Form, Input } from "antd";
import { ICustomer } from "../models/ICustomer";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: ICustomer;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          <Input autoFocus={dataIndex === "name" ? true : false} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;

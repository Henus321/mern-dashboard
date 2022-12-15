import React from "react";
import { Form, Input } from "antd";
import { IEditableCellProps } from "../../models/customers";
import { max100, max40 } from "../../constants/Validation";

const EditableCell: React.FC<IEditableCellProps> = ({
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
            dataIndex === "social" ? max100 : max40,
            dataIndex === "phone" ? { len: 11 } : {},
            dataIndex === "email"
              ? {
                  type: "email",
                  message: "The input is not valid E-mail!",
                }
              : {},
          ]}
        >
          <Input
            placeholder={`Enter ${title.toLowerCase()}`}
            autoFocus={dataIndex === "name" ? true : false}
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;

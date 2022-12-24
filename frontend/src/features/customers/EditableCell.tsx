import React from "react";
import { Form, Input } from "antd";
import { IEditableCellProps } from "../../models";
import { LEN_11, MAX_100, MAX_20, ONLY_NUMBERS } from "../../constants";

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
            dataIndex === "social" ? MAX_100 : MAX_20,
            dataIndex === "phone" ? LEN_11 : {},
            dataIndex === "phone" ? ONLY_NUMBERS : {},
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

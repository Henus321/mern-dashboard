import React from "react";
import { Form, Input } from "antd";
import { IEditableCellProps } from "../../models/customers";

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

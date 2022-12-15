export interface ICustomer {
  key: React.Key;
  name: string;
  phone: string;
  email: string;
  social: string | null;
  city: string;
  _id: string;
}

export interface ICustomerState {
  customers: ICustomer[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

export interface ICustomerTable {
  handlers: {
    isEditing: (...args: any) => boolean;
    onEdit: (...args: any) => void;
    onCancel: (...args: any) => void;
    onDelete: (...args: any) => void;
    onCreate: (...args: any) => void;
    onSave: (...args: any) => void;
  };
  tableData: {
    tableDataSource: ICustomer[];
    editingKey: string | number;
    isCreating: boolean;
  };
}

export interface IEditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: ICustomer;
  index: number;
  children: React.ReactNode;
}

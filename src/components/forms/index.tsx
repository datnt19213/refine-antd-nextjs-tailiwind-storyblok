import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Rate,
  Select,
  Table,
  Upload,
} from 'antd';
import { TextAreaProps } from 'antd/es/input';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Heart } from 'lucide-react';

import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY/MM/DD';

const FormFieldWrapper: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="w-full flex flex-col gap-2 justify-center items-center h-full">
        <span className="w-full text-lg font-semibold text-center">{label}</span>
        {children}
    </div>
);

interface FreeTextInputProps extends TextAreaProps {
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    placeholder?: string;
}

interface ConsentCheckboxProps {
    label: string;
    checked: boolean;
    onChange: (e: any) => void;
}
interface DatePickerComponentProps {
    label: string;
    value?: Dayjs;
    onChange?: (date: Dayjs, dateString: string | string[]) => void;
    disabled?: boolean;
    placeholder?: string;
}
interface FileUploadProps {
    label: string;
    uploadButton?: React.ReactNode;
    onChange?: (info: any) => void;
    disabled?: boolean;
    accept?: string;
    multiple?: boolean;
}

interface MatrixProps {
    label: string;
    rows: string[];
    columns: string[];
    onChange?: (value: any) => void;
}
interface MultiSelectProps {
    label: string;
    options: string[];
    onChange: (value: string[]) => void;
}
interface NPSProps {
    label: string;
    value?: number;
    onChange?: (value: number) => void;
}
interface PictureSelectionProps {
    label: string;
    uploadButton?: React.ReactNode;
    onChange?: (info: any) => void;
    disabled?: boolean;
    accept?: string;
    multiple?: boolean;
}
interface RankingProps {
    label: string;
    options: string[];
    onChange?: (value: string[]) => void;
}
interface RatingProps {
    label: string;
    value?: number;
    onChange?: (value: number) => void;
}
interface ScheduleMeetingProps {
    label: string;
    value?: Dayjs;
    onChange?: (date: Dayjs, dateString: string | string[]) => void;
    disabled?: boolean;
    placeholder?: string;
}
interface SingleSelectProps {
    label: string;
    options: string[];
    onChange: (value: string) => void;
}
interface ClapProps {
    onChange: () => void;
}

const FreeTextInput: React.FC<FreeTextInputProps> = ({ label, value, onChange, disabled, placeholder, ...props }) => (
    <FormFieldWrapper label={label}>
        <TextArea className="w-full !min-h-32 border rounded-md p-2 shadow-sm dark:bg-gray-800 dark:border-gray-600" value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} {...props} />
    </FormFieldWrapper>
);

const SingleSelect: React.FC<SingleSelectProps> = ({ label, options, onChange, ...props }) => (
    <FormFieldWrapper label={label}>
        <Select className="w-full " placeholder="Select an option" onChange={onChange} options={options.map((option) => ({ value: option, label: option }))} {...props} />
    </FormFieldWrapper>
);

const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, onChange, ...props }) => (
    <FormFieldWrapper label={label}>
        <Select mode="multiple" className="w-full" placeholder="Select options" onChange={onChange} {...props} options={options.map((option) => ({ value: option, label: option }))} />
    </FormFieldWrapper>
);

const PictureSelection: React.FC<PictureSelectionProps> = ({ label, uploadButton, onChange, disabled, accept, multiple = true, ...props }) => (
    <FormFieldWrapper label={label}>
        <Upload listType="picture" beforeUpload={() => false} onChange={onChange} disabled={disabled} accept={accept} multiple={multiple}>
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
    </FormFieldWrapper>
);

const Rating: React.FC<RatingProps> = ({ label, value, onChange, ...props }) => (
    <FormFieldWrapper label={label}>
        <Rate className="w-fit text-yellow-500 flex justify-center" value={value} onChange={onChange} {...props} />
    </FormFieldWrapper>
);

const NPS: React.FC<NPSProps> = ({ label, value, onChange, ...props }) => (
    <FormFieldWrapper label={label}>
        <Rate allowHalf className="w-fit flex text-yellow-500 justify-center" value={value} onChange={onChange} {...props} />
    </FormFieldWrapper>
);

const Ranking: React.FC<RankingProps> = ({ label, options, onChange, ...props }) => (
    <FormFieldWrapper label={label}>
        <ul className="w-full list-disc ml-5 dark:text-gray-300">
            {options.map((option, index) => (
                <li key={index}>{option}</li>
            ))}
        </ul>
    </FormFieldWrapper>
);

/**
 * props
 * const sampleRows = ["Option 1", "Option 2", "Option 3"];
 * const sampleColumns = ["Column A", "Column B", "Column C"];
*/
// Sample data for demonstration
const sampleRows = ["Option 1", "Option 2", "Option 3"];
const sampleColumns = ["Column A", "Column B", "Column C"];

const sampleDataSource = sampleRows.map((row, rowIndex) => ({ key: rowIndex, rowLabel: row }));
const sampleColumnsData = [
    { title: "Options", dataIndex: "rowLabel", key: "rowLabel" },
    ...sampleColumns.map((col, colIndex) => ({
        title: col,
        dataIndex: `col-${colIndex}`,
        key: `col-${colIndex}`,
        render: () => <Checkbox />,
    })),
];
const Matrix: React.FC<MatrixProps> = ({ label, rows = sampleRows, columns = sampleColumns, onChange, ...props }) => {
    const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

    // Hàm xử lý khi checkbox thay đổi
    const handleCheckboxChange = (rowKey: number, colKey: number) => (e: any) => {
        const newCheckedState = {
            ...checkedState,
            [`${rowKey}-${colKey}`]: e.target.checked,
        };
        setCheckedState(newCheckedState);
        onChange && onChange(newCheckedState);
    };

    // Tạo danh sách hàng
    const dataSource = rows.map((row, rowIndex) => ({
        key: rowIndex,
        rowLabel: row,
    }));

    // Tạo danh sách cột với checkbox
    const columnsData = [
        { title: "Options", dataIndex: "rowLabel", key: "rowLabel" },
        ...columns.map((col, colIndex) => ({
            title: col,
            dataIndex: `col-${colIndex}`,
            key: `col-${colIndex}`,
            render: (_: any, record: any) => (
                <Checkbox
                    checked={checkedState[`${record.key}-${colIndex}`] || false}
                    onChange={handleCheckboxChange(record.key, colIndex)}
                />
            ),
        })),
    ];

    return (
        <FormFieldWrapper label={"How satisfied are you with our services?"}>
            <Table
                className="w-full"
                dataSource={dataSource}
                columns={columnsData}
                pagination={false}
                bordered
            />
        </FormFieldWrapper>
    );
};
const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({ label, checked, onChange, ...props }) => (
    <FormFieldWrapper label={"Let's agree to the terms and conditions"}>
        <Checkbox checked={checked} onChange={onChange} {...props}>{label}</Checkbox>
    </FormFieldWrapper>
);

const FileUpload: React.FC<FileUploadProps> = ({ label, onChange, disabled, accept, multiple, uploadButton, ...props }) => (
    <FormFieldWrapper label={label}>
        <Upload onChange={onChange} disabled={disabled} accept={accept} multiple beforeUpload={() => false}>
            {uploadButton
                || <Button className='mx-auto' icon={<UploadOutlined />}>Upload File</Button>
            }
        </Upload>
    </FormFieldWrapper>
);

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({ label, value, onChange, disabled, placeholder, ...props }) => (
    <FormFieldWrapper label={label}>
        <DatePicker
            value={value}
            format={dateFormat}
            onChange={onChange}
            disabled={disabled}
            className="w-full"
            placeholder={placeholder}
            {...props}
        />
    </FormFieldWrapper>
);

const ScheduleMeeting: React.FC<ScheduleMeetingProps> = ({ label, value, onChange, disabled, placeholder, ...props }) => (
    <FormFieldWrapper label={label}>
        <DatePicker
            value={value}
            format={dateFormat}
            onChange={onChange}
            disabled={disabled}
            className="w-full"
            placeholder={placeholder}
            {...props}
        />
    </FormFieldWrapper>
);

const Clapping: React.FC<ClapProps> = ({ onChange, ...props }) => (
    <Button onClick={() => onChange && onChange()} {...props} variant='outlined' className='aspect-square' >
        <Heart />
    </Button>
);

export {
  Clapping,
  ConsentCheckbox,
  DatePickerComponent,
  FileUpload,
  FormFieldWrapper,
  FreeTextInput,
  Matrix,
  MultiSelect,
  NPS,
  PictureSelection,
  Ranking,
  Rating,
  ScheduleMeeting,
  SingleSelect,
};

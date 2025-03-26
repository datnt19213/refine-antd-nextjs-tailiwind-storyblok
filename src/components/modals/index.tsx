import React, {
  ChangeEvent,
  FC,
  useCallback,
  useState,
} from 'react';

import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
} from 'antd';
import cuid from 'cuid';
import dayjs, { Dayjs } from 'dayjs';
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
} from 'lucide-react';

import { createReview } from '@/services';
import {
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import ThankYou from '../common/thankyou';
import {
  ConsentCheckbox,
  DatePickerComponent,
  FreeTextInput,
  Matrix,
  MultiSelect,
  PictureSelection,
  Rating,
  ScheduleMeeting,
  SingleSelect,
} from '../forms';

export const ModalSurvey = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);


    const [text, setText] = useState('');
    const [date, setDate] = useState<string | string[]>("");
    const [matrixData, setMatrixData] = useState<any>([]);
    const [selectedPictures, setSelectedPictures] = useState<File[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string>("");
    const [selectedOptions2, setSelectedOptions2] = useState<string[]>([]);
    const [selectedRating, setSelectedRating] = useState<number>(0);
    const [selectedSchedule, setSelectedSchedule] = useState<string | string[]>("");
    const [checked, setChecked] = useState<boolean>(false);
    const [isLoad, setIsLoad] = useState<boolean>(false);

    const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8]


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        const response = await createReview({
            finished: true,
            surveyId: process.env.NEXT_PUBLIC_SV_ID || "",
            language: "default",
            data: {

            }
        })
        response && setSubmitted(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSubmitted(false);
    };

    function handlePrev(): void {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    function handleNext(): void {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    }

    function handleSingleSelectChange(value: string): void {
        setSelectedOptions(value);
    }
    function handleMultiSelectChange(value: string[]): void {
        setSelectedOptions2(value);
    }

    function handleConsentCheckboxChange(e: any): void {
        setChecked(e.target.checked);
    }

    function handleFreeTextInputChange(e: ChangeEvent<HTMLTextAreaElement>): void {
        setText(e.target.value);
        console.log(e.target.value);
    }

    const handleDatePickerChange = (date: Dayjs | null, dateString: string | string[]) => {
        setDate(dateString);
    };


    const handleScheduleMeetingChange = (date: Dayjs | null, dateString: string | string[]) => {
        setSelectedSchedule(dateString);

    };

    const handleMatrixChange = (data: any) => {
        console.log("Matrix data:", data);
    };

    async function handlePictureSelectionChange(info: any): Promise<void> {
        const files = info.fileList.map((file: any) => file.originFileObj);

        // Hàm chuyển đổi file sang Base64
        const convertToBase64 = (file: File): Promise<string> => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });
        };

        // Chuyển tất cả ảnh sang Base64
        const base64Images = await Promise.all(files.map(convertToBase64));

        setSelectedPictures(base64Images);
    }
    function handleRatingChange(value: number): void {

        setSelectedRating(value);
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Survey
            </Button>
            <Modal className='min-w-[900px]' title="Evaluation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <div className='min-h-[300px] flex flex-col pt-12 items-center w-full'>
                    {
                        currentStep === 0 && <FreeTextInput label="How's your experience?" value={text} onChange={handleFreeTextInputChange} />
                    }
                    {
                        currentStep === 1 && <SingleSelect label="What is your favorite color?" options={['Red', 'Green', 'Blue']} onChange={handleSingleSelectChange} />
                    }
                    {
                        currentStep === 2 && <MultiSelect label="What are your favorite fruits?" options={['Apple', 'Banana', 'Orange']} onChange={handleMultiSelectChange} />
                    }
                    {
                        currentStep === 3 && <ConsentCheckbox label="Do you agree to our terms and conditions?" checked={checked} onChange={handleConsentCheckboxChange} />
                    }
                    {
                        currentStep === 4 && <DatePickerComponent label="When do you want to meet?" value={dayjs()} onChange={handleDatePickerChange} />
                    }
                    {
                        currentStep === 5 && <ScheduleMeeting label="When do you want to schedule a meeting?" value={dayjs()} onChange={handleScheduleMeetingChange}
                        />
                    }
                    {
                        currentStep === 6 && <Matrix label="How satisfied are you with our services?" rows={["Row 1", "Row 2", "Row 3"]}
                            columns={["Column A", "Column B"]} onChange={handleMatrixChange} />
                    }
                    {
                        currentStep === 7 && <PictureSelection label="Upload a picture of yourself" onChange={handlePictureSelectionChange} />
                    }
                    {
                        currentStep === 8 && <Rating label="How would you rate your experience?" value={selectedRating} onChange={handleRatingChange} />
                    }
                    {
                        submitted && isLoad && <ThankYou
                            title="Thank You for Your Order!"
                            message="Your order has been successfully placed"
                            subtitle="You will receive a confirmation email shortly"
                        />
                    }
                    {submitted && !isLoad && <div className="flex justify-center items-center h-[100px] w-[100px] aspect-square">
                        <Loader2 size={32} className='animate-spin ease-in' />
                    </div>}
                </div>
                <div className='flex justify-between items-center gap-3 py-2'>
                    <Button size='middle' type="default" onClick={() => handlePrev()}>
                        <ArrowLeft size={20} /> Back
                    </Button>
                    {currentStep < steps.length - 1 && <Button size='middle' type="default" onClick={() => handleNext()}>
                        Next <ArrowRight size={20} />
                    </Button>}
                    {currentStep === steps.length - 1 && <Button size='middle' type="primary" onClick={handleOk}>
                        Submit
                    </Button>}
                </div>
                <div className='flex w-full gap-1'>
                    <div style={{
                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                    }} className='h-[3px] bg-gradient-to-r from-indigo-500 via-green-700 to-yellow-500 rounded-full transition-all duration-200' />
                    <div style={{
                        width: `${(1 - ((currentStep + 1) / steps.length)) * 100}%`,

                    }} className='h-[3px] bg-gray-200 rounded-full transition-all duration-200' />
                </div>
            </Modal>
        </>
    );
}



export const NewSurveyModal: FC<{ onFinish: (survey: any) => void }> = ({ onFinish }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const formTypes = [
        { label: "Multiple Choice", value: "multipleChoice" },
        { label: "Rating", value: "rating" },
        { label: "Text Input", value: "textInput" },
        { label: "Matrix", value: "matrix" },
        { label: "Picture Selection", value: "pictureSelection" },
        { label: "Yes/No", value: "yesNo" },
        { label: "Dropdown", value: "dropdown" },
        { label: "Date Picker", value: "datePicker" },
        { label: "File Upload", value: "fileUpload" },
        { label: "Number Input", value: "numberInput" },
        { label: "Slider", value: "slider" }
    ];

    const showModal = useCallback(() => setIsModalVisible(true), []);
    const handleCancel = useCallback(() => {
        setIsModalVisible(false);
        form.resetFields();
    }, [form]);

    const handleCreateSurvey = async (values: any) => {
        try {
            setLoading(true);
            const payload: any = {
                name: values.surveyTitle?.trim(),
                type: values.surveyType || "link",
                environmentId: values.environmentId,
                status: "inProgress",
                welcomeCard: {
                    html: { default: values.welcomeMessage?.trim() || "Welcome to our survey!" },
                    enabled: true,
                    headline: { default: "Welcome!" }
                },
                questions: values.questions?.map((q: any, index: number) => {
                    const questionData: any = {
                        id: q.id && q.id.startsWith("c") ? q.id : cuid(), // Đảm bảo ID hợp lệ
                        type: q.questionType?.trim(), // Kiểm tra type hợp lệ
                        headline: { default: q.question?.trim() || `Question ${index + 1}` },
                        required: q.required ?? true
                    };

                    if (q.inputType) questionData.inputType = q.inputType;
                    if (q.subheader) questionData.subheader = { default: q.subheader.trim() };
                    if (q.placeholder) questionData.placeholder = { default: q.placeholder.trim() };

                    if (["multipleChoiceSingle", "multipleChoiceMulti"].includes(q.questionType) && q.choices?.length) {
                        questionData.choices = q.choices.map((choice: any, i: number) => ({
                            id: choice.id && choice.id.startsWith("c") ? choice.id : cuid(),
                            label: { default: choice.label?.trim() }
                        }));
                    }

                    return questionData;
                }) || [],
                endings: [
                    {
                        id: cuid(), // Fix lỗi "Invalid cuid2"
                        type: "endScreen",
                        headline: { default: "Thank you!" },
                        subheader: { default: "We appreciate your feedback." },
                        buttonLink: "https://formbricks.com/signup",
                        buttonLabel: { default: "Create your own Survey" }
                    }
                ]
            };
            onFinish && onFinish(payload);

            handleCancel(); // Reset form & close modal
        } catch (error) {
            // console.error("Error creating survey:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Create Survey
            </Button>
            <Modal
                title="Create New Survey"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
                destroyOnClose
            >
                <Form form={form} onFinish={handleCreateSurvey} layout="vertical">
                    <Form.Item
                        name="surveyTitle"
                        label="Survey Title"
                        rules={[{ required: true, message: "Please input survey title!" }]}
                    >
                        <Input placeholder="Enter survey title" />
                    </Form.Item>

                    <Form.List name="questions">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "questionType"]}
                                            rules={[{ required: true, message: "Please select question type!" }]}
                                        >
                                            <Select placeholder="Select question type" style={{ width: 200 }}>
                                                {formTypes.map(({ value, label }) => (
                                                    <Select.Option key={value} value={value}>
                                                        {label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, "question"]}
                                            rules={[{ required: true, message: "Please input question!" }]}
                                        >
                                            <Input placeholder="Enter your question" style={{ width: 300 }} />
                                        </Form.Item>

                                        <Button type="text" icon={<DeleteOutlined />} onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Question
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Create Survey
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
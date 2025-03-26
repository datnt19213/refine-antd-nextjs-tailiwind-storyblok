import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Upload,
} from 'antd';

import {
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const questionTypes = [
    { label: "Open Text", value: "openText" },
    { label: "Multiple Choice (Single)", value: "multipleChoiceSingle" },
    { label: "Multiple Choice (Multi)", value: "multipleChoiceMulti" },
    { label: "Rating", value: "rating" },
    { label: "NPS (Net Promoter Score)", value: "nps" },
    { label: "File Upload", value: "fileUpload" },
];

const SurveyForm = () => {
    const [form] = Form.useForm();
    const [questionType, setQuestionType] = useState<string | null>(null);
    const [choices, setChoices] = useState<string[]>([]);

    const addChoice = () => {
        const value = form.getFieldValue("newChoice");
        if (value && !choices.includes(value)) {
            setChoices([...choices, value]);
            form.setFieldValue("newChoice", "");
        }
    };

    const removeChoice = (choice: string) => {
        setChoices(choices.filter((c) => c !== choice));
    };

    const handleSubmit = () => {
        form.validateFields().then((values) => {
            const formData: any = {
                type: values.questionType,
                headline: values.headline,
                required: values.required || false,
            };

            if (values.questionType === "multipleChoiceSingle" || values.questionType === "multipleChoiceMulti") {
                formData.choices = choices;
            }

            if (values.questionType === "rating") {
                formData.min = 1;
                formData.max = values.maxRating || 10;
            }

            if (values.questionType === "nps") {
                formData.min = 0;
                formData.max = 10;
            }

            if (values.questionType === "fileUpload") {
                formData.allowedFormats = values.allowedFormats || ["jpg", "png", "pdf"];
                formData.maxSizeMB = values.maxSizeMB || 5;
            }

            if (values.questionType === "openText") {
                formData.placeholder = values.placeholder || "Enter your response...";
            }

            console.log("JSON Output:", JSON.stringify(formData, null, 2));
        });
    };

    return (
        <Form form={form} layout="vertical">
            {/* Chọn loại câu hỏi */}
            <Form.Item label="Question Type" name="questionType" rules={[{ required: true }]}>
                <Select onChange={(value) => setQuestionType(value)} placeholder="Select question type">
                    {questionTypes.map((type) => (
                        <Option key={type.value} value={type.value}>
                            {type.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            {/* Tiêu đề câu hỏi */}
            <Form.Item label="Question Headline" name="headline" rules={[{ required: true }]}>
                <Input placeholder="Enter question headline" />
            </Form.Item>

            {/* Câu trả lời dạng nhiều lựa chọn */}
            {(questionType === "multipleChoiceSingle" || questionType === "multipleChoiceMulti") && (
                <>
                    <Form.Item label="Choices">
                        <Input.Group compact>
                            <Input style={{ width: "80%" }} placeholder="Enter choice" name="newChoice" />
                            <Button type="primary" icon={<PlusOutlined />} onClick={addChoice}>
                                Add
                            </Button>
                        </Input.Group>
                    </Form.Item>
                    <div>
                        {choices.map((choice) => (
                            <div key={choice} style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
                                <span style={{ flex: 1 }}>{choice}</span>
                                <Button type="link" danger onClick={() => removeChoice(choice)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Đánh giá sao */}
            {questionType === "rating" && (
                <Form.Item label="Rating Scale (1-10)">
                    <Form.Item name="maxRating" noStyle>
                        <InputNumber min={1} max={10} defaultValue={10} />
                    </Form.Item>
                </Form.Item>
            )}

            {/* NPS */}
            {questionType === "nps" && (
                <Form.Item label="Net Promoter Score (0-10)">
                    <Slider min={0} max={10} marks={{ 0: "0", 10: "10" }} />
                </Form.Item>
            )}

            {/* Upload file */}
            {questionType === "fileUpload" && (
                <>
                    <Form.Item label="Allowed File Formats" name="allowedFormats">
                        <Select mode="multiple" placeholder="Select allowed formats">
                            <Option value="jpg">JPG</Option>
                            <Option value="png">PNG</Option>
                            <Option value="pdf">PDF</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Max File Size (MB)" name="maxSizeMB">
                        <InputNumber min={1} max={100} defaultValue={5} />
                    </Form.Item>
                    <Form.Item label="Upload File">
                        <Upload>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                </>
            )}

            {/* Placeholder cho Open Text */}
            {questionType === "openText" && (
                <Form.Item label="Placeholder Text" name="placeholder">
                    <Input placeholder="Enter a placeholder..." />
                </Form.Item>
            )}

            {/* Checkbox bắt buộc */}
            <Form.Item name="required" valuePropName="checked">
                <Checkbox>Required</Checkbox>
            </Form.Item>

            <Button type="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
};

export default SurveyForm;

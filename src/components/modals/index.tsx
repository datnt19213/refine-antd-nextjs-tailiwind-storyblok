import React, {
    ChangeEvent,
    useState,
} from 'react';

import {
    Button,
    Modal,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import {
    ArrowLeft,
    ArrowRight,
    Loader2,
} from 'lucide-react';

import { createReview } from '@/services';

import ThankYou from '../common/thankyou';
import {
    ConsentCheckbox,
    DatePickerComponent,
    FreeTextInput,
    Matrix,
    MultiSelect,
    NPS,
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
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [selectedNPS, setSelectedNPS] = useState<number | null>(null);
    const [selectedSchedule, setSelectedSchedule] = useState<string | string[]>("");
    const [checked, setChecked] = useState<boolean>(false);

    const steps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


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

    function handleFreeTextInputChange(e: ChangeEvent<HTMLInputElement>): void {
        setText(e.target.value);
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

    function handleNPSChange(value: number): void {
        setSelectedNPS(value);
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal className='min-w-[900px]' title="Evaluation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='min-h-[300px]'>
                    {
                        currentStep === 0 && <FreeTextInput label="What is your name?" value={text} onChange={handleFreeTextInputChange} />
                    }
                    {
                        currentStep === 1 && <SingleSelect label="What is your favorite color?" options={['Red', 'Green', 'Blue']} onChange={handleSingleSelectChange} />
                    }
                    {
                        currentStep === 2 && <MultiSelect label="What are your favorite fruits?" options={['Apple', 'Banana', 'Orange']} onChange={handleMultiSelectChange} />
                    }
                    {
                        currentStep === 3 && <ConsentCheckbox label="Do you agree to our terms and conditions?" checked={false} onChange={handleConsentCheckboxChange} />
                    }
                    {
                        currentStep === 4 && <DatePickerComponent label="When do you want to meet?" value={dayjs("2025-03-20 12:00")} onChange={handleDatePickerChange} />
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
                        currentStep === 8 && <Rating label="How would you rate your experience?" onChange={handleRatingChange} />
                    }
                    {
                        currentStep === 9 && <NPS label="How likely are you to recommend us?" value={0} onChange={handleNPSChange} />
                    }
                    {
                        submitted && <ThankYou
                            title="Thank You for Your Order!"
                            message="Your order has been successfully placed"
                            subtitle="You will receive a confirmation email shortly"
                        /> || <div className="flex justify-center items-center h-[100px] w-[100px] aspect-square">
                            <Loader2 size={32} className='animate-spin ease-in' />
                        </div>
                    }
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

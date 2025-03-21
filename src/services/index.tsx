import axios from 'axios';

export const getReviewList = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/management/responses", {
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
        },
    });
    if (response.status === 200) {
        return response.data?.data || [];
    }
}


export interface ReviewForm {
    surveyId: string;
    finished: boolean;
    data: any;
    language: string;
}

export const createReview = async (review: ReviewForm) => {
    const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/management/responses", review, {
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
        },
    });
    if (response.status === 201) {
        return response.data;
    }
}

export interface ReviewEditForm {
    finished: boolean;
    data: any;
}

export const updateReview = async (id: string, review: ReviewEditForm) => {
    const response = await axios.put(process.env.NEXT_PUBLIC_BASE_URL + `/management/responses/${id}` + review, {
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
        },
    });
    if (response.status === 200) {
        return response.data?.data || {};
    }
}

export interface ReviewDeleteForm {
    id: string;
}

export const deleteReview = async (id: string) => {
    const response = await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + `/management/responses/${id}`, {
        headers: {
            "x-api-key": process.env.NEXT_PUBLIC_X_API_KEY,
        },
    });
    if (response.status === 200) {
        return response.data?.data || {};
    }
}



// export interface ReviewForm {
//     email: string;
//     voting: number;
//     rating: number;
//     single_choice: string;
//     multi_choice: string[];
//     date: string;
//     is_check: boolean;
//     image: string;
//     favorite_point: number;
//     products: string;
//     create_at: string;
//     id: number;
// }
// export const createReview = async (review: ReviewForm) => {
//     const response = await axios.post(process.env.NEXT_PUBLIC_BASE_URL + "/users", {
//         records: [
//             {
//                 fields: review
//             }
//         ]
//     });
//     if (response.status === 201) {
//         return response.data;
//     }
// }

import { HappinessForm } from '@/types/happiness';
import {
  BaseRecord,
  DataProvider,
  GetOneParams,
  GetOneResponse,
} from '@refinedev/core';

import {
  createReview,
  deleteReview,
  getReviewList,
  ReviewForm,
  updateReview,
} from './';
import {
  createHappiness,
  deleteHappiness,
  getHappiness,
  getHappinessById,
  updateHappiness,
} from './directus';

export const dataProvider: DataProvider = {
  getList: async ({resource}) => {
    if (resource === "happiness") {
      const data = (await getHappiness()) || [];
      return {data, total: data.length};
    } else if (resource === "review") {
      const data = (await getReviewList()) || [];
      return {data, total: data.length};
    }
    return {data: [], total: 0};
  },
  getOne: async <TData extends BaseRecord = BaseRecord>({
    resource,
    id,
  }: GetOneParams): Promise<GetOneResponse<TData>> => {
    if (resource === "happiness") {
      const data = await getHappinessById(String(id));
      return {data: data as unknown as TData};
    }
    throw new Error(`getOne không hỗ trợ cho resource: ${resource}`);
  },
  create: async <TVariables>({resource, variables}: {resource: string; variables: TVariables}) => {
    if (resource === "happiness") {
      const data = await createHappiness(variables as HappinessForm);
      return {data};
    } else if (resource === "review") {
      const data = await createReview(variables as ReviewForm);
      return {data};
    }
    throw new Error(`create không hỗ trợ cho resource: ${resource}`);
  },
  update: async ({resource, id, variables}) => {
    if (resource === "happiness") {
      const data = await updateHappiness(String(id), variables as HappinessForm);
      return {data};
    } else if (resource === "review") {
      const data = await updateReview(String(id), variables as ReviewForm);
      return {data};
    }
    throw new Error(`update không hỗ trợ cho resource: ${resource}`);
  },
  deleteOne: async ({resource, id}) => {
    if (resource === "happiness") {
      const data = await deleteHappiness(String(id));
      return {data};
    } else if (resource === "review") {
      const data = await deleteReview(String(id));
      return {data};
    }
    throw new Error(`delete không hỗ trợ cho resource: ${resource}`);
  },
  getApiUrl: () => {
    return process.env.NEXT_PUBLIC_API_URL || "";
  },
};

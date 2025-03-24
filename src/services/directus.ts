import axios from 'axios';

import {
  Happiness,
  HappinessForm,
} from '@/types/happiness';

export const getHappiness = async () => {
  const response = await axios.get(process.env.NEXT_PUBLIC_DIRECTUS_URL + "/items/happiness");
  // const response = await axios.get("https://api-tapnews.up.railway.app/test");
  if (response.status === 200) {
    return (response.data?.data as Happiness[]) || [];
  }
};
export const getHappinessById = async (id: string) => {
  const response = await axios.get(process.env.NEXT_PUBLIC_DIRECTUS_URL + "/items/happiness/" + id);
  if (response.status === 200) {
    return (response.data?.data as Happiness) || {};
  }
};
export const createHappiness = async (happiness: HappinessForm) => {
  const response = await axios.post(process.env.NEXT_PUBLIC_DIRECTUS_URL + "/items/happiness", happiness);
  if (response.status === 200) {
    return (response.data?.data as Happiness) || {};
  }
};

export const updateHappiness = async (id: string, happiness: HappinessForm) => {
  const response = await axios.put(process.env.NEXT_PUBLIC_DIRECTUS_URL + "/items/happiness/" + id, happiness);
  if (response.status === 200) {
    return (response.data?.data as Happiness) || {};
  }
};
export const deleteHappiness = async (id: string) => {
  const response = await axios.delete(process.env.NEXT_PUBLIC_DIRECTUS_URL + "/items/happiness/" + id);
  if (response.status === 200) {
    return (response.data?.data as Happiness) || {};
  }
};

"use client";
import { useEffect } from 'react';

import { Provider } from 'react-redux';

import { store } from '@/store/store';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        console.log("Redux Store State:", store.getState());
    }, []);

    return <Provider store={store}>{children}</Provider>;
}

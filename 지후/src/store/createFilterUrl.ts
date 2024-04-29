import { FilterParamsTypes } from "@/types/movie";
import { create } from "zustand";

type FilterType = 'date' | 'sorted' | 'genre'

type FilterValueType = number | string | { from: string, to: string }

export interface FilterContentType {
    filterData: FilterParamsTypes,
    setFilterData: (type: FilterType, value: FilterValueType) => void, // Updated type here
    generateFilterUrl: (state: FilterParamsTypes, type?: string) => string
}




export const useFilterStore = create<FilterContentType>((set) => ({
    filterData: {
        date: {
            from: '',
            to: ''
        },
        sorted: '',
        genre: []
    },
    setFilterData: (type: FilterType, value: FilterValueType) => set((state: FilterContentType) => {
        let copyFilterTarget: FilterParamsTypes = {
            ...state.filterData
        }

        if (type === 'genre' && typeof value === 'number') {
            if (state.filterData.genre.includes(value)) {
                return {
                    filterData: {
                        ...state.filterData,
                        [type]: state.filterData.genre.filter(item => item !== value)
                    }
                }
            } else {
                return {
                    filterData: {
                        ...state.filterData,
                        [type]: [...state.filterData.genre, value]
                    }
                }
            }
        }

        if (type === 'date' && typeof value === 'object') {
            copyFilterTarget[type] = value;
        }

        if (type === 'sorted' && typeof value === 'string') {
            copyFilterTarget[type] = value;
        }

        return {
            filterData: copyFilterTarget
        }
    }),
    generateFilterUrl: (state: FilterParamsTypes) => {
        const filterUrl = new URLSearchParams();

        if (state.date.from) {
            filterUrl.append('primary_release_date.gte', `${state.date.from}`);
        }

        if (state.date.to) {
            filterUrl.append('primary_release_date.lte', `${state.date.to}`);
        }

        if (state.genre.length) {
            filterUrl.append('genre', state.genre.join(','))
        }
        if (state.sorted) {
            filterUrl.append('sorted', state.sorted)
        }

        return filterUrl.toString();
    }
}))
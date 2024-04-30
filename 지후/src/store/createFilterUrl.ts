import { FilterParamsTypes } from "@/types/movie";
import { create } from "zustand";

type FilterType = 'date' | 'sorted' | 'genre'

type FilterValueType = number | string | { from: string, to: string }

export interface FilterContentType {
    url: string,
    setUrl: (url: string) => void,
    filterData: FilterParamsTypes,
    setFilterData: (type: FilterType, value: FilterValueType) => void, // Updated type here
    generateFilterUrl: (state: FilterParamsTypes, type?: string) => string
}

export const useFilterStore = create<FilterContentType>((set) => ({
    url: '',
    setUrl: (url: string) => set({ url }),
    filterData: {
        date: {
            from: '',
            to: ''
        },
        sorted: 'popularity.desc',
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
    generateFilterUrl: (state: FilterParamsTypes, set) => {
        const filterUrl = new URLSearchParams();

        if (state.date.from) {
            filterUrl.append('primary_release_date.gte', `${state.date.from}`);
        }

        if (state.date.to) {
            filterUrl.append('primary_release_date.lte', `${state.date.to}`);
        }

        if (state.genre.length) {
            filterUrl.append('with_genres', state.genre.join(','))
        }
        if (state.sorted) {
            filterUrl.append('sort_by', state.sorted)
        }

        return filterUrl.toString();
    }
}))
export type OptionTabTitleTypes = '정렬' | 'Where To Watch' | '필터';
export type OptionTabTypeTypes = 'sort' | 'whereWatch' | 'filter';

export type FilterMenuTypes = {
    title: OptionTabTitleTypes;
    type: OptionTabTypeTypes;
};

export interface IconTypes {
    color?: string,
    size?: number
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
}
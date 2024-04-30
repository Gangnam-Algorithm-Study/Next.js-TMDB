declare module "rc-calendar/lib/Picker" {
  // You can declare the module's exports, types, or interfaces here.
  // For example:
  export interface PickerProps {
    animation?:
      | ((element: HTMLElement, type: string, callback: () => void) => void)
      | string;
    disabled?: boolean;
    transitionName?: string;
    onChange?: (value: any) => void; // 변경될 데이터의 타입을 여기에 적절하게 지정
    onOpenChange?: (open: boolean) => void;
    children?: (value: any) => ReactNode; // 반환되는 노드의 타입을 여기에 적절하게 지정
    getCalendarContainer?: (triggerNode: HTMLElement) => HTMLElement;
    calendar?: ReactNode;
    style?: CSSProperties;
    open?: boolean;
    defaultOpen?: boolean;
    prefixCls?: string;
    placement?: any; // 적절한 타입으로 변경해야 할 수도 있습니다.
    value?: any; // 변경될 데이터의 타입을 여기에 적절하게 지정
    defaultValue?: any; // 변경될 데이터의 타입을 여기에 적절하게 지정
    align?: object; // align의 타입을 정확하게 지정해야 합니다.
    dateRender?: (current: Date) => ReactNode; // 반환되는 노드의 타입을 여기에 적절하게 지정
    onBlur?: () => void;
  }

  export class Picker extends React.Component<PickerProps> {
    // You can define the Picker component class here.
  }

  export default Picker;
}

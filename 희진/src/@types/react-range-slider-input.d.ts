declare module "react-range-slider-input" {
  import { FC, ChangeEvent } from "react";

  interface RangeSliderProps {
    min: number;
    max: number;
    value: number[];
    onInput: (value: number[]) => void;
  }

  const RangeSlider: FC<RangeSliderProps>;

  export default RangeSlider;
}

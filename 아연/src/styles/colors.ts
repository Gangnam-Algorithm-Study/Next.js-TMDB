import { css } from '@emotion/react'

export const colorPalette = css`
  :root {
    --color-yellow-100: rgba(255, 249, 188, 1);
    --color-yellow-200: rgba(255, 249, 189, 1);

    --color-orange-100: rgba(255, 195, 97, 1);
    --color-orange-200: rgba(254, 195, 97, 1);
    --color-orange-300: rgba(255, 107, 87, 1);

    --color-pink-100: rgba(249, 140, 189, 1);

    --color-blue-100: rgba(105, 191, 255, 1);
    --color-blue-200: rgba(43, 114, 216, 1);
    --color-blue-300: rgba(36, 97, 186, 1);
    --color-blue-400: rgba(18, 49, 93, 1);

    --color-grey-100: #cecece;

    --color-green-100: rgba(195, 235, 164, 1);
    --color-green-200: rgba(174, 216, 147, 1);
    --color-green-300: rgba(115, 216, 156, 1);
    --color-green-400: rgba(3, 107, 87, 1);

    --shadow-orange-100: rgba(255, 174, 39, 1);

    --shadow-pink-100: rgba(247, 169, 160, 1);
    --shadow-pink-200: rgba(242, 104, 166, 1);

    --shadow-blue-100: rgba(28, 103, 211, 1);

    --gradient-yellow-100: rgba(115, 216, 156, 0);
  }
`

export const colors = {
  yellow100: 'var( --color-yellow-100)',
  yellow200: 'var( --color-yellow-200)',
  orange100: 'var( --color-orange-100)',
  orange200: 'var( --color-orange-200)',
  orange300: 'var( --color-orange-300)',

  pink100: 'var( --color-pink-100)',

  green100: 'var( --color-green-100)',
  green200: 'var( --color-green-200)',
  green300: 'var( --color-green-300)',
  green400: 'var( --color-green-400)',

  blue100: 'var(--color-blue-100)',
  blue200: 'var(--color-blue-200)',
  blue300: 'var(--color-blue-300)',
  blue400: 'var(--color-blue-400)',

  grey100: 'var(--color-grey-100)',
}

const shadows = {
  orange100: 'var( --shadow-orange-100)',
  pink100: 'var( --shadow-pink-100)',
  pink200: 'var( --shadow-pink-200)',
  blue100: 'var( --shadow-blue-100)',
}

const gradients = {
  yellow100: 'var(--gradient-yellow-100)',
}

export type Colors = keyof typeof colors

export type Shadows = keyof typeof shadows

export type Gradients = keyof typeof gradients

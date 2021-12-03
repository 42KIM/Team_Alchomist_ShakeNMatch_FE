import styled from '@emotion/styled';
import type { DividerProps } from './types';

const Line = styled.hr<Required<Pick<DividerProps, 'size' | 'gap' | 'color'>>>`
  border: none;
  background-color: ${({ color }): string => color};

  &.horizontal {
    display: block;
    width: 100%;
    height: ${({ size }): string => `${size}px`};
    margin: ${({ gap }): string => `${gap}px 0 ${gap}px 0`};
  }

  &.vertical {
    display: inline-block;
    height: 100%;
    width: ${({ size }): string => `${size}px`};
    margin: ${({ gap }): string => `0 ${gap}px 0 ${gap}px`};
    vertical-align: middle;
  }
`;

export { Line };

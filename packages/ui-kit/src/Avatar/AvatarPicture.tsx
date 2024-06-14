import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export type MimeType =
  | 'image/webp'
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'image/apng'
  | 'image/svg+xml'
  | 'image/bmp'
  | 'image/x-icon';

export type SrcObject = {
  readonly srcSet: string;
  readonly type: MimeType;
  readonly isDefault?: boolean;
};

export type AvatarPictureProps = React.HTMLAttributes<HTMLPictureElement> & {
  /**
   * image object of Avatar component
   * Example:
   * ```tsx
   * <Avatar src={[{
   *  srcSet: 'https://google.com/images/img.png',
   *  type: 'image/png',
   *  isDefault: true,
   * }]}>
   *   Label
   * </Avatar>
   * ```
   */
  readonly src: SrcObject[];

  /**
   * Avatar style variant\
   * Allowed variants: `circular`,`rounded` or `square`\
   * \
   * **Default**: `circular`
   */
  readonly variant?: 'circular' | 'rounded' | 'square';
};

const Picture = styled.picture<{ $variant: AvatarPictureProps['variant'] }>`
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  & img {
    width: 100%;
    height: 100%;
  }

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'rounded':
        return css`
          border-radius: ${theme.shape.radiusFactor * 0.8}em;
          overflow: hidden;
        `;

      case 'square':
        return css`
          border-radius: inherit;
        `;

      default:
        return css`
          border-radius: 100%;
          overflow: hidden;
        `;
    }
  }}
`;

const generateKey = () => (Math.random() * 10000).toFixed();

const AvatarPicture: React.ForwardRefRenderFunction<HTMLSpanElement, AvatarPictureProps> = (
  props,
  ref,
) => {
  const { src, variant, ...nativeProps } = props;

  const defaultSrc = React.useMemo(() => {
    if (typeof src === 'undefined' || src?.length === 0) {
      return null;
    }

    let retData: SrcObject | undefined = src.find(({ isDefault }) => isDefault);

    if (retData) {
      return retData;
    }

    retData = src.find(src => src.type === 'image/png');

    if (retData) {
      return retData;
    }

    retData = src.find(src => src.type === 'image/jpeg');

    return retData ? retData : null;
  }, [src]);

  return (
    <Picture {...nativeProps} $variant={variant} ref={ref}>
      {src.map(({ isDefault, ...srcProps }) => (
        <source key={generateKey()} {...srcProps} />
      ))}
      <img src={defaultSrc?.srcSet || ''} />
    </Picture>
  );
};

export default React.forwardRef(AvatarPicture);

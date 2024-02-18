import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'
import style from './style.module.scss'

export type Colors =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'warning'
  | 'info'
  | 'danger'
  | 'common-neutrals-gray'
  | 'common-neutrals-black'
  | 'primary-dark'
  | 'secondary-dark'

export type FontsStyle =
  | 'inherit'
  | 'heading1'
  | 'h1-Medium'
  | 'heading2'
  | 'h2-Medium'
  | 'heading3'
  | 'heading4'
  | 'base-light'
  | 'base-regular'
  | 'base-medium'
  | 'base-semibold'
  | 'base-bold'
  | 'small-light'
  | 'small-regular'
  | 'small-medium'
  | 'small-semibold'
  | 'small-bold'
  | 'large-light'
  | 'large-regular'
  | 'large-medium'
  | 'large-semibold'
  | 'large-bold'
  | 'large-medium'
  | 'title-h1'
  | 'title-h2'
  | 'title-h3'
  | 'title-h4'

export interface TypographyProps {
  component?: FC<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>> | string
  className?: string
  color?: Colors
  isLink?: boolean
  children?: ReactNode
  onClick?: () => void
  fontsStyle?: FontsStyle
  role?: string
}

const colorsClass: Record<Colors, string> = {
  inherit: '',
  primary: style.typographyColorPrimary,
  secondary: style.typographyColorSecondary,
  tertiary: style.typographyColorTertiary,
  info: style.typographyColorInfo,
  warning: style.typographyColorWarning,
  danger: style.typographyColorDanger,
  'common-neutrals-gray': style.typographyCommonNeutralsGray,
  'common-neutrals-black': style.typographyCommonNeutralsBlack,
  'primary-dark': style.typographyPrimaryDark,
  'secondary-dark': style.typographySecondaryDark,
}

const fontStyle: Record<FontsStyle, string> = {
  inherit: '',
  heading1: style.heading1,
  heading2: style.heading2,
  heading3: style.heading3,
  heading4: style.heading4,
  'h1-Medium': style.heading1Medium,
  'h2-Medium': style.heading2Medium,
  'base-light': style.baseLight,
  'base-regular': style.baseRegular,
  'base-medium': style.baseMedium,
  'base-semibold': style.baseSemibold,
  'base-bold': style.baselBold,
  'small-light': style.smallLight,
  'small-regular': style.smallRegular,
  'small-medium': style.smallMedium,
  'small-semibold': style.smallSemibold,
  'small-bold': style.smallBold,
  'large-light': style.largeLight,
  'large-regular': style.largeRegular,
  'large-medium': style.largeMedium,
  'large-semibold': style.largeSemibold,
  'large-bold': style.largeBold,
  'title-h1': style.titleH1,
  'title-h2': style.titleH2,
  'title-h3': style.titleH3,
  'title-h4': style.titleH4,
}

const Typography: FC<TypographyProps> = ({
  children,
  className,
  color = 'inherit',
  component = 'p',
  fontsStyle = 'inherit',
  isLink,
  role,
  onClick,
}) => {
  const VariableComponent = component
  const componentClass = [
    style.typography,
    colorsClass[color],
    className || '',
    fontStyle[fontsStyle as keyof typeof fontStyle],
    isLink ? style.typography__link : '',
  ]

  return (
    <VariableComponent className={componentClass.join(' ')} onClick={onClick} role={role}>
      {children}
    </VariableComponent>
  )
}

export default Typography

import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base'

interface ButtonProps extends IButtonProps {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      {...rest}
      w="full"
      bg={variant === 'outline' ? 'transparent' : 'green.700'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      h={14}
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : 'green.500',
      }}
    >
      <Text
        color={variant === 'outline' ? 'green.500' : 'white'}
        fontFamily="heading"
        fontSize="sm"
        rounded="sm"
      >
        {title}
      </Text>
    </NativeBaseButton>
  )
}

import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

type InputProps = IInputProps & {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputProps) {
  const isInvalidMessage = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={isInvalidMessage} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={14}
        w="full"
        px={4}
        borderWidth={0}
        fontSize="md"
        color="white"
        fontFamily="body"
        placeholderTextColor="gray.300"
        {...rest}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'green.500',
        }}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}

import { IImageProps, Image } from 'native-base'

type USerPhotoProps = IImageProps & {
  size: number
}

export function UserPhoto({ size, ...rest }: USerPhotoProps) {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      {...rest}
      alt="Foto do usuário"
    />
  )
}

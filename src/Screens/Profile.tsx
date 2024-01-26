import { yupResolver } from '@hookform/resolvers/yup'
import * as FileSystem from 'expo-file-system'
import { FileInfo } from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { TouchableOpacity } from 'react-native'
import * as yup from 'yup'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ScreenHeader } from '@/components/ScreenHeader'
import { UserPhoto } from '@/components/UserPhoto'
import { useAuth } from '@/hooks/useAuth'

type ProfileFormData = {
  name: string
  email: string
  oldPassword: string
  password: string
  confirmedPassword: string
}

const ProfileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  oldPassword: yup
    .string()
    .required('Informe a senha antiga.')
    .min(6, 'A senha deve conter 6 caracteres.'),
  password: yup
    .string()
    .required('Informe a nova senha')
    .min(6, 'A senha deve conter 6 caracteres.'),
  confirmedPassword: yup
    .string()
    .required('Confirme a nova senha.')
    .oneOf([yup.ref('password'), null], 'As senhas não coincidem.'),
})

type FormData = yup.InferType<typeof ProfileSchema>

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userImage, setUserImage] = useState(
    'https://image-cdn.essentiallysports.com/wp-content/uploads/Chris-Bumstead-1-1-740x710.jpg',
  )

  const toast = useToast()
  const { user } = useAuth()

  console.log(user)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      oldPassword: '',
      password: '',
      confirmedPassword: '',
    },
  })

  async function handleUserImage() {
    setPhotoIsLoading(true)
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      })

      if (res.canceled) {
        return
      }

      if (res.assets[0].uri) {
        const photoUri = (await FileSystem.getInfoAsync(
          res.assets[0].uri,
        )) as FileInfo

        if (photoUri.size && photoUri.size / 1024 / 1024 > 5) {
          return toast.show({
            title:
              'Essa imagem é muito grande, Escolha uma imagem menor que 5MB',
            placement: 'top',
            bgColor: 'red.500',
          })
        }
        setUserImage(res.assets[0].uri)
      }
    } catch (error) {
      // do nothing
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleUpdateProfile(data: ProfileFormData) {
    await new Promise((resolve) => setTimeout(resolve, 3000))
    console.log(data)
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={33}
              h={33}
              rounded="full"
              startColor="gray.500"
              endColor="gray.400"
            />
          ) : (
            <UserPhoto
              size={33}
              source={{
                uri: userImage,
              }}
            />
          )}
          <TouchableOpacity onPress={handleUserImage}>
            <Text
              color="green.500"
              fontWeight="bold"
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                bg="gray.600"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                bg="gray.600"
                color="gray.300"
                placeholder="E-mail"
                isDisabled
                isReadOnly
                _disabled={{ bgColor: 'gray.600' }}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Heading
            color="gray.200"
            fontSize="md"
            mb={2}
            mt={12}
            mr="auto"
            fontFamily="heading"
          >
            Alterar senha
          </Heading>
          <Controller
            control={control}
            name="oldPassword"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha antiga"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.oldPassword?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova Senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmedPassword"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirme a nova senha"
                bg="gray.600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirmedPassword?.message}
              />
            )}
          />

          <Button
            title="Atualizar"
            mt={4}
            onPress={handleSubmit(handleUpdateProfile)}
            isLoading={isSubmitting}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}

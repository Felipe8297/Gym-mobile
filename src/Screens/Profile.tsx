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

import defaultUserPhoto from '@/assets/userPhotoDefault.png'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ScreenHeader } from '@/components/ScreenHeader'
import { UserPhoto } from '@/components/UserPhoto'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/services/api'
import { AppError } from '@/utils/AppError'

type ProfileFormData = {
  name: string
  email: string
  oldPassword: string
  password: string
  confirmedPassword: string
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido.'),
  oldPassword: yup.string(),
  password: yup
    .string()
    .required('Informe a nova senha.')
    .min(6, 'A senha deve conter 6 caracteres.')
    .nullable()
    .transform((value) => value || null),
  confirmedPassword: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .oneOf([yup.ref('password'), null], 'As senhas não coincidem.')
    .when('password', {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required('Informe a confirmação da senha')
          .transform((value) => value || null),
    }),
})

type FormData = yup.InferType<typeof profileSchema>

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const toast = useToast()
  const { user, updateUserProfile } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(profileSchema),
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
        const fileExtension = res.assets[0].uri.split('.').pop()
        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase(),
          uri: res.assets[0].uri,
          type: `${res.assets[0].type}/${fileExtension}`,
        } as any

        const userPhotoUpload = new FormData()

        userPhotoUpload.append('avatar', photoFile)

        const avatarResponse = await api.patch(
          '/users/avatar',
          userPhotoUpload,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )

        const userUpdated = user
        userUpdated.avatar = avatarResponse.data.avatar

        updateUserProfile(userUpdated)

        toast.show({
          title: 'Foto atualizada com sucesso.',
          placement: 'top',
          bgColor: 'green.500',
        })
      }
    } catch (error) {
      // do nothing
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleUpdateProfile({
    name,
    password,
    oldPassword,
  }: ProfileFormData) {
    try {
      const userUpdated = user
      userUpdated.name = name

      await new Promise((resolve) => setTimeout(resolve, 3000))

      await api.put('/users', {
        name,
        old_password: oldPassword,
        password,
      })
      await updateUserProfile(userUpdated)
      toast.show({
        title: 'Perfil atualizado com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível atualiza o perfil. Tente novamente mais tarde.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
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
              source={
                user.avatar
                  ? {
                      uri: `${api.defaults.baseURL}/avatar/${user.avatar}`,
                    }
                  : defaultUserPhoto
              }
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
            _loading={{ bg: 'green.500' }}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}

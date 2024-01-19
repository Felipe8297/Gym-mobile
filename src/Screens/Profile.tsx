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
import { Alert, TouchableOpacity } from 'react-native'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ScreenHeader } from '@/components/ScreenHeader'
import { UserPhoto } from '@/components/UserPhoto'

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userImage, setUserImage] = useState(
    'https://image-cdn.essentiallysports.com/wp-content/uploads/Chris-Bumstead-1-1-740x710.jpg',
  )

  const toast = useToast()

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
          <Input placeholder="Nome" bg="gray.600" />
          <Input
            bg="gray.600"
            placeholder="E-mail"
            isDisabled
            _disabled={{ bg: 'gray.600' }}
          />

          <Heading color="gray.200" fontSize="md" mb={2} mt={12} mr="auto">
            Alterar senha
          </Heading>
          <Input placeholder="Senha antiga" bg="gray.600" secureTextEntry />
          <Input placeholder="Nova Senha" bg="gray.600" secureTextEntry />
          <Input
            placeholder="Confirme a nova senha"
            bg="gray.600"
            secureTextEntry
          />
          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  )
}

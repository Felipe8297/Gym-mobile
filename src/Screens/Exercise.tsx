import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import BodySvg from '@/assets/body.svg'
import RepsSvg from '@/assets/repetitions.svg'
import SeriesSvg from '@/assets/series.svg'
import { Button } from '@/components/Button'
import { Loading } from '@/components/Loading'
import { ExerciseDTO } from '@/dtos/ExerciseDTO'
import { AppRoutesProps } from '@/routes/app.routes'
import { api } from '@/services/api'
import { AppError } from '@/utils/AppError'

type RouteParams = {
  exerciseId: string
}

export function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  const toast = useToast()
  const navigation = useNavigation<AppRoutesProps>()
  const route = useRoute()

  const { exerciseId } = route.params as RouteParams

  function handleGoBack() {
    navigation.goBack()
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const response = await api.get(`/exercises/${exerciseId}`)
      setExercise(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os detalhes do exercício. Tente novamente mais tarde'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>
        <HStack
          justifyContent="space-between"
          mt={4}
          mb={8}
          alignItems="center"
        >
          <Heading
            color="gray.100"
            fontSize="lg"
            flexShrink={1}
            fontFamily="heading"
          >
            {exercise.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <VStack p={8}>
          <Box rounded="lg" mb={3} overflow="hidden">
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt="Foto do exercício"
              resizeMode="cover"
              rounded="lg"
            />
          </Box>
          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <Center>
              <HStack mb={6} mt={5}>
                <SeriesSvg />
                <Text color="gray.200" ml={2} mr={10}>
                  {exercise.series} séries
                </Text>
                <RepsSvg />
                <Text color="gray.200" ml={2}>
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
              <Button title="Marcar como realizado" />
            </Center>
          </Box>
        </VStack>
      )}
    </VStack>
  )
}

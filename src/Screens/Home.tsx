import { useNavigation } from '@react-navigation/native'
import { FlatList, Heading, HStack, Text, useToast, VStack } from 'native-base'
import { useEffect, useState } from 'react'

import { ExerciseCard } from '@/components/ExerciseCard'
import { Group } from '@/components/Group'
import { HomeHeader } from '@/components/HomeHeader'
import { AppRoutesProps } from '@/routes/app.routes'
import { api } from '@/services/api'
import { AppError } from '@/utils/AppError'

export function Home() {
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState([
    'Rosca martelo',
    'Rosca direta',
    'Rosca alternada',
    'Rosca concentrada',
  ])
  const [groupSelected, setGroupSelected] = useState('Bíceps')

  const navigation = useNavigation<AppRoutesProps>()
  const toast = useToast()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  async function fetchGroups() {
    try {
      const response = await api.get('/groups')
      setGroups(response.data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError
        ? error.message
        : 'Não foi possível carregar os grupos musculares. Tente novamente mais tarde'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">
            Exercícios
          </Heading>
          <Text color="gray.200" fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard
              exerciseName={item}
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}

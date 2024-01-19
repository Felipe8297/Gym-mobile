import { useNavigation } from '@react-navigation/native'
import { FlatList, Heading, HStack, Text, VStack } from 'native-base'
import { useState } from 'react'

import { ExerciseCard } from '@/components/ExerciseCard'
import { Group } from '@/components/Group'
import { HomeHeader } from '@/components/HomeHeader'
import { AppRoutesProps } from '@/routes/app.routes'

export function Home() {
  const [groupSelected, setGroupSelected] = useState('Bíceps')
  const [groups, setGroups] = useState([
    'Costas',
    'Peito',
    'Ombro',
    'Tríceps',
    'Bíceps',
  ])
  const [exercises, setExercises] = useState([
    'Rosca martelo',
    'Rosca direta',
    'Rosca alternada',
    'Rosca concentrada',
  ])
  const navigation = useNavigation<AppRoutesProps>()

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

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

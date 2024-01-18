import { Heading, SectionList, Text, VStack } from 'native-base'
import { useState } from 'react'

import { HistoryCard } from '@/components/HistoryCard'
import { ScreenHeader } from '@/components/ScreenHeader'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '17.01.24',
      data: ['Rosca Martelo', 'Rosca Direta', 'Rosca Concentrada'],
    },
    {
      title: '18.01.24',
      data: ['Rosca Concentrada'],
    },
  ])
  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />
      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: 'center' }
        }
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            Nenhum exercício registrado ainda. {'\n'} Que tal se exercitar
            agora?
          </Text>
        )}
      />
    </VStack>
  )
}

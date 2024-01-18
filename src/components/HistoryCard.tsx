import { Heading, HStack, Text, VStack } from 'native-base'

export function HistoryCard() {
  return (
    <HStack
      w="full"
      px={5}
      py={4}
      mb={3}
      bg="gray.600"
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack>
        <Heading color="white" fontSize="md" textTransform="capitalize">
          Bíceps
        </Heading>
        <Text color="gray.100" fontSize="lg" numberOfLines={2}>
          Rosca Martelo
        </Text>
      </VStack>
      <Text color="gray.300" fontSize="lg">
        09:00
      </Text>
    </HStack>
  )
}

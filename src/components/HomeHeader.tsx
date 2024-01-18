import { MaterialIcons } from '@expo/vector-icons'
import { Heading, HStack, Icon, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'

import { UserPhoto } from './UserPhoto'

export function HomeHeader() {
  return (
    <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
      <UserPhoto
        source={{
          uri: 'https://image-cdn.essentiallysports.com/wp-content/uploads/Chris-Bumstead-1-1-740x710.jpg',
        }}
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color="gray.100" fontSize="md">
          Olá,
        </Text>

        <Heading color="gray.100" fontSize="md">
          Chris Bumstead
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />
      </TouchableOpacity>
    </HStack>
  )
}

import { Entypo } from '@expo/vector-icons'
import { Heading, HStack, Icon, Image, Text, VStack } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import { ExerciseDTO } from '@/dtos/ExerciseDTO'

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExerciseDTO
}
export function ExerciseCard({ data, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
        mb={3}
      >
        <Image
          source={{
            uri: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_639,h_827/https://strengthbible.com/wp-content/uploads/2023/12/cbum-instagram.png',
          }}
          alt="Rosca martelo com halteres"
          h={16}
          w={16}
          rounded="md"
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize="lg" color="white" fontFamily="heading">
            {data.name}
          </Heading>
          <Text
            fontSize="sm"
            color="gray.200"
            mt={1}
            numberOfLines={2}
          >{`${data.series} séries x ${data.repetitions} repetições`}</Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
      </HStack>
    </TouchableOpacity>
  )
}

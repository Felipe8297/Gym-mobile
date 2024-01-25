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
  VStack,
} from 'native-base'
import { TouchableOpacity } from 'react-native'

import BodySvg from '@/assets/body.svg'
import RepsSvg from '@/assets/repetitions.svg'
import SeriesSvg from '@/assets/series.svg'
import { Button } from '@/components/Button'
import { AppRoutesProps } from '@/routes/app.routes'

type RouteParams = {
  exerciseId: string
}

export function Exercise() {
  const navigation = useNavigation<AppRoutesProps>()
  const route = useRoute()

  const { exerciseId } = route.params as RouteParams

  function handleGoBack() {
    navigation.goBack()
  }

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
            Rosca martelo
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text color="gray.200" ml={1} textTransform="capitalize">
              Bíceps
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView>
        <VStack p={8}>
          <Image
            w="full"
            h={80}
            source={{
              uri: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_639,h_827/https://strengthbible.com/wp-content/uploads/2023/12/cbum-instagram.png',
            }}
            alt="Foto do exercício"
            mb={3}
            resizeMode="cover"
            rounded="lg"
          />
          <Box bg="gray.600" rounded="md" pb={4} px={4}>
            <Center>
              <HStack mb={6} mt={5}>
                <SeriesSvg />
                <Text color="gray.200" ml={2} mr={10}>
                  3 séries
                </Text>
                <RepsSvg />
                <Text color="gray.200" ml={2}>
                  10 repetições
                </Text>
              </HStack>
              <Button title="Marcar como realizado" />
            </Center>
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

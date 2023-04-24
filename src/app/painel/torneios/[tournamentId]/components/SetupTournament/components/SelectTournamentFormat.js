import { Heading, Text, Flex, Stack, Card, Radio } from '@chakra-ui/react'

import { TOURNAMENT_FORMAT } from '@/constants'

export const SelectTournamentFormat = ({ onSelect }) => {
  return (
    <>
      <Heading size="md" color="gray.600">
        Selecione o formato do seu torneio
      </Heading>
      <Text color="gray.500">
        <strong>Importante</strong>: Uma vez definido o formato do torneio, não
        será possível alterá-lo!
      </Text>
      <Stack spacing={4} mt={8}>
        <Card px={8} py={4} opacity={0.5} pointerEvents="none">
          <Flex alignItems="center">
            <Radio size="lg" colorScheme="orange" isChecked={false} mr={4} />
            <Heading size="sm" color="gray.600">
              Sem categorização
            </Heading>
          </Flex>
        </Card>
        <Card px={8} py={4} opacity={0.5} pointerEvents="none">
          <Flex alignItems="center">
            <Radio size="lg" colorScheme="orange" isChecked={false} mr={4} />
            <Heading size="sm" color="gray.600">
              Organizar por categoria
            </Heading>
          </Flex>
        </Card>
        <Card
          px={8}
          py={4}
          cursor="pointer"
          onClick={() => {
            onSelect(TOURNAMENT_FORMAT.CATEGORIES_AND_SUBCATEGORIES)
          }}
        >
          <Flex alignItems="center">
            <Radio size="lg" colorScheme="orange" isChecked={false} mr={4} />
            <Heading size="sm" color="gray.600">
              Organizar por categoria e sub-categoria
            </Heading>
          </Flex>
        </Card>
      </Stack>
    </>
  )
}

export default SelectTournamentFormat

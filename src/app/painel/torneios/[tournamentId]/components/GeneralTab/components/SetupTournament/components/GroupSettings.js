import {
  Button,
  Card,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  Stack,
  Text
} from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'

export const GroupSettings = ({ onSave }) => {
  const [groupSize, setGroupSize] = useState(4)

  const handleGroupSizeChange = (e) => {
    setGroupSize(e.target.value)
  }

  const handleIncreaseGroupSize = () => {
    setGroupSize(groupSize + 1)
  }

  const handleDecreaseGroupSize = () => {
    setGroupSize(groupSize - 1)
  }

  const handleSave = () => {
    onSave({
      size: groupSize
    })
  }

  return (
    <>
      <Heading size="md" color="gray.600">
        Configurações da fase de grupos
      </Heading>
      <Stack spacing={4} mt={8}>
        <Card>
          <Heading mb={4} size="sm">
            Jogadores por grupo
          </Heading>
          <InputGroup>
            <InputLeftElement>
              <Button onClick={handleDecreaseGroupSize}>-</Button>
            </InputLeftElement>
            <Input textAlign="center" type="number" value={groupSize} />
            <InputRightElement>
              <Button onClick={handleIncreaseGroupSize}>+</Button>
            </InputRightElement>
          </InputGroup>
        </Card>

        <Button onClick={handleSave}>Salvar configurações de grupo</Button>
      </Stack>
    </>
  )
}

export default GroupSettings

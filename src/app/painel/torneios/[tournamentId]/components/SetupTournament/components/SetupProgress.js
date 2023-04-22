import { Box, Heading, Text, Center, Flex, Icon } from '@chakra-ui/react'
import {
  BiBullseye,
  BiCheck,
  BiGroup,
  BiSitemap,
  BiTrophy
} from 'react-icons/bi'
import { MdOutlineTableRestaurant } from 'react-icons/md'

const ProgressItem = ({
  progressTitle,
  progressIcon,
  isActive,
  isCompleted
}) => {
  return (
    <Flex
      py={{ sm: 0, md: 2, xl: 3 }}
      borderRadius="lg"
      px={{ sm: 2, md: 3, xl: 4 }}
      bg={isActive && !isCompleted ? '#F2F5FF' : 'gray.100'}
      alignItems="center"
    >
      <Center
        bg={isCompleted ? '#E1F9F1' : isActive ? '#4412B0' : '#ECF0F3'}
        width={{ sm: '32px', xl: '36px' }}
        height={{ sm: '32px', xl: '36px' }}
        borderRadius="32px"
        mr={4}
      >
        <Icon
          boxSize={{ sm: 4, xl: 5, lg: 6 }}
          as={isCompleted ? BiCheck : progressIcon}
          color={isCompleted ? '#71CE99' : isActive ? '#FFFFFF' : '#8B96A9'}
        />
      </Center>
      <Text
        fontWeight={500}
        color={isActive && !isCompleted ? 'gray.700' : 'gray.500'}
      >
        {progressTitle}
      </Text>
    </Flex>
  )
}

export const SetupStatus = ({ completedSteps }) => {
  return (
    <Flex width="25vw" bg="gray.100" p={8} flexDirection="column">
      <Box>
        <Heading mb={4} size="md">
          Configurar torneio
        </Heading>
        <Text fontWeight={500} color="gray.500">
          Vamos configurar as principais características do seu torneio
        </Text>
      </Box>

      <Flex flex="1" py={{ sm: 4, md: 6, lg: 8 }}>
        <Box
          width="1px"
          borderLeft="3px dotted #DFE4EA"
          position="sticky"
          left={{
            md: '64px',
            xl: '68px'
          }}
        />
        <Flex
          flex="1"
          ml="-1px"
          zIndex={10}
          flexDirection="column"
          justifyContent="space-between"
        >
          <ProgressItem
            progressTitle="Torneio"
            progressIcon={BiTrophy}
            isActive={!completedSteps.tournamentFormat}
            isCompleted={!!completedSteps.tournamentFormat}
          />
          <ProgressItem
            progressTitle="Categorias"
            progressIcon={BiSitemap}
            isActive={!!completedSteps.tournamentFormat}
            isCompleted={!!completedSteps.tournamentCategories}
          />
          <ProgressItem
            progressTitle="Grupos"
            progressIcon={BiGroup}
            isActive={!!completedSteps.tournamentCategories}
            isCompleted={!!completedSteps.tournamentGroups}
          />
          <ProgressItem
            progressTitle="Jogos"
            progressIcon={BiBullseye}
            isActive={!!completedSteps.tournamentGroups}
            isCompleted={!!completedSteps.tournamentGames}
          />
          <ProgressItem
            progressTitle="Mesas"
            progressIcon={MdOutlineTableRestaurant}
            isActive={!!completedSteps.tournamentGames}
            isCompleted={!!completedSteps.tournamentTables}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default SetupStatus

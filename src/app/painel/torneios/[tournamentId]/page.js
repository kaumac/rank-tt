'use client'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Switch,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLabel,
  Text,
  Tooltip,
  useMultiStyleConfig,
  useTab
} from '@chakra-ui/react'
import React from 'react'
import { BiCog, BiExtension, BiGroup, BiSitemap, BiTrophy, BiUser } from 'react-icons/bi'
import { MdOutlineTableRestaurant } from 'react-icons/md'

import useTournament from '@/hooks/useTournament'

import GamesTab from './components/GamesTab'
import GeneralTab from './components/GeneralTab'
import PlayersTab from './components/PlayersTab'

const CustomTab = React.forwardRef((props, ref) => {
  const tabProps = useTab({ ...props, ref })
  const styles = useMultiStyleConfig('Tabs', tabProps)

  return (
    <Button __css={styles.tab} {...tabProps} py={4} px={{ lg: 5, xl: 6, xxl: 8 }}>
      <Flex alignItems="center" justifyContent="center">
        <Box as="span" mr="2" transform="translateY(2px)">
          {props.icon}
        </Box>
        {tabProps.children}
      </Flex>
    </Button>
  )
})

CustomTab.displayName = 'CustomTab'

function Page({ params }) {
  const tournament = useTournament(params?.tournamentId)

  return (
    <>
      <Flex
        width="100%"
        alignItems="center"
        px={{ lg: 5, xl: 6, xxl: 8 }}
        pt={{ lg: 4, xl: 5, xxl: 6 }}
        pb={{ lg: 1, xl: 1, xxl: 2 }}
        bg="#FFF"
      >
        <Box flex="none" maxWidth="75%">
          <Heading noOfLines={1} size={{ lg: 'md', xl: 'lg' }} as={Text}>
            {tournament?.data?.name}
          </Heading>
        </Box>
        <Tooltip hasArrow label="Clique para iniciar o torneio" placement="auto">
          <Box>
            <FormControl display="flex" alignItems="center" ml={4}>
              <Tag size="lg" colorScheme="orange" borderRadius="full">
                <Icon boxSize={4} as={BiTrophy} size="50px" mr={1} />

                <FormLabel htmlFor="email-alerts" mb="0">
                  <TagLabel>Não iniciado</TagLabel>
                </FormLabel>
                <Switch id="email-alerts" />
              </Tag>
            </FormControl>
          </Box>
        </Tooltip>
      </Flex>
      <Tabs>
        <TabList
          position="sticky"
          top="0"
          boxShadow="0 8px 8px 0 rgba(127,85,218,0.04), 0 2px 1px 0 rgba(127,85,218,0.02)"
          borderColor="#EAEAEA"
          bg="white"
          zIndex={10}
        >
          <CustomTab icon={<Icon boxSize={{ sm: 4, xl: 5 }} as={BiTrophy} />}>Geral</CustomTab>
          <CustomTab icon={<Icon boxSize={{ sm: 4, xl: 5 }} as={BiGroup} />}>
            Grupos e atletas
          </CustomTab>
          <CustomTab icon={<Icon boxSize={{ sm: 4, xl: 5 }} as={BiSitemap} />}>Jogos</CustomTab>
          <CustomTab icon={<Icon boxSize={{ sm: 4, xl: 5 }} as={MdOutlineTableRestaurant} />}>
            Mesas
          </CustomTab>
          <CustomTab icon={<Icon boxSize={{ sm: 4, xl: 5 }} as={BiExtension} />}>
            Utilidades
          </CustomTab>
          <CustomTab icon={<Icon boxSize={{ sm: 4, xl: 5 }} as={BiCog} />}>Configurações</CustomTab>
        </TabList>
        <TabIndicator height="3px" />
        <TabPanels display="flex" flex="1">
          <TabPanel display="flex" flex="1" padding="0">
            <GeneralTab tournamentId={params?.tournamentId} />
          </TabPanel>
          <TabPanel display="flex" flex="1" p={0}>
            <PlayersTab tournament={tournament} />
          </TabPanel>
          <TabPanel display="flex" flex="1" p={0}>
            <GamesTab tournament={tournament} />
          </TabPanel>
          <TabPanel p={8}>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default Page

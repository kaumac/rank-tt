'use client'

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabIndicator,
  FormControl,
  FormLabel,
  Switch
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

import DashboardHeader from '@/components/DashboardHeader'
import useTournament from '@/hooks/useTournament'

function Page({ params }) {
  const [tournamentData, loading, error] = useTournament(params?.tournamentId)
  const router = useRouter()

  return (
    <>
      <Flex width="100%">
        <Box flex="1">
          <Heading size="lg">{tournamentData?.name}</Heading>
        </Box>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Enable email alerts?
          </FormLabel>
          <Switch id="email-alerts" />
        </FormControl>
      </Flex>
      <Tabs position="relative">
        <TabList>
          <Tab>Geral</Tab>
          <Tab>Atletas</Tab>
          <Tab>Mesas</Tab>
          <Tab>Utilidades</Tab>
          <Tab>Configurações</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" borderRadius="1px" />
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {params?.tournamentId}
      {tournamentData?.name}
    </>
  )
}

export default Page

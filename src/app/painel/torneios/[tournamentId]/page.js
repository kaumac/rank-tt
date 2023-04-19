'use client'

import {
  Box,
  Tooltip,
  Button,
  Icon,
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
  Switch,
  Tag,
  TagLabel,
  useMultiStyleConfig,
  useTab,
  Center
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
  BiBullseye,
  BiCheck,
  BiCog,
  BiExtension,
  BiSitemap,
  BiTrophy,
  BiUser
} from 'react-icons/bi'
import { MdOutlineTableRestaurant } from 'react-icons/md'

import useTournament from '@/hooks/useTournament'

const CustomTab = React.forwardRef((props, ref) => {
  const tabProps = useTab({ ...props, ref })
  const styles = useMultiStyleConfig('Tabs', tabProps)

  return (
    <Button __css={styles.tab} {...tabProps} py={4} px={8}>
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
  const [tournamentData, loading, error] = useTournament(params?.tournamentId)
  const router = useRouter()

  return (
    <>
      <Flex width="100%" alignItems="center" px={8} pt={8}>
        <Box flex="none" maxWidth="75%">
          <Heading noOfLines={1} size="lg" as={Text}>
            {tournamentData?.name}
          </Heading>
        </Box>
        <Tooltip
          hasArrow
          label="Clique para iniciar o torneio"
          placement="auto"
        >
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
      <Tabs isFitted mt={2} display="flex" flexDirection="column" flex="1">
        <TabList
          position="sticky"
          top="0"
          boxShadow="0 8px 8px 0 rgba(127,85,218,0.04), 0 2px 1px 0 rgba(127,85,218,0.02)"
          borderColor="#EAEAEA"
          bg="white"
        >
          <CustomTab icon={<Icon as={BiTrophy} />}>Geral</CustomTab>
          <CustomTab icon={<Icon as={BiUser} />}>Atletas</CustomTab>
          <CustomTab icon={<Icon as={MdOutlineTableRestaurant} />}>
            Mesas
          </CustomTab>
          <CustomTab icon={<Icon as={BiExtension} />}>Utilidades</CustomTab>
          <CustomTab icon={<Icon as={BiCog} />}>Configurações</CustomTab>
        </TabList>
        <TabIndicator height="3px" />
        <TabPanels display="flex" flex="1">
          <TabPanel display="flex" flex="1" padding="0">
            <Flex width="25vw" bg="gray.100" p={8} flexDirection="column">
              <Box>
                <Heading mb={4} size="md">
                  Configurar torneio
                </Heading>
                <Text fontWeight={500} color="gray.500">
                  Vamos configurar as principais características do seu torneio
                </Text>
              </Box>

              <Flex flex="1" py={8}>
                <Box
                  width="1px"
                  borderLeft="3px dotted #DFE4EA"
                  position="sticky"
                  left="78px"
                />
                <Flex
                  flex="1"
                  ml="-1px"
                  zIndex={10}
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Flex
                    py={3}
                    borderRadius="lg"
                    px={6}
                    bg="gray.100"
                    alignItems="center"
                  >
                    <Center
                      bg="#E1F9F1"
                      width="42px"
                      height="42px"
                      borderRadius="32px"
                      mr={4}
                    >
                      <Icon boxSize={8} as={BiCheck} color="#71CE99" />
                    </Center>
                    <Text fontWeight={500} color="gray.500">
                      Torneio
                    </Text>
                  </Flex>
                  <Flex
                    py={3}
                    borderRadius="lg"
                    px={6}
                    bg="#F2F5FF"
                    boxShadow="sm"
                    alignItems="center"
                  >
                    <Center
                      bg="#4412B0"
                      width="42px"
                      height="42px"
                      borderRadius="32px"
                      mr={4}
                    >
                      <Icon boxSize={5} as={BiSitemap} color="#FFF" />
                    </Center>
                    <Text fontWeight={500} color="gray.700">
                      Categorias
                    </Text>
                  </Flex>
                  <Flex
                    py={3}
                    borderRadius="lg"
                    px={6}
                    bg="gray.100"
                    alignItems="center"
                  >
                    <Center
                      bg="#ECF0F3"
                      width="42px"
                      height="42px"
                      borderRadius="32px"
                      mr={4}
                    >
                      <Icon boxSize={6} as={BiBullseye} color="#8B96A9" />
                    </Center>
                    <Text fontWeight={500} color="gray.500">
                      Jogos
                    </Text>
                  </Flex>
                  <Flex
                    py={3}
                    borderRadius="lg"
                    px={6}
                    bg="gray.100"
                    alignItems="center"
                  >
                    <Center
                      bg="#ECF0F3"
                      width="42px"
                      height="42px"
                      borderRadius="32px"
                      mr={4}
                    >
                      <Icon
                        boxSize={6}
                        as={MdOutlineTableRestaurant}
                        color="#8B96A9"
                      />
                    </Center>
                    <Text fontWeight={500} color="gray.500">
                      Mesas
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Box flex="1">kodfskofoks</Box>
          </TabPanel>
          <TabPanel display="flex" flex="1" p={8}>
            {tournamentData?.players.length > 0 ? (
              <p>Atletas!</p>
            ) : (
              <Flex
                flex="1"
                alignItems="center"
                justifyContent="center"
                flexDirection="column
                "
              >
                <img src="/gifs/engagement.gif" width="120px" />
                <Heading size="md" color="gray.600" mt={4}>
                  Nenhum atleta cadastrado ainda
                </Heading>
                <Text textAlign="center" mb={8} mt={2} color="gray.600">
                  Você pode cadastrar atletas manualmente ou compartilhar o link{' '}
                  <br /> da página de inscrição do torneio para que os atletas
                  se inscrevam.
                </Text>
                <Flex>
                  <Button borderRadius="100px" colorScheme="gray" mr={6}>
                    Cadastrar atletas
                  </Button>
                  <Button borderRadius="100px" colorScheme="brand">
                    Compartilhar link
                  </Button>
                </Flex>
              </Flex>
            )}
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

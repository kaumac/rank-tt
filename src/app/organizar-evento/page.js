'use client'

import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Icon,
  Select,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Layout } from '@/components/LandingLayout'
// import Dropzone from '@/theme/components/admin/main/ecommerce/new-product/Dropzone'
import Card from '@/components/card/Card'
import InputField from '@/components/fields/InputField'
import TagsField from '@/components/fields/TagsField'
import TextField from '@/components/fields/TextField'
import { useAuthContext } from '@/providers/AuthContextProvider'

function Page() {
  const { user } = useAuthContext()
  const router = useRouter()

  const textColor = useColorModeValue('secondaryGray.900', 'white')
  const [activeBullets, setActiveBullets] = useState({
    account: true,
    media: !!user,
    pricing: false
  })

  const accountTab = React.useRef()
  const mediaTab = React.useRef()
  const pricingTab = React.useRef()
  const brand = useColorModeValue('brand.500', 'brand.400')

  React.useEffect(() => {
    if (!!user) {
      window.setTimeout(() => {
        mediaTab.current.click()
      }, 300)
    }
  }, [user, router])

  return (
    <Layout>
      <Box maxWidth={600} py={10} zIndex={1}>
        <Heading as="h2" size="xl" zIndex={1} textAlign="center">
          Organize suas competições de forma 100% automática!
        </Heading>
      </Box>

      <Flex direction="column" minH="100vh" align="center" position="relative">
        <Box
          h="360px"
          bg="linear-gradient(135deg, #FFCD50 0%, #FFB700 100%)"
          position="absolute"
          w="100%"
          borderRadius="30px"
        />

        <Tabs
          variant="unstyled"
          zIndex="0"
          display="flex"
          flexDirection="column"
          pt={50}
        >
          <TabList
            display="flex"
            alignItems="center"
            alignSelf="center"
            justifySelf="center"
          >
            <Tab
              ref={accountTab}
              w={{ sm: '120px', md: '250px', lg: '300px' }}
              sx={{ pointerEvents: 'none' }}
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                position="relative"
                _before={{
                  content: "''",
                  width: { sm: '120px', md: '250px', lg: '300px' },
                  height: '3px',
                  bg: activeBullets.media ? 'white' : '#8476FF',
                  left: { sm: '12px', md: '40px' },
                  top: {
                    sm: activeBullets.account ? '6px' : '4px',
                    md: null
                  },
                  position: 'absolute',
                  bottom: activeBullets.account ? '40px' : '38px',

                  transition: 'all .3s ease'
                }}
              >
                <Box
                  zIndex="1"
                  border="2px solid"
                  borderColor={activeBullets.account ? 'white' : '#8476FF'}
                  bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                  w="16px"
                  h="16px"
                  mb="8px"
                  borderRadius="50%"
                />
                <Text
                  color="white"
                  opacity={activeBullets.account ? 1 : 0.8}
                  fontWeight={activeBullets.account ? 'bold' : 'normal'}
                  display={{ sm: 'none', md: 'block' }}
                >
                  Sua conta
                </Text>
              </Flex>
            </Tab>
            <Tab
              ref={mediaTab}
              w={{ sm: '120px', md: '250px', lg: '300px' }}
              sx={{ pointerEvents: 'none' }}
              onClick={() =>
                setActiveBullets({
                  account: true,
                  media: true,
                  pricing: false
                })
              }
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                position="relative"
                _before={{
                  content: "''",
                  width: { sm: '120px', md: '250px', lg: '300px' },
                  height: '3px',
                  bg: activeBullets.pricing ? 'white' : '#8476FF',
                  left: { sm: '12px', md: '28px' },
                  top: '6px',
                  position: 'absolute',
                  bottom: activeBullets.media ? '40px' : '38px',

                  transition: 'all .3s ease'
                }}
              >
                <Box
                  zIndex="1"
                  border="2px solid"
                  borderColor={activeBullets.media ? 'white' : '#8476FF'}
                  bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                  w="16px"
                  h="16px"
                  mb="8px"
                  borderRadius="50%"
                />
                <Box
                  w={{ base: 0, md: '60px' }}
                  h={{ base: 0, md: '24px' }}
                  display="flex"
                  justifyContent="center"
                >
                  <Box position="absolute">
                    <Text
                      color="white"
                      opacity={activeBullets.media ? 1 : 0.8}
                      fontWeight={activeBullets.media ? 'bold' : 'normal'}
                      display={{ sm: 'none', md: 'block' }}
                    >
                      Organização
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Tab>
            <Tab
              ref={pricingTab}
              sx={{ pointerEvents: 'none' }}
              w={{ sm: '120px', md: '250px', lg: '300px' }}
              onClick={() =>
                setActiveBullets({
                  account: true,
                  media: true,
                  pricing: true
                })
              }
            >
              <Flex
                direction="column"
                justify="center"
                align="center"
                position="relative"
              >
                <Box
                  zIndex="1"
                  border="2px solid"
                  borderColor={activeBullets.pricing ? 'white' : '#8476FF'}
                  bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                  w="16px"
                  h="16px"
                  mb="8px"
                  borderRadius="50%"
                />
                <Text
                  color="white"
                  opacity={activeBullets.pricing ? 1 : 0.8}
                  fontWeight={activeBullets.pricing ? 'bold' : 'normal'}
                  display={{ sm: 'none', md: 'block' }}
                >
                  Competição
                </Text>
              </Flex>
            </Tab>
          </TabList>
          <TabPanels mt="24px" maxW={{ md: '90%', lg: '100%' }} mx="auto">
            <TabPanel
              w={{ sm: '330px', md: '700px', lg: '850px' }}
              p="0px"
              mx="auto"
            >
              <Card p="30px">
                <Heading
                  as="h3"
                  color={textColor}
                  fontSize="2xl"
                  fontWeight="700"
                >
                  Cadastre ou entre com a sua conta
                </Heading>
                <Text
                  color="GrayText"
                  fontSize="lg"
                  fontWeight="500"
                  mt={1}
                  pr={{ sm: 0, md: '100px', lg: '300px' }}
                >
                  Selecione como deseja acessar a plataforma. Caso ainda não
                  tenha uma conta, criaremos uma pra você.
                </Text>

                <Flex direction="column" w="100%" mt={10}>
                  <Flex
                    width="100%"
                    direction={{
                      base: 'column',
                      md: 'row'
                    }}
                  >
                    <Stack
                      flex="1"
                      gap="20px"
                      borderRight={{
                        md: '1px solid #EEE'
                      }}
                      pr={{
                        md: 10
                      }}
                    >
                      <Box>
                        <InputField
                          mb="0px"
                          id="name"
                          placeholder="Exemplo: voce@gmail.com"
                          label="Email"
                          type="email"
                        />
                        <Button
                          variant="darkBrand"
                          fontSize="sm"
                          borderRadius="16px"
                          w="100%"
                          h="46px"
                          mt={2}
                        >
                          Entrar com email
                        </Button>
                      </Box>
                    </Stack>
                    <Divider orientation="vertical" height="100%" />
                    <Stack
                      flex="1"
                      direction="column"
                      gap="20px"
                      ml={{
                        md: 10
                      }}
                    >
                      <Button
                        variant="light"
                        fontSize="sm"
                        py="15px"
                        h="50px"
                        borderRadius="16px"
                        fontWeight="500"
                      >
                        <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
                        Usar minha conta Google
                      </Button>
                      <Button
                        variant="light"
                        fontSize="sm"
                        py="15px"
                        h="50px"
                        borderRadius="16px"
                        fontWeight="500"
                      >
                        <Icon
                          as={FaFacebook}
                          w="20px"
                          h="20px"
                          me="10px"
                          color="#1877F2"
                        />
                        Usar minha conta Facebook
                      </Button>
                    </Stack>
                  </Flex>
                </Flex>
              </Card>
            </TabPanel>
            <TabPanel
              w={{ sm: '330px', md: '700px', lg: '850px' }}
              p="0px"
              mx="auto"
            >
              <Card p="30px">
                <Text
                  color={textColor}
                  fontSize="2xl"
                  fontWeight="700"
                  mb="20px"
                >
                  Organização
                </Text>
                {/* <Dropzone
                  content={
                    <Box>
                      <Icon
                        as={MdOutlineCloudUpload}
                        w="80px"
                        h="80px"
                        color={textColor}
                      />
                      <Text
                        mx="auto"
                        mb="12px"
                        fontSize="lg"
                        fontWeight="700"
                        whiteSpace="pre-wrap"
                        color={textColor}
                      >
                        Drop your files here, or{' '}
                        <Text
                          as="span"
                          fontSize="lg"
                          fontWeight="700"
                          color={brand}
                        >
                          browse
                        </Text>
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="500"
                        color="secondaryGray.500"
                      >
                        PNG, JPG and GIF files are allowed
                      </Text>
                    </Box>
                  }
                /> */}
                <Flex justify="space-between" mt="24px">
                  <Button
                    variant="light"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: '128px', md: '148px' }}
                    h="46px"
                    onClick={() => accountTab.current.click()}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="darkBrand"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: '128px', md: '148px' }}
                    h="46px"
                    onClick={() => pricingTab.current.click()}
                  >
                    Next
                  </Button>
                </Flex>
              </Card>
            </TabPanel>
            <TabPanel
              w={{ sm: '330px', md: '700px', lg: '850px' }}
              p="0px"
              mx="auto"
            >
              <Card p="30px">
                <Text
                  color={textColor}
                  fontSize="2xl"
                  fontWeight="700"
                  mb="20px"
                >
                  Pricing
                </Text>
                <Flex direction="column" w="100%">
                  <Stack direction="column" spacing="20px">
                    <SimpleGrid
                      columns={{ base: 1, md: 3 }}
                      gap={{ base: '0px', md: '20px' }}
                    >
                      <InputField
                        id="price"
                        placeholder="eg. $99"
                        label="Price"
                      />
                      <InputField
                        id="code"
                        placeholder="eg. 4030120241"
                        label="Unique Code"
                      />
                      <Flex direction="column" mb="34px">
                        <FormLabel
                          ms="10px"
                          htmlFor="currency"
                          fontSize="sm"
                          color={textColor}
                          fontWeight="bold"
                          _hover={{ cursor: 'pointer' }}
                        >
                          Currency
                        </FormLabel>
                        <Select
                          fontSize="sm"
                          id="currency"
                          variant="main"
                          h="44px"
                          maxH="44px"
                          defaultValue="usd"
                        >
                          <option value="usd">USD</option>
                          <option value="eur">EUR</option>
                          <option value="gbp">GBP</option>
                        </Select>
                      </Flex>
                    </SimpleGrid>
                    <TagsField />
                  </Stack>
                  <Flex justify="space-between" mt="24px">
                    <Button
                      variant="light"
                      fontSize="sm"
                      borderRadius="16px"
                      w={{ base: '128px', md: '148px' }}
                      h="46px"
                      onClick={() => mediaTab.current.click()}
                    >
                      Prev
                    </Button>
                    <Button
                      variant="darkBrand"
                      fontSize="sm"
                      borderRadius="16px"
                      w={{ base: '128px', md: '148px' }}
                      h="46px"
                    >
                      Submit
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Layout>
  )
}

export default Page

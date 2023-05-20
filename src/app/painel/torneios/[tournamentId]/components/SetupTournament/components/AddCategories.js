import {
  Heading,
  Text,
  Flex,
  Stack,
  Card,
  Radio,
  Input,
  Button,
  IconButton,
  Box
} from '@chakra-ui/react'
import { collection } from 'firebase/firestore'
import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'

import { pushDoc, updateDoc } from '@/firebase'

export const SelectTournamentFormat = ({ tournamentRef }) => {
  const [categories, setCategories] = useState([
    {
      name: 'A / B',
      subcategories: [{ name: 'A' }, { name: 'B' }]
    }
  ])

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        name: 'C / D',
        subcategories: [{ name: 'C' }, { name: 'D' }]
      }
    ])
  }

  const handleCategoryChange = (categoryIndex, event) => {
    const newCategories = [...categories]

    newCategories[categoryIndex].name = event.target.value
    setCategories(newCategories)
  }

  const handleSubcategoryChange = (categoryIndex, subcategoryIndex, event) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].subcategories[subcategoryIndex].name = event.target.value
    setCategories(newCategories)
  }

  const deleteCategory = (categoryIndex) => {
    const newCategories = [...categories]
    newCategories.splice(categoryIndex, 1)
    setCategories(newCategories)
  }

  const saveCategories = async () => {
    const categoriesRef = collection(tournamentRef, 'categories')
    categories.forEach(async (category) => {
      const savedCategory = await pushDoc(categoriesRef, category).then((savedCategoryDocRef) => {
        updateDoc(savedCategoryDocRef, { id: savedCategoryDocRef.id })
      })

      return savedCategory
    })
  }

  return (
    <>
      <Heading size="md" color="gray.600">
        Configure as categorias
      </Heading>
      <Text color="gray.500">
        Adicione as categorias e sub-categorias que serão utilizadas no seu torneio.
      </Text>
      <Stack spacing={4} mt={8}>
        {categories.map((category, categoryIndex) => (
          <Card px={8} py={4} key={`category-field-${categoryIndex}`} position="relative">
            <IconButton
              icon={<BiTrash />}
              colorScheme="red"
              width="42px"
              position="absolute"
              top="-16px"
              right="-16px"
              onClick={() => {
                deleteCategory(categoryIndex)
              }}
            />
            <Flex flexDirection="column" alignItems="center" px={8}>
              <Text fontWeight="bold" mb={2}>
                Categoria
              </Text>
              <Input
                textAlign="center"
                value={category.name}
                onChange={(event) => {
                  handleCategoryChange(categoryIndex, event)
                }}
                mb={2}
              />

              <Box width="1px" height="18px" bg="gray.400" />
            </Flex>
            <Flex>
              {category.subcategories.map((subcategory, subcategoryIndex) => (
                <Flex
                  key={`subcategory-field-${subcategoryIndex}`}
                  position="relative"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                >
                  <Box
                    width="50%"
                    height="1px"
                    bg="gray.400"
                    left={subcategoryIndex === 1 ? '0' : null}
                    right={subcategoryIndex === 0 ? '0' : null}
                    top="0"
                    position="absolute"
                  />
                  <Box width="1px" height="18px" bg="gray.400" />
                  <Text fontWeight="bold" mt={2}>
                    Sub-categoria
                  </Text>
                  <Input
                    textAlign="center"
                    mt={2}
                    ml={subcategoryIndex === 1 ? 2 : null}
                    mr={subcategoryIndex === 0 ? 2 : null}
                    value={subcategory.name}
                    key={`subcategory-field-${subcategoryIndex}`}
                    onChange={(event) => {
                      handleSubcategoryChange(categoryIndex, subcategoryIndex, event)
                    }}
                  />
                </Flex>
              ))}
            </Flex>
          </Card>
        ))}
        <Flex>
          <Button variant="brand" onClick={addCategory}>
            Adicionar categoria
          </Button>
          <Button variant="brand" onClick={saveCategories} ml={2}>
            Salvar
          </Button>
        </Flex>
      </Stack>
    </>
  )
}

export default SelectTournamentFormat

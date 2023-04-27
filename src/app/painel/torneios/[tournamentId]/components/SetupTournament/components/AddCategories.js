import {
  Heading,
  Text,
  Flex,
  Stack,
  Card,
  Radio,
  Input,
  Button,
  IconButton
} from '@chakra-ui/react'
import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'

import { updateDoc } from '@/firebase'

export const SelectTournamentFormat = ({ tournamentRef }) => {
  const [categories, setCategories] = useState([
    {
      name: 'Categoria A/B',
      subcategories: [{ name: 'Sub-categoria A' }, { name: 'Sub-categoria B' }]
    }
  ])

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        name: 'Categoria A/B',
        subcategories: [
          { name: 'Sub-categoria A' },
          { name: 'Sub-categoria B' }
        ]
      }
    ])
  }

  const handleCategoryChange = (categoryIndex, event) => {
    const newCategories = [...categories]

    console.log(newCategories, categoryIndex, event, event.target.value)

    newCategories[categoryIndex].name = event.target.value
    setCategories(newCategories)
  }

  const handleSubcategoryChange = (categoryIndex, subcategoryIndex, event) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].subcategories[subcategoryIndex].name =
      event.target.value
    setCategories(newCategories)
  }

  const deleteCategory = (categoryIndex) => {
    const newCategories = [...categories]
    newCategories.splice(categoryIndex, 1)
    setCategories(newCategories)
  }

  const saveCategories = async () => {
    const savedCategories = await updateDoc(tournamentRef, {
      categories: categories
    })

    return savedCategories
  }

  return (
    <>
      <Heading size="md" color="gray.600">
        Configure as categorias
      </Heading>
      <Text color="gray.500">
        Adicione as categorias e sub-categorias que serão utilizadas no seu
        torneio.
      </Text>
      <Stack spacing={4} mt={8}>
        {categories.map((category, categoryIndex) => (
          <Card
            px={8}
            py={4}
            key={`category-field-${categoryIndex}`}
            position="relative"
          >
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
            <Input
              value={category.name}
              onChange={(event) => {
                handleCategoryChange(categoryIndex, event)
              }}
            />
            {category.subcategories.map((subcategory, subcategoryIndex) => (
              <Input
                value={subcategory.name}
                key={`subcategory-field-${subcategoryIndex}`}
                onChange={(event) => {
                  handleSubcategoryChange(
                    categoryIndex,
                    subcategoryIndex,
                    event
                  )
                }}
              />
            ))}
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

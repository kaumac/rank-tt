import { collection, doc, updateDoc } from 'firebase/firestore'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

import { useQueueTournamentStart } from '@/hooks/useTournament'

export const StartTournamentWrapper = ({
  children,
  tournamentId,
  category,
  categoryPlayers,
  categoryGroups
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const {
    mutate: mutateTournamentStart,
    isLoading: isTournamentStarting,
    error: startTournamentError,
    isDone: isTournamentStarted
  } = useQueueTournamentStart(tournamentId)

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onClick: onOpen
      })
    })
  }

  const handleTournamentStart = async () => {
    await mutateTournamentStart()
  }

  useEffect(() => {
    if (isTournamentStarted) {
      onClose()
    }
  }, [isTournamentStarted])

  return (
    <>
      {renderChildren()}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Iniciar o torneio agora?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Após iniciar o torneio você não poderá mais editar as configurações, adicionar novos
            jogadores ou fazer alterações nos grupos.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="ghost" colorScheme="gray">
              Agora não
            </Button>
            <Button
              ml={3}
              onClick={handleTournamentStart}
              isLoading={isTournamentStarting}
              loadingText="Iniciando torneio..."
            >
              Sim, iniciar torneio
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default StartTournamentWrapper

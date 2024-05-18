import { VIDEO_URL } from '@/api/movie';
import { COLORS } from '@/assets/colors';
import { ModalProps } from '@/types/utilsType';
import { ChakraProvider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
import YouTube from 'react-youtube';
export default function TrailerModal({ isOpen, onClose, id }: ModalProps & { id: string }) {
    return (
        <ChakraProvider>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={'full'}>
                <ModalOverlay />
                <ModalContent p={0}>
                    <ModalCloseButton
                        backgroundColor={COLORS.white}
                        width={50}
                        height={50}
                    />
                    <ModalBody width={'full'} h={'full'} backgroundColor={COLORS.black} p={0}>
                        <YouTube
                            id={id}
                            opts={{
                                width: '100%',
                                height: '100%'
                            }}
                            key={id}
                            style={{ width: '100dvw', height: '100dvh' }}
                            videoId={id}
                            onPlay={() => console.log('onPlay')}
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider >
    )
}

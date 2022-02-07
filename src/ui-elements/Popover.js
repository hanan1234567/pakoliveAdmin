import React from 'react'
import {
    Popover as ChakraPopover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
  } from '@chakra-ui/react'

  const Popover=React.forwardRef(({title, actions, placement, children,...props}, ref) => {
      return(
            <ChakraPopover innerRef={ref} placement={placement || 'right'}>
                <PopoverTrigger>
                    {children}
                </PopoverTrigger>
                <PopoverContent _focus={{ outline: 'none'}} rounded="0">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    {
                        title && <PopoverHeader fontSize="sm" fontWeight="bold">{title}</PopoverHeader>
                    }            
                    <PopoverBody>
                        {actions}
                    </PopoverBody>
                </PopoverContent>
            </ChakraPopover>
    )
})

export { Popover}
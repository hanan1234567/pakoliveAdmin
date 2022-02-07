export const input = {    
        baseStyle:{
            backgroundColor: 'white',
        },
        variants: {
            outline: {
                field:{
                    bg: 'white',
                    _focus: {
                        // bg: 'gray.50',
                        boxShadow:'none',
                        borderColor: 'brand.500',
                    },
                    _hover:{
                        borderColor: 'gray.500',
                    }
                }
            },
        },
        defaultProps: {
            focusBorderColor: 'brand.600',
        }
    }


import { extendTheme } from "@chakra-ui/react"
import { colors, button, input, textarea, select } from "./styles"

export const theme = extendTheme({
    colors: colors,
    components:{
        Button: button,
        Input: input,
        Textarea: textarea,
        Select: select,
        Switch: {
            baseStyle: {
                backgroundColor: 'brand',
                rounded: 'md',
                _focus: { 
                    boxShadow: 'none' 
                }
            },
        }
    }
})
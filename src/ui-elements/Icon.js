import React from 'react'
import { chakra, shouldForwardProp } from "@chakra-ui/react"

const BaseIcon = React.forwardRef((props, ref) => {

    var iconProps = {        
        ...({className: `${'icon ion-'+props.name +' '+props.className}`}),
        ...(props.onClick && {onClick: props.onClick})
      };
      
    return(
        <i {...iconProps} ref={ref}  />
    )

})

const Icon = chakra(BaseIcon, {
        shouldForwardProp: (prop) => {
                const isChakraProp = !shouldForwardProp(prop)
                if (isChakraProp) return false
                return ["name", "onClick"].includes(prop)
            },
            baseStyle: (props) => {
                return({
                    color: props.color || 'gray.400',
                    fontSize: props.fontSize || "md",
                    cursor:'pointer'                    
                })
            }
        })
    
export {Icon}
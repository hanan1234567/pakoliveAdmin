import { useRadio,useRadioGroup,Box, HStack } from '@chakra-ui/react'
function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
  
    return (
      <Box as='label'>
        <input {...input} />
        <Box
          {...checkbox}
          cursor='pointer'
          borderWidth='thin'
          borderRadius='sm'
          boxShadow='sm'
          _checked={{
            bg: 'brand.500',
            color: 'white',
            borderColor: 'brand.500',
          }}
          py={1}
          px={3}
        >
          {props.children}
        </Box>
      </Box>
    )
  }
  function Level(props) {
    const options = ['EASY', 'MEDIUM', 'HARD']
  
    const { getRootProps, getRadioProps } = useRadioGroup({
      name:'level',
      defaultValue: 'EASY',
      onChange:props.onChange,
    })
  
    const group = getRootProps()
  
    return (
      <HStack {...group}>
        {options.map((value) => {
          const radio = getRadioProps({ value })
          return (
            <RadioCard key={value} {...radio}>
              {value}
            </RadioCard>
          )
        })}
      </HStack>
    )
  }
  
export {Level}
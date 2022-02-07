import { useContext } from 'react';
import { createContextualCan } from '@casl/react'
import {AuthContext, AlertContext, AbilityContext} from '../services'

const useAuth = () => useContext(AuthContext);
const useAlert =() => useContext(AlertContext)
const useAbility = () => useContext(AbilityContext)

const Can = createContextualCan(AbilityContext.Consumer)

export {useAuth, useAlert, useAbility, Can}

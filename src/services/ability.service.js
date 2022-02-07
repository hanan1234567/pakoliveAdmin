import React, { createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Ability as CaslAbility, AbilityBuilder } from '@casl/ability';

const  Ability = new CaslAbility([]);

const AbilityContext = createContext();

export const AbilityProvider = (props) => {
    const {user} = useSelector(state => state.auth);        
    
    useEffect(() => {
        if(user && user?.roles){
            let roles = user?.roles;
            const { can, rules } = new AbilityBuilder();
            roles.map((role) => {
                return Object.entries(role.permissions).forEach(([key, val]) => {                                                
                        let actions = [];
                        Object.entries(val).forEach(([key2, val2]) => {
                            if(val2){
                                actions.push(key2)
                                can(key2, key);
                            }
                        })
                    });
                
            })                        
            Ability.update(rules);            
        }        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

   
    
    return (
        <AbilityContext.Provider
            value={Ability}>
            {props.children}            
        </AbilityContext.Provider>
    );
}

export  {AbilityContext}
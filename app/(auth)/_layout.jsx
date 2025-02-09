import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen 
                name='splash' 
                options={{ 
                    headerShown: false,
                }}  
            />
            <Stack.Screen 
                name='get-started' 
                options={{ 
                    headerShown: false,
                }}  
            />
            <Stack.Screen 
                name='phone' 
                options={{ 
                    headerShown: false,
                }}  
            />
            <Stack.Screen 
                name='otp-page' 
                options={{ 
                    headerShown: false,
                }}  
            />
            <Stack.Screen 
                name='location-page' 
                options={{ 
                    headerShown: false,
                }}  
            />
            <Stack.Screen 
                name='sign-up' 
                options={{ 
                    headerShown: false,
                }}  
            />
            <Stack.Screen 
                name='sign-in' 
                options={{ 
                    headerShown: false,
                }}  
            />
        </Stack>
      <StatusBar backgroundColor='#161622' style='light' />
    </>
  )
}

export default AuthLayout
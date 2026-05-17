import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const SignIn = () => {
  return (
    <View>
      <Text>SignIn</Text>
      <Link href={'/'} className='p-4 text-2xl bg-black text-white mt-20 text-center'>Home</Link>
    </View>
  )
}

export default SignIn
// "use client"
import '@radix-ui/themes/styles.css'
import { EnvelopeClosedIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { Flex, TextField, Button } from '@radix-ui/themes'
import React from 'react'

const SignInForm = () => {
  return (
    <Flex direction="column" gap="3" className=' my-4' >
      <label htmlFor="email">Email</label>
      <TextField.Root id="email" placeholder='email@domain.com' type='email' autoFocus>
        <TextField.Slot>
          <EnvelopeClosedIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <label htmlFor="pass">Password</label>
      <TextField.Root id="pass" placeholder='********' type='password'>
        <TextField.Slot>
          <LockClosedIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Button size="1" variant="solid" color="blue">
        Sign In
      </Button>
    </Flex>
  )
}

export default SignInForm

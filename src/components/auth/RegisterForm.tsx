// "use client"
import '@radix-ui/themes/styles.css'
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { Flex, TextField, Button } from '@radix-ui/themes'
import React from 'react'

const RegisterForm = () => {
  return (
    <Flex direction="column" gap="3" className=' my-4' >
      <label htmlFor="name">Name</label>
      <TextField.Root id="name" placeholder='Your name' type='text' autoFocus>
        <TextField.Slot>
          <PersonIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <label htmlFor="last">Lastname</label>
      <TextField.Root id="last" placeholder='Your lastname' type='text'>
        <TextField.Slot>
          <PersonIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <label htmlFor="nick">Nick</label>
      <TextField.Root id="name" placeholder='Type a nick' type='text'>
        <TextField.Slot>
          <PersonIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <label htmlFor="email">Email</label>
      <TextField.Root id="email" placeholder='email@domain.com' type='email'>
        <TextField.Slot>
          <EnvelopeClosedIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <label htmlFor="pass">Password</label>
      <TextField.Root id="pass" placeholder='Your password' type='password'>
        <TextField.Slot>
          <LockClosedIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root id="passRe" placeholder='Retype your password' type='password'>
        <TextField.Slot>
          <LockClosedIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Button size="1" variant="solid" color="blue">
        Sign Up
      </Button>
    </Flex>
  )
}

export default RegisterForm

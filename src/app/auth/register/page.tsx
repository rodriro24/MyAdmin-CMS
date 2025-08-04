import RegisterForm from '@/components/auth/RegisterForm';
import { Card, Container, Heading, Flex, Text, Link } from '@radix-ui/themes'
import NavLink from 'next/link';



const page = () => {
  return (
    <>
    <Container size="1" align={'center'} className='h-[calc(100vh-4rem)] flex items-center justify-center'>
      <Flex className="w-full items-center">
          <Card className='w-full'>
            <Heading className='text-center'>
              Register
            </Heading>
            <RegisterForm />
            <Flex className='text-sm' justify={'center'} align={'center'} gap={'1'} mt={'5'}>
              <Text className='cursor-pointer'> Already have an Account?</Text>
              <Link  asChild>
                <NavLink href={'/auth/login'}>
                  <Text>Log In</Text>
                </NavLink>
              </Link>
            </Flex>
          </Card>
        </Flex>
      </Container>
    </>
  )
}

export default page
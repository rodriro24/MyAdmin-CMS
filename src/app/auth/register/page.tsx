import RegisterForm from '@/components/auth/RegisterForm';
import { Card, Container, Heading, Flex, Text, Link } from '@radix-ui/themes'
import NavLink from 'next/link';



const page = () => {
  return (
    <>
      <Container size="1" height="100%">
        <Flex className="h-screen w-full items-center">
          <Card className='w-full'>
            <Heading className='text-center'>
              Register
            </Heading>
            <RegisterForm />
            <Flex className='text-sm' justify={'center'} align={'center'} gap={'1'}>
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
import { Card, Container, Heading, Flex, Text, Link } from '@radix-ui/themes'
import SignInForm from "@/components/auth/SignInForm";
import NavLink from 'next/link';



const page = () => {
  return (
    <>
      <Container size="1" align={'center'} className='h-[calc(100vh-4rem)] flex items-center justify-center'>
        <Flex className="w-full items-center mt-auto mb-auto my-auto">
          <Card className='w-full'>
            <Heading className='text-center'>
              Log In
            </Heading>
            <SignInForm />
            <Flex className='text-sm' justify={'center'} align={'center'} gap={'1'}>
              <Text className='cursor-pointer'> Don´t have an Account?</Text>
              <Link  asChild>
                <NavLink href={'/auth/register'}>
                  <Text>Sign Up</Text>
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
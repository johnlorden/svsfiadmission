import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          SVSFI Enrollment
        </Link>
        <nav className="hidden md:flex space-x-4">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={() => signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="ghost">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {session ? (
              <>
                <DropdownMenuItem>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem>
                  <Link href="/auth/signin">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/auth/signup">Sign Up</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header


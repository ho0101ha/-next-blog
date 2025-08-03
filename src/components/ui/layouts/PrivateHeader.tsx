import { auth } from '@/auth'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
  } from "@/components/ui/navigation-menu";
import Link from 'next/link';
import Setting from '../../layout/Setting';

export default async function PrivateHeader() {
    const session = await auth();
    if(!session?.user?.email){
        throw new Error('不正なリクエストです')
    }
  return (
    <header className='border-b bg-blue-200'>
      <div className='container mx-auto px-4 py-4 flex
      items-center justify-between'>
      <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="font-bold text-xl">
                  <Link href="/dashboard" >管理者ページ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Setting session={session}/>
      </div>
    </header>
  )
}

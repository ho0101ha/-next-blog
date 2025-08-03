'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

export default function SearchBox() {
  const [search,setSearch] = useState('');
  const [debouncedSearch,setDebouncedSearch] = useState('');
  const router = useRouter();

  //デバウンス

  useEffect(() =>{
    const timer = setTimeout(()=>{
      setDebouncedSearch(search);
    },500)
    return () =>clearTimeout(timer);
  },[search])

      // debouncedSearchが更新されたら実行

      useEffect(() =>{
           if(debouncedSearch.trim()){
             router.push(`/?search=${debouncedSearch.trim()}`);
           }else{
            router.push('/');
           }
      },[debouncedSearch,router])
  return (
    <div>
      <Input
      placeholder="記事を検索"
      className="w-[200px] la:w-[300px]"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}

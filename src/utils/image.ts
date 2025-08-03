// import { writeFile } from "fs/promises";
// import path from "path";
// export async function saveImage(file: File): Promise<string | null> {
  // const buffer = Buffer.from(await file.arrayBuffer()); // バイナリデータをBufferに変換
  // const fileName = `${Date.now()}_${file.name}`; // ファイル名生成 日時_ファイル名
  // const uploadDir = path.join(process.cwd(), "public/images"); // アップロードフォルダ

  // const filePath = path.join(uploadDir, fileName); // 保存先の完全なファイル名

  // return new Promise((resolve, reject) => {
  //   writeFile(filePath, buffer, (error) => {
  //     if (error) {
  //       console.error("画像保存エラー:", error);
  //       resolve(null);
  //     } else {
  //       resolve(`/images/${fileName}`); // URLパスを返す
  //     }
  //   });
  // });

// import { writeFile } from "fs";
import { writeFile} from 'fs/promises'
import path from "path";
import { supabase } from '@/lib/supabase';

export async function saveImage(file: File): Promise<string | null> {

      const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === 'true';
          if (useSupabase) {
        return await saveImageToSupabase(file);
    } else {
        return await saveImageToLocal(file);
    }

}


export async function saveImageToLocal(file: File): Promise<string | null>{
    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `${Date.now()}_${file.name}`
    const uploadDir = path.join(process.cwd(), 'public/images')

    try {
        const filePath = path.join(uploadDir, fileName)
        await writeFile(filePath, buffer)
        return `/images/${fileName}`
    } catch(error){
        console.error("画像保存エラー", error)
        return null
    }
}
async function saveImageToSupabase(file: File): Promise<string | null> {
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
        .from('nextblogbucket')
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) {
        console.error('Upload error:', error.message);
        return null;   }

    const { data: publicUrlData } = supabase.storage
        .from('nextblogbucket')
        .getPublicUrl(fileName);

    return publicUrlData.publicUrl; 
   }

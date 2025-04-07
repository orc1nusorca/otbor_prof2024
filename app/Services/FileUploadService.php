<?php

namespace App\Services;
use App\Models\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    public function upload(UploadedFile $file, $userId):File
    {
          $fileName = Str::uuid().'.'.$file->getClientOriginalExtension();
          $path = Storage::putFileAs('uploads', $file, $fileName);
          return File::create([
              'name'=>$fileName,
              'original_name'=>$file->getClientOriginalName(),
              'path'=>$path,
              'user_id' =>$userId
          ]);
    }
}

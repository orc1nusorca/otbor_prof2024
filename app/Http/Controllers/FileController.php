<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileUploadRequest;
use App\Http\Requests\FileUpdateRequest;
use App\Models\File;
use App\Models\Permission;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class FileController extends Controller
{
   public function __construct(private FileUploadService $fileUploadService)
   {
   }

    public function upload(FileUploadRequest $request): JsonResponse
    {
      $file = $this->fileUploadService->upload($request->file('file'),auth()->user()->id);
        return response()->json($file, 201);
    }
    public function update(FileUpdateRequest $request,File $file):JsonResponse{
        if ($file->user_id != auth()->id() && !$this->checkPermission($file, 'write')) {
             return response()->json([
                'message' => 'Forbidden for you'
            ], 403);
        }
        $file->update(['name'=>$request->input('name')]);
          return response()->json($file, 200);

    }
    public function destroy(File $file): JsonResponse
    {
       if ($file->user_id != auth()->id() && !$this->checkPermission($file, 'delete')) {
             return response()->json([
                'message' => 'Forbidden for you'
            ], 403);
        }
        Storage::delete($file->path);
        $file->delete();
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    public function getFile(File $file): JsonResponse
    {
        if ($file->user_id != auth()->id() && !$this->checkPermission($file, 'read')) {
           return response()->json([
                'message' => 'Forbidden for you'
            ], 403);
        }

         return response()->json($file, 200);
    }
    public function share(Request $request, File $file): JsonResponse{
        if ($file->user_id != auth()->id()) {
             return response()->json([
                'message' => 'Forbidden for you'
            ], 403);
        }
        $this->validate($request, [
            'user_id' => 'required|integer|exists:users,id',
            'permission_type' => 'required|in:read,write,delete',
        ]);
        Permission::create([
            'file_id' => $file->id,
            'user_id' => $request->input('user_id'),
            'permission_type' => $request->input('permission_type'),
        ]);
         return response()->json(null, 201);
    }
    private function checkPermission(File $file, $permissionType): bool
    {
         return Permission::where('file_id', $file->id)
            ->where('user_id', auth()->id())
            ->where('permission_type', $permissionType)
            ->exists();
    }
}

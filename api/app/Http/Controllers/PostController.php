<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Trait\ResponseHttpStatus;
use App\Http\Requests\PostRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\PostShowRequest;
use Illuminate\Support\Facades\Storage;
use App\Traits\ResponseHttpStatus as TraitsResponseHttpStatus;

class PostController extends Controller
{

    public function store(PostRequest $request)
    {
        try {
            $request->validate([
                'attachments.*' => 'required|file|mimes:jpeg,png,jpg|max:2048', // Example validation rule for image files
            ]);
    
            if ($request->hasFile('attachments')) {
                $post = Auth::user()->posts()->create(['caption' => $request->input('caption')]);
    
                $paths = []; // Array to collect file paths
    
                foreach ($request->file('attachments') as $index => $attachment) {
                    $filename = $attachment->store('posts');
                    $postAttachment = $post->post_attachment()->create(['storage_path' => $filename]);
    
                    // Collect the path
                    $paths[] = $postAttachment->storage_path;
                }
    
                $urls = array_map(function ($path) {
                    return Storage::url($path);
                }, $paths);
    
                return response()->json(['message' => 'Create post success', 'urls' => $urls, 'post_id' => $post->id], 201);
            }
    
            return response()->json(['message' => 'No attachments provided'], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred while processing the request', 'error' => $e->getMessage()], 500);
        }
    }
    

    public function remove($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        if (Auth::id() !== $post->user_id) {
            return response()->json(['message' => 'Forbidden access'], 403);
        }

        $post->post_attachment()->delete();
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully'], 200);
    }
    public function show(PostShowRequest $request)
    {
        $page = $request->input('page', 0);
        $size = $request->input('size', 10);

        $page = max(0, $page);
        $size = max(0, $size);


        $posts = Post::with(['user', 'post_attachment'])
            ->orderBy('created_at', 'desc')
            ->skip($page * $size)
            ->take($size)
            ->get();
        return response()->json([
            'page' => $page,
            'size' => $size,
            'posts' => $posts
        ]);
    }
}

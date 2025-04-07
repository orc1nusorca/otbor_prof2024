<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;
    protected $fillable = ['name','original_name','path','user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }
}

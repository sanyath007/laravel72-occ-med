<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPermission extends Model
{
    protected $table = "user_permissions";

    public function user()
    {
        return $this->belongsTo(App\User::class, 'user_id', 'id');
    }

    public function role()
    {
        return $this->belongsTo(App\UserRole::class, 'role_id', 'id');
    }
}

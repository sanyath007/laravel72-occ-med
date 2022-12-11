<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function getUsers()
    {
        return User::all();
    }

    public function getUser($id)
    {
        return User::find($id);
    }

    public function store(Request $request) {
        return User::create($request->all());
    }
}

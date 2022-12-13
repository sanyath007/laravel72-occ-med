<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        $credentials = $request->only('email', 'password');
    
        if(auth()->attempt($credentials, $request->filled('remember'))) {
            return response()->json(['status' => true, 'user' => auth()->user()]);
        }
    
        return response()->json(['status' => false, 'message' => 'invalid username or password'], 500);
    }

    public function logout(Request $request)
    {
        auth('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['status' => true, 'message' => 'logged out']);
    }

    public function me()
    {
        return response()->json(['status' => true, 'user' => auth()->user()]);
    }
}

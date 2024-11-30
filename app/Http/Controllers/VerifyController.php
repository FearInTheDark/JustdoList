<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VerifyController extends Controller {
    public function sendEmail(Request $request) {
        $request->user()->sendOTPVerificationEmail();
        return response()->json(['message' => 'Verification link sent!']);
    }

    public function verifyOTP(Request $request) {
        if ($request->user()->otp()->first()->otp === $request->otp) {
            $request->user()->otp()->delete();
            $request->user()->email_verified_at = now();
            $request->user()->save();
            return response()->json(['message' => 'Email verified!']);
        }
        return response()->json(['message' => 'Invalid OTP!'], 401);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

class DeleteUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'password' => ['required', 'min:2', 'string'],
        ];
    }

    public function withValidator($validator): void {
        $validator->after(function ($validator) {
            if (!Hash::check($this->password, $this->user()->password)) {
                $validator->errors()->add('password', 'The password is incorrect.');
            }
        });
    }
}

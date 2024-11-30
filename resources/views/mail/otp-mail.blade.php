<x-mail::message>
# OTP Verification Code

Here is your OTP Verification Code, do not share it with anyone:
# {{ $otp->otp }}

<x-mail::button :url="''">
Verify
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>

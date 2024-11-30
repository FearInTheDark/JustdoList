<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class OTPEmail extends Notification {
    use Queueable;

    protected $otp;

    /**
     * Create a new notification instance.
     */
    public function __construct(string $otp) {
        $this->otp = $otp;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     * @throws \Exception
     */
    public function toMail($notifiable)
    {
        if (!$notifiable instanceof MustVerifyEmail) {
            throw new \Exception('The notifiable must implement MustVerifyEmail');
        }

        $verificationUrl = $this->generateVerificationUrl($notifiable);

        return (new MailMessage)
            ->subject('Verify Your Email Address')
            ->line('Your OTP for email verification is:')
            ->line("**{$this->otp}**")
            ->line('This OTP will expire in 10 minutes.')
            ->line('Or you can verify your email by clicking the button below:')
            ->action('Verify Email', $verificationUrl)
            ->line('If you did not request this, please ignore this email.');
    }

    /**
     * Generate the verification URL.
     *
     * @param mixed $notifiable
     * @return string
     */
    protected function generateVerificationUrl(mixed $notifiable): string
    {
        return URL::temporarySignedRoute(
            'verification.verify', // Route name
            Carbon::now()->addMinutes(60), // Expiry time
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
            ]
        );
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array {
        return [
            'otp' => $this->otp,
        ];
    }
}

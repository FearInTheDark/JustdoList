<?php

namespace App\Jobs;

use App\Mail\OtpMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendEmailJob implements ShouldQueue {
    use Queueable;

    protected string $email;

    /**
     * Create a new job instance.
     */
    public function __construct(string $email) {
        $this->email = $email;
    }

    /**
     * Execute the job.
     */
    public function handle(): void {
        Mail::to($this->email)->send(new OtpMail());
    }
}

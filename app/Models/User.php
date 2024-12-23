<?php

namespace App\Models;


use App\Notifications\OTPEmail;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Random\RandomException;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail, CanResetPassword {
    use HasFactory, Notifiable, HasRoles, \Illuminate\Auth\Passwords\CanResetPassword;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'birthday',
        'finished_tasks',
        'image',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function tasks(): HasMany {
        return $this->hasMany(Task::class);
    }

    public function authoredEvents(): HasMany {
        return $this->hasMany(Event::class, 'author_id');
    }

    public function events(): BelongsToMany {
        return $this->belongsToMany(Event::class, 'events_users')->withTimestamps();
    }

    public function feedbacks(): HasMany {
        return $this->hasMany(Feedback::class);
    }

    public function sendOTPVerificationEmail(): void {
        try {
            $otp = $this->generateOtp()->otp;
            $this->notify(new OTPEmail($otp));
        } catch (RandomException $e) {

        }
    }

    /**
     * @throws RandomException
     */
    public function generateOtp() {
        $existingOtp = $this->otp()->first();
        if ($existingOtp && $existingOtp->expires_at > now()) return $existingOtp;

        $this->otp()->updateOrCreate(
            ['user_id' => $this->id],
            [
                'otp' => random_int(10000000, 99999999),
                'expires_at' => now()->addMinutes(10),
            ]
        );

        return $this->otp()->first();
    }


    public function otp(): HasOne {
        return $this->hasOne(Otp::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}

<?php

namespace App\Observers;

use App\Models\User;
use Random\RandomException;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        try {
            $randomImage = "packages/avatar" . random_int(1, 100) . ".png";
            $user->update(['image' => $randomImage]);
        } catch (RandomException $e) {
            $user->update(['image' => 'packages/avatar1.png']);
        }
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}

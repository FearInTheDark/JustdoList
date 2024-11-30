<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware {
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array {
        $isAdmin = $request->user() ? $request->user()->hasRole('admin') : false;
        return array_merge(parent::share($request), [
            'user' => fn() => $request->user()
                ? array_merge($request->user()->only('id', 'name', 'email', 'birthday', 'image'), ['is_admin' => $isAdmin])
                : null,
            'theme' => fn() => $request->session()->get('theme') ?? 'light',
        ]);
    }
}

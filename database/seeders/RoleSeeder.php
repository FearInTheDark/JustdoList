<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::create(['name' => 'admin']);
        $per = Permission::create(['name' => 'Manage']);

        $role->givePermissionTo($per);
        $per->assignRole($role);

        $roleUser = Role::create(['name' => 'user']);
        $perUser = Permission::create(['name' => 'use']);

        $roleUser->givePermissionTo($perUser);
        $perUser->assignRole($roleUser);
    }
}

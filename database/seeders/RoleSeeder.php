<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role1 = Role::create(['name' => 'view dashboard']);
        $role2 = Role::create(['name' => 'edit users']);
        $role3 = Role::create(['name' => 'edit admins']);
        $role4 = Role::create(['name' => 'aprove admins']);
        $role5 = Role::create(['name' => 'delete admins']);
        $role6 = Role::create(['name' => 'delete users']);
        $role7 = Role::create(['name' => 'view bets']);
        $role8 = Role::create(['name' => 'create events']);
        
        $superadminRole = Role::create(['name' => 'superadmin']);
    }
}

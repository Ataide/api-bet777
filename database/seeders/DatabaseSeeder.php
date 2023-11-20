<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Game;
use App\Models\Profile;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([SportSeeder::class, EventSeeder::class, GameSeeder::class]);

        $role1 = Role::create(['name' => 'view dashboard']);
        Role::create(['name' => 'edit users']);
        Role::create(['name' => 'edit admins']);
        Role::create(['name' => 'aprove admins']);
        Role::create(['name' => 'delete admins']);
        Role::create(['name' => 'delete users']);
        Role::create(['name' => 'view bets']);
        Role::create(['name' => 'create events']);
        
        $superadminRole = Role::create(['name' => 'superadmin']);

        User::factory(20)->has(Profile::factory())->has(Transaction::factory(1))->create();

        if (!User::where('email', '=', 'test@example.com')->first()) {
            $user = User::factory()
                            ->has(Profile::factory())
                            ->has(Transaction::factory(1))->create([
                                'name'  => 'Test User',
                                'email' => 'test@example.com',
                                'type'  => 'superadmin'
                            ]);
                        
            $user->assignRole($superadminRole);
        }

        $user = User::find(1);
        $user->assignRole($role1);

        // \App\Models\Event::factory(1)->has(Game::factory(5)->hasBet(3))->create();
    }
}

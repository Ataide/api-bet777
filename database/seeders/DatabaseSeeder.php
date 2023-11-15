<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Game;
use App\Models\Profile;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([SportSeeder::class, EventSeeder::class, GameSeeder::class]);

        User::factory(150)->has(Profile::factory())->has(Transaction::factory(1))->create();

        if (!User::where('email', '=', 'test@example.com')->first()) {
            $user = User::factory()
                            ->has(Profile::factory())
                            ->has(Transaction::factory(1))->create([
                                'name'  => 'Test User',
                                'email' => 'test@example.com',
                            ]);
            $role        = Role::create(['name' => 'admin']);
            $permissions = Permission::pluck('id', 'id')->all();
            
            $role->syncPermissions($permissions);
            $user->assignRole([$role->id]);
        }

        // \App\Models\Event::factory(1)->has(Game::factory(5)->hasBet(3))->create();
    }
}

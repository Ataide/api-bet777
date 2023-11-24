<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $this->call(
            [
                SportSeeder::class,
                // EventSeeder::class, // Atente para o caso de precisar usar esse recurso,
                // GameSeeder::class   // pois no UserSeeder existe o uso de eventos e gmaes que são criados aqui.
            ]
        );

        //Cria todas as roles necessárias para o funcionanmento do sistema.
        $role1 = Role::create(['name' => 'view dashboard']);
        $role2 = Role::create(['name' => 'edit users']);
        $role3 = Role::create(['name' => 'edit admins']);
        $role4 = Role::create(['name' => 'aprove admins']);
        $role5 = Role::create(['name' => 'delete admins']);
        $role6 = Role::create(['name' => 'delete users']);
        $role7 = Role::create(['name' => 'view bets']);
        $role8 = Role::create(['name' => 'create events']);
        
        // Cria a role para o superadmin.
        $superadminRole = Role::create(['name' => 'superadmin']);

        // Cria 20 usuarios.
        // User::factory(320)->has(Profile::factory())->has(Transaction::factory(1))->create();

        // Cria o superadmin
        if (!User::where('email', '=', 'administrador@bet777.com.br')->first()) {
            $user = User::factory()
                            ->has(Profile::factory())
                            ->has(Transaction::factory())->create([
                                'name'   => 'Super Admin',
                                'email'  => 'administrador@bet777.com.br',
                                'type'   => 'superadmin',
                                'status' => User::ACTIVE
                            ]);
            $user->assignRole($superadminRole);
            $user->assignRole([$role1, $role2, $role3, $role4, $role5, $role6, $role7, $role8]);
        }

        if (!User::where('email', '=', 'ataide.bastos1@gmail.com')->first()) {
            $user = User::factory()
                            ->has(Profile::factory())
                            ->has(Transaction::factory())->create([
                                'name'   => 'Ataide Bastos',
                                'email'  => 'ataide.bastos1@gmail.com',
                                'type'   => 'superadmin',
                                'status' => User::ACTIVE
                            ]);
            $user->assignRole($superadminRole);
            $user->assignRole([$role1, $role2, $role3, $role4, $role5, $role6, $role7, $role8]);
        }

        $user = User::find(1);

        // \App\Models\Event::factory(1)->has(Game::factory(5)->hasBet(3))->create();
    }
}

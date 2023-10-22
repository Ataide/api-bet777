<?php
use App\Models\User;
use function Pest\Laravel\{actingAs};

test('users without a session must be redirected to the login page', function () {
    $response = $this->get('/usuarios');
    $response->assertRedirect('/login');
});

test('users screen can be rendered if user has a session', function () {
    $user     = User::factory()->create();
    $response = actingAs($user)->get('/usuarios');
    $response->assertStatus(200);
});

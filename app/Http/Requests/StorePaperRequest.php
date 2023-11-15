<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePaperRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make thisStoreBetRequest request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id'           => ['required', 'numeric', 'exists:users,id'],
            'quantity'          => ['required', 'numeric'],
            'amount'            => ['required', 'numeric'],
            'rate'              => ['required', 'numeric'],
            'profit'            => ['required', 'numeric'],
            'bets'              => ['required', 'array'],
            'bets.*.user_id'    => ['optional', 'exists:users,id'],
            'bets.*.game_id'    => ['required', 'exists:games,id'],
            'bets.*.bet_choice' => ['required',  Rule::in([1, 0, -1])],
            'bets.*.quantity'   => ['optional'],
            'bets.*.rate'       => ['required', 'numeric'],
            'bets.*.profit'     => ['optional', 'numeric'],
        ];
    }
}

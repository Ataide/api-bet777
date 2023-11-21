<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreGameRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
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
            'event_id'       => ['required', 'exists:events,id'],
            'home_name'      => ['required'],
            'away_name'      => ['required', 'different:home_name'],
            'home_rate'      => ['required', 'numeric', 'min:0.25'],
            'away_rate'      => ['required', 'numeric', 'min:0.25'],
            'draw_rate'      => ['required', 'numeric', 'min:0.25'],
            'time_close_bet' => ['after:' . Carbon::now()],
            'home_image'     => ['nullable'],
            'away_image'     => ['nullable']
          
        ];
    }
}

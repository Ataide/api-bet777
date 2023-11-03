<?php

namespace App\Http\Requests;

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
            'event_id'     => ['numeric'],
            'home'         => ['string'],
            'home_odd'     => ['string'],
            'home_icon'    => ['string'],
            'visitor'      => ['string'],
            'visitor_odd'  => ['string'],
            'visitor_icon' => ['string'],
            'x_odd'        => ['string'],
            'start_date'   => ['date']
        ];
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use App\Models\Sport;
use Auth;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Inertia\Inertia;
use Redirect;
use Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with('games')->paginate(5);

        $sports = Sport::all();

        return Inertia::render(
            'Events',
            [
                'events' => $events,
                'sports' => $sports,
                // 'withdraws'    => $withdraws
            ]
        );
    }

    public function api_index()
    {
        $events = Event::with('games')
            ->when(Request::input('sportId'), function (Builder $query, $search) {
                $query->where('sport_id', $search);
            })->get();
        
        return response()->json($events);
    }

    public function favorites()
    {
        $user      = Auth::user();
        $favorites = $user->favorites;

        $favoritesNames = $favorites->map(function ($favorite) {
            return collect($favorite->toArray())
                ->only('name')
                ->all();
        });
        
        $events = Event::with('games')->whereIn('sport', $favoritesNames)->get();
        ;
        
        return response()->json($events);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $request->validated();

        Event::create($request->validated());

        return Redirect::route('events.index');
    }

    public function storeFromModal(StoreEventRequest $request)
    {
        $request->validated();

        if ($request->id) {
            $event = Event::find($request->id);
            $event->fill($request->validated());
            $event->save();

            return Redirect::back()->with('success', 'User created.');
        }
        
        Event::create($request->validated());

        return Redirect::back()->with('success', 'User created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(int $event_id)
    {
        $event = Event::find($event_id)->load('games');

        return Inertia::render(
            'Games',
            [
                'event' => $event,
                'games' => $event->games,
                // 'withdraws'    => $withdraws
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return Redirect::back()->with('success', 'Event  removed.');
    }
}

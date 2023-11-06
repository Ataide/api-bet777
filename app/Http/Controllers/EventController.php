<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Models\Event;
use Inertia\Inertia;
use Redirect;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::with('games')->paginate(5);

        return Inertia::render(
            'Events',
            [
                'events' => $events,
                // 'deposits'     => $deposits,
                // 'withdraws'    => $withdraws
            ]
        );
    }

    public function api_index()
    {
        $events = Event::with('games')->paginate(5);
        
        response()->json($events);
        ;
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
        //
    }
}

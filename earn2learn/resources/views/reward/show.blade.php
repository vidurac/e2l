@extends('layouts.master')

@section('content')

    <h1>Reward</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Attempt Id</th><th>Value</th><th>Enable</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $reward->id }}</td> <td> {{ $reward->attempt_id }} </td><td> {{ $reward->value }} </td><td> {{ $reward->enable }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
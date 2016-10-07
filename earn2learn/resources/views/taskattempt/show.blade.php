@extends('layouts.master')

@section('content')

    <h1>Taskattempt</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Task Id</th><th>Child Id</th><th>House Id</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $taskattempt->id }}</td> <td> {{ $taskattempt->task_id }} </td><td> {{ $taskattempt->child_id }} </td><td> {{ $taskattempt->house_id }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
@extends('layouts.master')

@section('content')

    <h1>Task</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Task</th><th>Description</th><th>Category</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $task->id }}</td> <td> {{ $task->task }} </td><td> {{ $task->description }} </td><td> {{ $task->category }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
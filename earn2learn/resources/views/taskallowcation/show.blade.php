@extends('layouts.master')

@section('content')

    <h1>Taskallowcation</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Child Id</th><th>Task Id</th><th>House Id</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $taskallowcation->id }}</td> <td> {{ $taskallowcation->child_id }} </td><td> {{ $taskallowcation->task_id }} </td><td> {{ $taskallowcation->house_id }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
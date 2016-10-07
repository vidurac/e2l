@extends('layouts.master')

@section('content')

    <h1>Childquizallocation</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Child Id</th><th>Quiz Id</th><th>Enable</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $childquizallocation->id }}</td> <td> {{ $childquizallocation->child_id }} </td><td> {{ $childquizallocation->quiz_id }} </td><td> {{ $childquizallocation->enable }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
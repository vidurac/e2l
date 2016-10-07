@extends('layouts.master')

@section('content')

    <h1>Childhouse</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>House Id</th><th>Child Id</th><th>Enable</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $childhouse->id }}</td> <td> {{ $childhouse->house_id }} </td><td> {{ $childhouse->child_id }} </td><td> {{ $childhouse->enable }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
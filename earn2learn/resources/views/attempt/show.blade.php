@extends('layouts.master')

@section('content')

    <h1>Attempt</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>House Id</th><th>Quiz Id</th><th>allocation Id</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $attempt->id }}</td> <td> {{ $attempt->house_id }} </td><td> {{ $attempt->quiz_id }} </td><td> {{ $attempt->allocation_id }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
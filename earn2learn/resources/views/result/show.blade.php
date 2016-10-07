@extends('layouts.master')

@section('content')

    <h1>Result</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Attempt Id</th><th>Question Id</th><th>Answer Id</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $result->id }}</td> <td> {{ $result->attempt_id }} </td><td> {{ $result->question_id }} </td><td> {{ $result->answer_id }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
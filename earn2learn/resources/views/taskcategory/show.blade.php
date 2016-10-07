@extends('layouts.master')

@section('content')

    <h1>Taskcategory</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Category</th><th>User Id</th><th>Enable</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $taskcategory->id }}</td> <td> {{ $taskcategory->category }} </td><td> {{ $taskcategory->user_id }} </td><td> {{ $taskcategory->enable }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
@extends('layouts.master')

@section('content')

    <h1>Video</h1>
    <div class="table-responsive">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>ID.</th> <th>Name</th><th>Title</th><th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ $video->id }}</td> <td> {{ $video->name }} </td><td> {{ $video->title }} </td><td> {{ $video->description }} </td>
                </tr>
            </tbody>    
        </table>
    </div>

@endsection
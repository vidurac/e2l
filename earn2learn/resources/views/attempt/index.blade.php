@extends('layouts.master')

@section('content')

    <h1>Attempts <a href="{{ route('attempt.create') }}" class="btn btn-primary pull-right btn-sm">Add New Attempt</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>House Id</th><th>Quiz Id</th><th>allocation Id</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($attempts as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('/attempt', $item->id) }}">{{ $item->house_id }}</a></td><td>{{ $item->quiz_id }}</td><td>{{ $item->allocation_id }}</td>
                    <td>
                        <a href="{{ route('attempt.edit', $item->id) }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'route' => ['attempt.destroy', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $attempts->render() !!} </div>
    </div>

@endsection

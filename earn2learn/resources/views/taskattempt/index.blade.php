@extends('layouts.master')

@section('content')

    <h1>Taskattempt <a href="{{ url('taskattempt/create') }}" class="btn btn-primary pull-right btn-sm">Add New Taskattempt</a></h1>
    <div class="table">
        <table class="table table-bordered table-striped table-hover">
            <thead>
                <tr>
                    <th>S.No</th><th>Task Id</th><th>Child Id</th><th>House Id</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {{-- */$x=0;/* --}}
            @foreach($taskattempt as $item)
                {{-- */$x++;/* --}}
                <tr>
                    <td>{{ $x }}</td>
                    <td><a href="{{ url('taskattempt', $item->id) }}">{{ $item->task_id }}</a></td><td>{{ $item->child_id }}</td><td>{{ $item->house_id }}</td>
                    <td>
                        <a href="{{ url('taskattempt/' . $item->id . '/edit') }}">
                            <button type="submit" class="btn btn-primary btn-xs">Update</button>
                        </a> /
                        {!! Form::open([
                            'method'=>'DELETE',
                            'url' => ['taskattempt', $item->id],
                            'style' => 'display:inline'
                        ]) !!}
                            {!! Form::submit('Delete', ['class' => 'btn btn-danger btn-xs']) !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <div class="pagination"> {!! $taskattempt->render() !!} </div>
    </div>

@endsection
